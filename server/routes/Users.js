const express = require('express');
const cors = require('cors');
const usersRoute = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const RandExp = require('randexp');
const randexp = new RandExp(/\w{40}/);

const UserModel = require('../models/User');
usersRoute.use(cors());

process.env.SECURITY_KEY = 'secret';

/////////////////////////////////////Allow new users to sign up///////////////////////////////////////////
usersRoute.post('/register', (req, res)=> {
    const today = new Date();
    const userData = {
        user_id : randexp.gen(),
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    UserModel.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash;
                UserModel.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered'});
                })
                .catch(err =>{
                    res.send('error: '+ err);
                })
            })
        }else{
            res.json({message: 'Email already exists'});
        }
    })
    .catch(err => {
        res.send('error: '+ err);
    })
});

/////////////////////////////////////Allow users to login/////////////////////////////////////////////////
usersRoute.post('/login', (req, res) =>{
    UserModel.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECURITY_KEY, {
                    expiresIn: "30 days"
                });
                //res.send(token);
                res.json({
                    is_user: true, 
                    message: 'Logged in successfully', 
                    token: token
                });
            }else{
                res.json({
                    is_user: false, 
                    message: 'Email or password is incorrect'
                });
            }
        }else{
            res.json({
                is_user: false, 
                message: 'User doest not exist'
            });
        }
    })
    .catch(err => {
        res.json({error: err});
    })
});

/////////////////////////////////////Get all users//////////////////////////////////////////////////////////////
usersRoute.get('/', (req, res) => {
    UserModel.findAll().then(users => res.json(users));
});

/////////////////////////////////////Get a users by Id//////////////////////////////////////////////////////////
usersRoute.get('/:user_id', (req, res) => {
    UserModel.findOne({
        where: {
            user_id: req.params.user_id
        }
    }).then(users => res.json({
        first_Name :users.first_Name, 
        last_Name :users.last_Name, 
        email :users.email
    }));
})

/////////////////////////////////////Update a users record by Id/////////////////////////////////////////////////
usersRoute.put('/update-info/:email', (req, res) => {
    UserModel.update(
        {
            first_Name : req.body.first_Name,
            last_Name : req.body.last_Name
        },
        { where : { email: req.params.email } }
    ).then(user => res.json({
        message : 'Updated successfully'
    }))
})

/////////////////////////////////////Delete a users by Id///////////////////////////////////////////////////////
usersRoute.delete('/delete-user/:user_id', (req, res) => {
    UserModel.destroy({
        where: {
            user_id: req.params.user_id
        }
    }).then(users => res.json({
        message : 'user deleted successfully' 
    }));
})

module.exports = usersRoute;
