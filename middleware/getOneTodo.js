const Todo = require('../models/todos');

async function getOneTodo(req, res, next) {
    try {
        id = req.params.id;
        const result = {data : await Todo.findOne({_id: id})};
        req.data = result;
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    next();
}

module.exports = getOneTodo;
