import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";

const router = Router();

router.post("/", async (req, res) => {
	const { handle, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: {
				handle,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				handle: true,
				email: true,
				createdAt: true
			},
		});

		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "user creation failed",
		});
	}
});

export default router
