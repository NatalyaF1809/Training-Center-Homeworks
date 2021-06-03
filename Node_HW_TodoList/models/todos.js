const mongoose = require('mongoose');
const Joi = require('joi');
const Joigoose = require("joigoose")(mongoose);

const joiTodo = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(5).required(),
    done: Joi.boolean().required()
})

var Todo = new mongoose.Schema(Joigoose.convert(joiTodo));

module.exports = mongoose.model('Todo', Todo);