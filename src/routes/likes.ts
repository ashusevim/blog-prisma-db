import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

router.post("/posts/:id/likes", async (req, res) => {
    const postId = parseInt(req.params.id);
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId is required");
    }

    try {
        const like = await prisma.like.create({
            data: {
                postId,
                userId,
            },
            select: {
                id: true,
                postId: true,
                userId: true,
                createdAt: true,
            },
        });

        res.json(like);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to like on post" });
    }
});

export default router;
