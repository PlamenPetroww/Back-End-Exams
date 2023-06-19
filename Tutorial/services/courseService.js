const Course = require('../models/Course');

exports.getAll = (search) => {
    let query = {};
    if (search) {
        query.title = new RegExp(search, 'i');
    }

    return Course.find(query).sort({ createdAt: 1 }).lean();

}

exports.getOne = (courseId) => Course.findById(courseId).lean();

exports.search = async (name) => {
    let course = await this.getAll();

    if (name) {
        course = course.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    return course;
}

exports.create = (ownerId, courseData) => Course.create({ ...courseData, owner: ownerId });

exports.getRecent = () => Course.find({}).sort({ userCount: -1 }).limit(3).lean();

exports.getById = (id) => Course.findById(id).lean();

exports.edit = (id, courseData) => Course.findByIdAndUpdate(id, courseData, { runValidators: true });

exports.deleteById = (id) => Course.findByIdAndDelete(id);

exports.enrollUser = async (courseId, userId) => {
    const existing = await Course.findById(courseId);
    existing.users.push(userId);
    existing.userCount++;
    return existing.save();
};