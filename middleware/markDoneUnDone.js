const Todo = require('../models/todos');

async function markDoneUnDone(req, res, next) {
    try {
        const id = req.params.id;
        const result = await Todo.findById(id, (err, fieldVal) => {
            fieldVal.done = !fieldVal.done;
            fieldVal.save();
        });
        req.data = result;
    } catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
    next();
}

module.exports = markDoneUnDone;