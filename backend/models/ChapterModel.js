import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Story from "./StoryModel.js";

const { DataTypes } = Sequelize;

const Chapter = db.define('chapters', {
    story_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Story,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    chapter_title: {
        type: DataTypes.STRING
    },
    story_chapter: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Story.hasMany(Chapter, { foreignKey: 'story_id' });
Chapter.belongsTo(Story, { foreignKey: 'story_id' });

export default Chapter;

(async () => {
    await db.sync();
})();
