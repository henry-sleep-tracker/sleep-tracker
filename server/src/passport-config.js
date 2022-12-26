const LocalStrategy = require("passport-local").Strategy; ////permite usar usernames y passwords to log in
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    //esto se asegura de que el usuario sea correcto
    const user = getUserByEmail(email);
    if (user === null) {
      //si no encuentra ningun usuario
      return done(null, false, {
        message: "No sse encontro ningun usuario con ese email",
      }); //el primer parametro es el error , el segundo es el usuario que se encontro y el tercero sera el mensaje que sera mostrado
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        //primer parametro la contraseña que se envia por el formulario es igual la contrasñea de la db
        return done(null, user); //no hay error y se retorna el usuario correcto
      } else {
        //si la contraseña no hace match
        return done(null, false, { message: "Contraseña incorrecta" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);
  passport.serializeUser((user, done) => {
    //esto serializa el usuario para usarlo dentro de la sesion
  });
  passport.deserializeUser((user, done) => {
    //esto serializa el usuario para usarlo dentro de la sesion
  });
}
module.exports = { initialize };
