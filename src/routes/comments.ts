import { Router } from "express";
import { prisma } from "../db/prisma.ts";

const router = Router();

router.post("/posts/:id/comments", async (req, res) => {
	const postId = parseInt(req.params.id);
	const { userId, body } = req.body;

	if (!body || !userId) {
		return res.status(400).json({
			error: "Body and userId are required"
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
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Failed to create comment",
		});
	}
});

export default router;
