const Sequelize = require('sequelize');
const db = require('../database/db_config');

module.exports = db.sequelize.define(
    'subCategories',
    {
        taskSubCategory_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            //autoIncrement: true
        },
        taskSubCategory_name: {
            type: Sequelize.STRING
        },
        taskSubCategory_image: {
            type: Sequelize.STRING
        },
        task_Code: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        
    },
    {
        timestamps: false
    }
);