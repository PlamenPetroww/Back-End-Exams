const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please write the name of the Course!'],
        minLength: [4, 'Course title must be at least 4 charachters long!'],
    },
    description: {
        type: String,
        required: true,
        maxLength: [50, 'Course title must be at most 50 charachters long!'],
        minLength: [20, 'Course description must be at least 20 charachters long!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Invalid URL!'],
        validate: /^https?:\/\//,
        message: 'Invalid URL!',
    },
    duration: {
        type: String,
        required: [true, 'Please write Duration'],
    },
    createdAt: {
        type: String,
        required: true,
        default: () => (new Date()).toISOString().slice(0, 10)
    },
    users: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    userCount: {
        type: Number,
        default: 0,
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;