const Todo = require('../models/todos');

async function getTodos(req, res, next) {
    try {
        const result = {data : await Todo.find({})};
        req.data = result;
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    next();
}

module.exports = getTodos;