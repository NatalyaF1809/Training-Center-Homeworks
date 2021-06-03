const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./models/todos');

const PORT = 3000;

const todoRoutes = require('./routes/todo');
const app = express();

mongoose.connect('mongodb+srv://natalyaf:troyanda123456@cluster0.nyewb.mongodb.net/todoDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: true, 
    useCreateIndex: true
});

console.log('started');

app.use(express.json());

app.use('/', todoRoutes)

app.listen(PORT);