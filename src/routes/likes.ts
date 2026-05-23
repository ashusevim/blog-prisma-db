import { json, Router } from "express";
import { prisma } from "../db/prisma";
import { use } from "react";
import { error } from "node:console";

const router = Router();

function parseId(value: string) {
	const id = Number(value);
	if (!Number.isInteger(id) || id <= 0)return null;
	return id;
}

router.post("/:id/likes", async (req, res) => {
    const postId = parseInt(req.params.id);
    const { userId } = req.body;

	if (!postId) {
		res.status(400).json({
			error: "Invalid post id"
		})
		return
    }

	if (!userId) {
		res.status(400).json({
			error: "UserId is required"
		})
		return
    }

	if (!Number.isInteger(Number(userId))) {
		res.status(400).json({
			error: "UserId must be a valid number"
		})
		return
    }

    try {
        await prisma.like.create({
            data: {
                postId,
                userId: Number(userId)
            },
        });

		res.status(201).json({
			liked: true,
        })
    } catch (error) {
        if (error == "p2002") {
            return res.json({
                liked: true,
                message: "user has already liked this post",
            });
        }
        console.log(error);
		res.status(400).json({
			error: "Failed to like on post"
		});
    }
});

router.delete("/:id/likes", async (req, res) => {
	const postId = parseId(req.params.id)
	const { userId } = req.body

	if (!postId) {
		res.status(400).json({
			error: "Invalid post id"
		})
		return
	}

	if (!userId) {
		res.status(400).json({
			error: "userId is required"
		})
		return
	}

	if (!Number.isInteger(userId)) {
		res.status(400).json({
			errir: "userId must be a valid number"
		})
		return
	}

	try {
		await prisma.like.delete({
			where: {
				userId_postId: {
					userId: Number(userId),
					postId
				}
			}
		})

		res.json({
			liked: false
		})
	} catch (error) {
		console.error(error)
		res.status(400).json({
			error: "Failed to unlike post"
		})
	}
})

export default router;
