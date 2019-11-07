const Sequelize = require('sequelize');
const db = require('../database/db_config');

module.exports = db.sequelize.define(
    'tasks',
    {
        task_id: {
            type: Sequelize.STRING,
            primaryKey: true,
            //autoIncrement: true
        },
        task_Name: {
            type: Sequelize.STRING
        },
        task_Image: {
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