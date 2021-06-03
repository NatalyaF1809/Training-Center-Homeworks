const Todo = require('../models/todos');

async function removeTodo(req, res, next) {
    try {
        const id = req.params.id;
        const result = await Todo.deleteOne({"_id": id})
        req.data = result;
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    next();
}

module.exports = removeTodo;