const { Comment } = require("../../db");

const getCurrentComment = async (param) => {
  try {
    let currentComment = await Comment.findOne({ where: { userId: param } });
    return currentComment;
  } catch (error) {
    console.log('controller' + error);
  }
};

module.exports = {
  getCurrentComment,
};
