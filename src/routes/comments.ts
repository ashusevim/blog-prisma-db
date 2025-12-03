import { Router } from "express";
import { prisma } from "../db/prisma.ts";

const router = Router();

router.get("/posts/:id/comments", async (req, res) => {
    const postId = parseInt(req.params.id);

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                body: true,
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

router.post("/posts/:id/comments", async (req, res) => {
    const postId = parseInt(req.params.id);
    const { userId, body } = req.body;

    if (!body || !userId) {
        return res.status(400).json({
            error: "Body and userId are required",
        });
    }

    try {
        const comment = await prisma.comment.create({
            data: {
                postId,
                userId,
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

        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to create comment",
        });
    }
});

export default router;
