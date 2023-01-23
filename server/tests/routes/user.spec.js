const supertest = require("supertest");
const { serverApp } = require("../../src/app");
const { User } = require("../../src/db");
const api = supertest(serverApp);
const usersInfo = [
  {
    email: "jnsparrado@hotmail.com",
    password: "Abcde123*",
    names: "juan felipe",
    lastNames: "parrado salinas",
    nationality: "Colombia",
    birthday: "1995-04-11",
  },
  {
    email: "jnsparrado2@hotmail.com",
    password: "Abcde123*",
    names: "juan felipe2",
    lastNames: "parrado salinas2",
    nationality: "Colombia",
    birthday: "1995-04-12",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await User.bulkCreate(usersInfo, { validate: true });
});
test("user is returned as json", async () => {
  await api
    .get("/user/jnsparrado@hotmail.com")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
