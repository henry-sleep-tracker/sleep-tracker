require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } =
  process.env;
const sequelize = new Sequelize(
  //`postgresql://postgres:WrpAbk2oBdKzw2PgQQNg@containers-us-west-153.railway.app:7381/railway`,
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
); 

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  NewRecord,
  CoffeeSize,
  AlcoholType,
  Activity,
  User,
  Session,
  Stage,
  Steps,
  Plan,
  Comment,
} = sequelize.models;

// Aca vendrian las relaciones

User.hasOne(Comment);
Comment.belongsTo(User);

User.hasMany(NewRecord);
NewRecord.belongsTo(User);

User.hasMany(Activity);
Activity.belongsTo(User);

User.hasMany(CoffeeSize);
CoffeeSize.belongsTo(User);

User.hasMany(AlcoholType);
AlcoholType.belongsTo(User);

NewRecord.belongsToMany(CoffeeSize, {
  through: "record_coffee",
  timestamps: false,
});

NewRecord.belongsToMany(AlcoholType, {
  through: "record_alcohol",
  timestamps: false,
});

NewRecord.belongsToMany(Activity, {
  through: "record_activity",
  timestamps: false,
});

CoffeeSize.belongsToMany(NewRecord, {
  through: "record_coffee",
  timestamps: false,
});

AlcoholType.belongsToMany(NewRecord, {
  through: "record_alcohol",
  timestamps: false,
});

Activity.belongsToMany(NewRecord, {
  through: "record_activity",
  timestamps: false,
});

User.hasOne(Plan);
Plan.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Steps);
Steps.belongsTo(User);

User.hasMany(Session);
Session.belongsTo(User);

User.hasMany(Stage);
Stage.belongsTo(User);

Session.hasMany(Stage);
Stage.belongsTo(Session);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
