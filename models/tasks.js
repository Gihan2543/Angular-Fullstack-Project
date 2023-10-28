const mongoose = require('mongoose');

// User Schema
const TaskSchema = mongoose.Schema({
    userID: {
        type: String,
        trim: true
    },
    task_name: {
        type: String,
        trim: true,
        required: 'Enter a task name'
    },
    startTime: {
        type: Number,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Number,
        required: true,
        default: Date.now
    },
    hours: {
        type: Number,
        required: true,
        default: 0
    },
    minutes: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        required: true
    }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);