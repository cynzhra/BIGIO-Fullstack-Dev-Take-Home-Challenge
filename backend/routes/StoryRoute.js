import express from "express";
import {
    createStory,
    deleteStory,
    getStories,
    getStoryById,
    updateStory
} from "../controllers/StoryController.js";

import {
    createChapters,
    deleteChapter,
    getChapterById,
    getChapters,
    updateChapter
} from "../controllers/ChapterController.js";

const router = express.Router();

router.get('/stories', getStories);
router.get('/stories/:id', getStoryById);
router.post('/stories', createStory);
router.patch('/stories/:id', updateStory);
router.delete('/stories/:id', deleteStory);

router.get('/chapters', getChapters);
router.get('/chapters/:id', getChapterById);
router.post('/chapters', createChapters);
router.patch('/chapters/:id', updateChapter);
router.delete('/chapters/:id', deleteChapter);

export default router;