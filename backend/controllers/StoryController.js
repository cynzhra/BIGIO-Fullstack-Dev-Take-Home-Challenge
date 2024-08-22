import Story from "../models/StoryModel.js";

export const getStories = async (req, res) => {
    try {
        const response = await Story.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getStoryById = async (req, res) => {
    try {
        const response = await Story.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createStory = async (req, res) => {
    try {
        const { title, author, synopsis, category, status, tags } = req.body;

        if (!title || !author || !synopsis || !category || !status) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const validCategories = ["Financial", "Technology", "Health"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ msg: "Invalid category selected" });
        }
        const validStatus = ["Publish", "Draft", "Archive"];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ msg: "Invalid status selected" });
        }
        let storyCoverPath = "";
        if (req.file) {
            const { filename } = req.file;
            storyCoverPath = `/uploads/${filename}`;
        }
        const tagsArray = tags ? tags.split(",") : [];
        await Story.create({
            title,
            author,
            synopsis,
            category,
            story_cover: storyCoverPath,
            keyword: tagsArray,
            status
        });

        res.status(201).json({ msg: "Story Created" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}

export const updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, synopsis, category, status, tags } = req.body;

        if (!title || !author || !synopsis || !category || !status) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const validCategories = ["Financial", "Technology", "Health"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ msg: "Invalid category selected" });
        }

        const validStatus = ["Publish", "Draft", "Archive"];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ msg: "Invalid status selected" });
        }

        const story = await Story.findByPk(id);
        if (!story) {
            return res.status(404).json({ msg: "Story not found" });
        }

        let storyCoverPath = story.story_cover;
        if (req.file) {
            if (story.story_cover) {
                const oldCoverPath = path.join(__dirname, '..', 'public', story.story_cover);
                if (fs.existsSync(oldCoverPath)) {
                    fs.unlinkSync(oldCoverPath);
                }
            }

            const { filename } = req.file;
            storyCoverPath = `/uploads/${filename}`;
        }

        const tagsArray = tags ? tags.split(",") : story.keyword;

        await Story.update({
            title,
            author,
            synopsis,
            category,
            story_cover: storyCoverPath,
            keyword: tagsArray,
            status
        }, {
            where: { id }
        });

        res.status(200).json({ msg: "Story Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}

export const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;

        // Cari story yang akan dihapus
        const story = await Story.findByPk(id);
        if (!story) {
            return res.status(404).json({ msg: "Story not found" });
        }

        // Hapus file cover jika ada
        if (story.story_cover) {
            const coverPath = path.join(__dirname, '..', 'public', story.story_cover);
            if (fs.existsSync(coverPath)) {
                fs.unlinkSync(coverPath);
            }
        }

        // Hapus story dari database
        await Story.destroy({
            where: { id }
        });

        res.status(200).json({ msg: "Story Deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Server Error" });
    }
}