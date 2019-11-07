const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const RandExp = require('randexp');
const randexp = new RandExp(/\w{40}/);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.listen(1010, ()=> console.log('Server is runnig on http://localhost:1010'+ " === " + randexp.gen()));

const Users = require('./routes/Users');
const Tasks = require('./routes/Tasks');
// const Workers = require('./routes/Workers');

app.use('/api/users', Users);
app.use('/api/tasks', Tasks);
// app.use('/workers', Workers);
app.use('/task-icon',express.static('images/tasks_pictures'));
app.use('/profile-icon',express.static('images/users_pictures'));

