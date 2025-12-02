import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

router.post("/posts/:id/likes", async (req, res) => {
	const postId = parseInt(req.params.id);
	const { userId } = req.body;

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
	} catch (error) {
		console.log(error);
	}
});

export default router
