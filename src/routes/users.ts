import { Router } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";
import { title } from "node:process";

const router = Router();

const userSelect = {
	id: true,
	handle: true,
	email: true,
	createdAt: true
}

function parseId(value: string) {
	const id = Number(value)
	if (!Number.isInteger(id) || id <= 0) return null;
	return id
}

router.get("/users", async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
			select: userSelect
		})

		res.json(users)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			error: "Failed to fetch users"
		})
	}
})

router.post("/", async (req, res) => {
	const { handle, email, password } = req.body;

	if (!handle || !email || !password) {
		res.status(400).json({
			error: "handle, email and password are required"
		})
		return
	}

	if (typeof password !== "string" || password.length < 6) {
		res.status(400).json({
			error: "password must be at least 6 characters long"
		})
		return
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				handle,
				email,
				password: hashedPassword,
			},
			select: userSelect
		});

		res.status(201).json(user)
	} catch (err) {
		console.log(err);
		res.status(400).json({
			error: "user creation failed",
		});
	}
});

router.get("/:id", async (req, res) => {
	const id = req.params.id

	if (!id) {
		res.status(400).json({
			error: "Invalid user id"
		})
		return
	}

	try {
		const post = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				body: true,
				userId: true,
				createdAt: true,
				user: {
					select: {
						id: true,
						handle: true
					}
				},
				_count: {
					select: {
						likes: true,
						comments: true
					}
				}
			}
		})

		if (!post) {
			res.status(404).json({
				error: "Post not found"
			})
		}

		res.json(post)
	} catch (error) {
		console.error(error)
		res.status(500).json({
			error: "Failed to fetch user"
		})
	}
})

router.put('/:id', async (req, res) => {
	const id = req.params.id
	const { title, body } = req.body

	if (!id) {
		res.status(400).json({
			error: "Invalid post id",
		})
		return;
	}

	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: {
				...(title !== undefined ? { title } : {}),
				...(body !== undefined ? { body } : {})
			},
			select: {
				id: true,
				title: true,
				body: true,
				userId: true,
				createdAt: true
			}
		})

		res.json(updatedUser)
	} catch (error) {
		console.log(error)
		res.status(400).json({
			error: "Failed to update post"
		})
	}
})

router.delete("/:id", async (req, res) => {
	const id = req.params.id

	if (!id) {
		if (!id) {
			res.status(400).json({
				error: "Invalid post id",
			})
			return;
		}
	}

	try {
		await prisma.user.delete({
			where: { id }
		})

		res.status(204).send()
	} catch (error) {
		console.log(error)
		res.status(400).json({
			error: "Failed to delete post"
		})
	}
})

export default router
