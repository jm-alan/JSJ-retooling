const { Post, Thread, User } = require('../db/models');

module.exports = async (id) => await Thread.findAll({ where: { id }, include: [Post, User] });
