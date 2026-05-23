import { Router } from "express";
import { prisma } from "../db/prisma.ts";

const router = Router();

function parseId(value: string) {
	const id = Number(value)
	if (!Number.isInteger(id) || id <= 0) return null
	return id
}

router.get("/:id/comments", async (req, res) => {
    const postId = parseId(req.params.id);

    if (!postId) {
        return res.status(400).json({
            error: "Invalid post id",
        });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
				body: true,
				postId: true,
				userId: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        handle: true,
                    },
                },
            },
        });

        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to fetch comments",
        });
    }
});

router.post("/:id/comments", async (req, res) => {
    const postId = parseId(req.params.id);
    const { userId, body } = req.body;

	if (!postId) {
		res.status(400).json({
			error: "Invalid post id"
		})
    }

    if (!body || !userId) {
        return res.status(400).json({
            error: "Body and userId are required",
        });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                postId,
				userId: Number(userId),
                body,
            },
            select: {
                id: true,
                postId: true,
                userId: true,
                body: true,
                createdAt: true,
            },
        });

		res.status(201).json(comment)
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Failed to create comment",
        });
    }
});

router.put("/:id/comments/:commentId", async (req, res) => {
	const postId = parseId(req.params.id)
	const commentId = parseId(req.params.commentId)
	const { body } = req.body

	if (!postId || !commentId) {
		res.status(400).json({
			error: "Invalid post id or comment id"
		})
		return
	}

	if (!body) {
		res.status(400).json({
			error: "body is required"
		})
		return
	}

	try {
		const comment = await prisma.comment.update({
			where: {
				id: commentId
			},
			data: {
				body,
			},
			select: {
				id: true,
				postId: true,
				userId: true,
				body: true,
				createdAt: true
			}
		})

		if (comment.postId !== postId) {
			res.status(400).json({
				error: "comment does not belong to this post"
			})
			return
		}

		res.json(comment)
	} catch (error) {
		console.log(error)
		res.status(400).json({
			error: "Failed to update comment"
		})
	}
})

router.delete("/:id/comments/:commentId", async (req, res) => {
	const postId = parseId(req.params.id)
	const commentId = parseId(req.params.commentId)

	if (!postId || !commentId) {
		res.status(400).json({
			error: "Invalid post id or comment id"
		})
		return
	}

	const comment = await prisma.comment.findFirst({
		where: {
			id: commentId,
			postId
		}
	})

	if (!comment) {
		res.status(404).json({
			error: "comment not found"
		})
	}

	await prisma.comment.delete({
		where: {
			id: commentId
		}
	})
})


export default router;
