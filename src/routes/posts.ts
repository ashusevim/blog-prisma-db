import { Router } from "express";
import { prisma } from "../db/prisma";
import { userInfo } from "node:os";

const router = Router();

router.post("", async (req, res) => {
	const { title, body, userId } = req.body;

	if (!title || !userId) {
		return res.status(400).json({
			message: "All the fields are required",
		});
	}

	try {
		const post = await prisma.user.create({
			data: {
				title,
				body,
				userId, // prisma enforces foreign key to user.id
			},
			select: {
				id: true,
				title: true,
				body: true,
				userId: true,
				createdAt: true,
			},
		});

		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "could not create post",
		});
	}
});

export default router;
