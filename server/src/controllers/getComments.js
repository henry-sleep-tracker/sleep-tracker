const { Comment } = require("../db");

const getComments = async () => {
  let allComments = await Comment.findAll();
  return allComments;
};

module.exports = {
    getComments,
};