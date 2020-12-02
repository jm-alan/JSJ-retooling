//100 most popular questions

const db = require('../db/models');

const mostPopular = async () => {
   const posts = await db.Post.findAll({where: {isQestion: true}, order: ['score', 'DESC'], limit: 100});
   const postIds = posts.forEach(post => post.id);
    return postIds
};


const mostRecent = async () => {
    const posts = await db.Post.findAll({where: {isQuestion: true}, order: ['createdAt', 'DESC'], limit: 100})
    const postIds = posts.forEach(post => post.id);
    return postIds
};


const getPostById = async (id) => {
    return await db.Post.findByPk(id)
};

module.exports = {
    mostPopular,
    mostRecent,
    getPostById
};
