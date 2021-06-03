const express = require('express');
const router = express.Router();

const addTodo = require('../middleware/addTodo');
const getTodos = require('../middleware/getTodos');
const removeTodo = require('../middleware/removeTodo');
const markDoneUnDone = require('../middleware/markDoneUnDone');
const getOneTodo = require('../middleware/getOneTodo');


router.get('/', getTodos, function(req, res) {
    return res.send(req.data);
})

router.get('/:id', getOneTodo, function (req, res) {
    return res.send(req.data);
})

router.post('/', addTodo, function (req, res) {
    return res.send(req.data);
})

router.delete('/:id', removeTodo, function(req, res) {
    return res.send('Deleted!');
})

router.put('/:id', markDoneUnDone, function (req, res) {
    return res.send(req.data);
})

module.exports = router;