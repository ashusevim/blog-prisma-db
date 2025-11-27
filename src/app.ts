import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import { prisma } from "/home/wanony/projects/db-schema-and-migrations/blog-prisma-db/src/db/prisma.ts";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.status(200).json({
		message: "API is working",
	});
});

app.post("/users", async (req, res) => {
	const { handle, email, password } = req.body;

	if (!handle || !email || !password) {
		res.status(400).json({
			error: "All the fields are required",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = prisma.user.create({
		data: {
			handle,
			email,
			password: hashedPassword,
		},
	});

	return res.json(user)
});

export default app;
