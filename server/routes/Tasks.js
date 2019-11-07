const express = require('express');
const cors = require('cors');
const multer = require('multer');
const tasksRoute = express.Router();
const RandExp = require('randexp');
const randexp = new RandExp(/\w{30}/);

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./images/tasks_pictures/");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage})

const TaskModel = require('../models/Tasks');
const TaskSubcategoriesModel = require('../models/TaskSubCategory');
tasksRoute.use(cors());

/////////////////////////////////////////////ADD NEW TASKS TO THE DATABASE///////////////////////
tasksRoute.post('/add', upload.single('task_Image'), (req, res)=> {
    const today = new Date();
    console.log(req.file);
    const taskData = {
        task_id : randexp.gen(),
        task_Name: req.body.task_Name,
        task_Code: req.body.task_Code,
        task_Image: 'http://localhost:1010/task-icon/' + req.file.originalname,
        created : today
    }

    TaskModel.findOne({
        where: {
            task_Code: req.body.task_Code
        }
    })
    .then(task => {
        if(!task){
            TaskModel.create(taskData)
            .then(task => {
                res.json({status: task.task_Code + ' registered'});
            })
            .catch(err =>{
                res.send('error: '+ err);
            })
           
        }else{
            res.json({message: 'Task already exists'});
        }
    })
    .catch(err => {
        res.send('error: '+ err);
    })
});

/////////////////////////////////Get all tasks//////////////////////////////////////////////////////////
tasksRoute.get('/categories', (req, res) => {
    TaskModel.findAll().then(users => res.json(users));
})

/////////////////////////////////Get a tasks by Id//////////////////////////////////////////////////////////
tasksRoute.get('/categories/:task_id', (req, res) => {
    TaskModel.findOne({
        where: {
            task_id: req.params.task_id
        }
    }).then(tasks => res.json({
        task_Name : tasks.task_Name, 
        task_Code : tasks.task_Code, 
        task_Image : tasks.task_Image
    }));
})

/////////////////////////////////////////////ADD NEW TASK SUBCATEGORY TO THE DATABASE///////////////////////
tasksRoute.post('/add-task_subcategory', upload.single('taskSubCategory_image'), (req, res)=> {
    const today = new Date();
    console.log(req.file);
    const taskData = {
        taskSubCategory_id : randexp.gen(),
        taskSubCategory_name : req.body.taskSubCategory_name,
        taskSubCategory_image : 'http://localhost:1010/task-icon/' + req.file.originalname,
        task_Code : req.body.task_Code,
        created : today
    }

    TaskSubcategoriesModel.findOne({
        where : {
            taskSubCategory_name : req.body.taskSubCategory_name
        }
    })
    .then(task => {
        if(!task){
            TaskSubcategoriesModel.create(taskData)
            .then(task => {
                res.json({message : task.taskSubCategory_name + ' registered'});
            })
            .catch(err =>{
                res.send('error: '+ err);
            })
           
        }else{
            res.json({message: 'Task sub-category already exists'});
        }
    })
    .catch(err => {
        res.send('error: '+ err);
    })
});

/////////////////////////////////Get all task subcategories//////////////////////////////////////////////////////////
tasksRoute.get('/subcategory/list', (req, res) => {
    TaskSubcategoriesModel.findAll().then(
        taskSubcategories => res.json(taskSubcategories)
        );
})

/////////////////////////////////Get all task subcategories//////////////////////////////////////////////////////////
tasksRoute.get('/category/:task_Code', (req, res) => {
    TaskSubcategoriesModel.findAll({
        where: {
            task_Code : req.params.task_Code
        }
    }).then(tasks => res.json({
        taskSubCategory_id : tasks.taskSubCategory_id,
        taskSubCategory_name : tasks.taskSubCategory_name, 
        taskSubCategory_image : tasks.task_Image
    }));
})


module.exports = tasksRoute;