import { Router } from "express";
import { prisma } from "../db/prisma";
import { userInfo } from "node:os";

const router = Router();

router.get("", async (req, res) => {
	const page = (req.query.page as string) || 1;
	const limit = (req.query.limit as string) || 10;

	const posts = await prisma.post.findMany({
		skip: (page - 1) * limit,
		take: limit,
		orderBy: { createdAt: "desc" },
		select: {
			id: true,
			title: true,
			body: true,
			userId: true,
			createdAt: true,
		},
	});

	res.json({
		page,
		limit,
		posts,
	});
});

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
