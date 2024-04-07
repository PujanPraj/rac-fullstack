import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import cors from "cors";

dotenv.config();

export const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//routes
import userRouter from "./routes/user.routes.js";
import boardMembersRouter from "./routes/boardMembers.routes.js";
import membersRouter from "./routes/members.routes.js";
import projectRouter from "./routes/project.routes.js";
import leadersRouter from "./routes/leaders.routes.js";
import pastPresidentRouter from "./routes/pastPresident.routes.js";

app.use("/api/users", userRouter);
app.use("/api/boardMembers", boardMembersRouter);
app.use("/api/members", membersRouter);
app.use("/api/projects", projectRouter);
app.use("/api/leaders", leadersRouter);
app.use("/api/pastpresidents", pastPresidentRouter);

//testing
app.get("/api/test", (req, res) => {
  res.send("Hello World");
});

//error handling
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
app.use(notFound);
app.use(errorHandler);
