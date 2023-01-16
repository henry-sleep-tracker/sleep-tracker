const { User } = require("../../db.js");

const getNationalities = async (req, res) => {

  try {
    const nationalities = await User.findAll({
      attributes: ['nationality'],
      group: ['nationality']
    });
    const nationalitiesResponse = nationalities.map( element => element.nationality);
    return res.status(200).json(nationalitiesResponse);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = { getNationalities };
