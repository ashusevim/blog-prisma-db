import express from "express";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import commentsRouter from "./routes/comments";
import likesRouter from "./routes/likes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API is working",
    });
});

if(process.env.NODE_ENV !== "test"){
    app.listen(PORT, () => {
        console.log(`Listening to the port: `, PORT);
    });
}


export default app;
