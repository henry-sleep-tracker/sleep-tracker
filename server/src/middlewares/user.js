const forgotPassswordValdiator = async (req, res, next) => {
  if (process.env.REACT_APP_BASE_FRONT_URL === undefined) {
    console.log(
      "No se puede leer process.env.REACT_APP_BASE_FRONT_URL. se usara el predefinido localhost "
    );
    process.env.REACT_APP_BASE_FRONT_URL = "http://localhost:3001";
  }

  return next();
};

module.exports = { forgotPassswordValdiator };
