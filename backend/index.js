import cors from "cors";
import express from "express";
import ChapterRoute from "./routes/ChapterRoute.js";
import StoryRoute from "./routes/StoryRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(StoryRoute);
app.use(ChapterRoute);

app.listen(5000, () => console.log('Server up and running...'));