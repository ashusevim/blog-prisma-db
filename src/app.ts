import { Router } from "express";
import cors from "cors";
import morgan from "morgan";
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
