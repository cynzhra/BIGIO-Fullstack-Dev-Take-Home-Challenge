import Chapter from "../models/ChapterModel.js";

export const getChapters = async (req, res) => {
    try {
        const response = await Chapter.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getChapterById = async (req, res) => {
    try {
        const response = await Chapter.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createChapter = async (req, res) => {
    try {
        await Chapter.create(req.body);
        res.status(201).json({ msg: "Chapter Created" });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateChapter = async (req, res) => {
    try {
        await Chapter.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Chapter Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteChapter = async (req, res) => {
    try {
        await Chapter.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Chapter Deleted" });
    } catch (error) {
        console.log(error.message);
    }
}