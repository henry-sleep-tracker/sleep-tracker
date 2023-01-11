const { User } = require("../../db.js");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const result = await User.update(updatedFields, {
      where: {
        id: id,
      },
    });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { updateUser }
