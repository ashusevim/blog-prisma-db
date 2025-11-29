import { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcrypt";
import { prisma } from "/home/wanony/projects/db-schema-and-migrations/blog-prisma-db/src/db/prisma.ts";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts"

const app = Router();

app.use(cors());
app.use(morgan("dev"));

app.use("/users", usersRouter)
app.use("/posts", postsRouter)

app.get("/", (req, res) => {
	res.status(200).json({
		message: "API is working",
	});
});

export default app;
