const Todo = require('../models/todos');

async function addTodo(req, res, next) {
    try {
        const result = await Todo.create(req.body);
        req.data = result;
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    next();
}

module.exports = addTodo;