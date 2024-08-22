import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Story = db.define('stories', {
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    synopsis: {
        type: DataTypes.TEXT
    },
    category: {
        type: DataTypes.ENUM,
        values: ['Financial', 'Technology', 'Health'],
    },
    story_cover: {
        type: DataTypes.STRING
    },
    tags: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('tags') ? this.getDataValue('tags').split(',') : [];
        },
        set(value) {
            this.setDataValue('tags', value.join(','));
        }
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Publish', 'Draft', 'Archive'],
    }
}, {
    freezeTableName: true
});

export default Story;

(async () => {
    await db.sync();
})();