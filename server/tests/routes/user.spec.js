const supertest = require("supertest");
const { request } = require("../../src/app");
const server = require("../../src/app");
const { User, conn } = require("../../src/db");
const api = supertest(server);
const { usersInfo } = require("./helpers/helpers");

describe("route user:", () => {
  beforeEach(async () => {
    await conn.sync({ force: true });
    await User.bulkCreate(usersInfo);
  });
  test("user is returned as json", async () => {
    await api
      .get("/user/jnsparrado@hotmail.com")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("The field email is necessary to add a new user", async () => {
    const invalidUser = {
      password: "Abcde123*",
      names: "juan felipe",
      lastNames: "parrado salinas",
      nationality: "Colombia",
      birthday: "1995-04-11",
    };
    await api.post("/user").send(invalidUser).expect(428);
  });

  test("The field names is necessary to add a new user", async () => {
    const invalidUser = {
      email: "jnsparrado3@hotmail.com",
      password: "Abcde123*",
      lastNames: "parrado salinas",
      nationality: "Colombia",
      birthday: "1995-04-11",
    };
    await api.post("/user").send(invalidUser).expect(428);
  });

  test("The field lastNames is necessary to add a new user", async () => {
    const invalidUser = {
      email: "jnsparrado3@hotmail.com",
      password: "Abcde123*",
      names: "juan felipe",
      nationality: "Colombia",
      birthday: "1995-04-11",
    };
    await api.post("/user").send(invalidUser).expect(428);
  });

  test("A new valid user can be added", async () => {
    const validUser = {
      email: "juanfelipeparrado@gmail.com",
      password: "Abcde123*",
      names: "juan felipe",
      lastNames: "parrado salinas",
      nationality: "Colombia",
      birthday: "1995-04-11",
    };
    await api
      .post("/user")
      .send(validUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api.get("/user/juanfelipeparrado@gmail.com").expect(200);
  });
});
