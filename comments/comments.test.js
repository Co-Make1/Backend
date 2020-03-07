const supertest = require("supertest");
const server = require("../index");
const db = require("../data/db-config");

// beforeEach(async () => {
//   await db("users").truncate();
//   await db("issues").truncate();
//   await db("comments").truncate();
//   await db.seed.run;
// });

// afterAll(async () => {
//   await db.seed.run;
//   await db.destroy();
// });

test("Test Route", async () => {
  const res = await supertest(server).get("/");
  expect(res.status).toBe(200);
  expect(res.type).toBe("text/html");
  expect(res.text).toBe("<h3>Co-make API is live!</h3>");
});

const user = {
  username: "User",
  password: "password",
  email: "user@test.com",
  first_name: "User",
  last_name: "Test",
  city: "Userapolis",
  state: "User",
  zip_code: 61401,
  is_admin: 0
};
beforeAll(async () => {
  await supertest(server)
    .post("/api/auth/register")
    .send(user);

  await supertest(server)
    .post("/api/auth/login")
    .send({ username: "User", password: "password" });
});
describe("Comments Routers", () => {
  test("Get All Comments", async () => {
    // await supertest(server)
    //   .post("/api/auth/register")
    //   .send(user);

    // await supertest(server)
    //   .post("/api/auth/login")
    //   .send({ username: "User", password: "password" });

    await supertest(server).get("/api/users/1/issues");

    await supertest(server)
      .post("/api/users/1/issues/1/comments")
      .send({ comment: "I'm a test comment!" });

    await supertest(server)
      .post("/api/users/1/issues/1/comments")
      .send({ comment: "I'm also a test comment!" });

    const allComments = await supertest(server).get(
      "/api/users/1/issues/1/comments/allComments"
    );
    expect(allComments.type).toBe("application/json");
    expect(allComments.body[1].comment).toBe("I'm also a test comment!");
  });

  test("Update a Comment", async () => {
    const regRes = await supertest(server)
      .post("/api/auth/register")
      .send(user);

    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "User", password: "password" });
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.user.username).toBe("User");

    const issues = await supertest(server).get("/api/users/1/issues");
    expect(issues.status).toBe(200);
    expect(issues.type).toBe("application/json");
    // expect(issues).toBe(issues[0]);

    const comments = await supertest(server)
      .post("/api/users/1/issues/1/comments")
      .send({ comment: "I'm a test comment!" });

    expect(comments.status).toBe(201);
    expect(comments.type).toBe("application/json");
    expect(comments.body.comment).toBe("I'm a test comment!");

    const comment2 = await supertest(server)
      .post("/api/users/1/issues/1/comments")
      .send({ comment: "I'm also a test comment!" });

    expect(comment2.status).toBe(201);
    expect(comment2.type).toBe("application/json");
    expect(comment2.body.comment).toBe("I'm also a test comment!");

    const allComments = await supertest(server).get(
      "/api/users/1/issues/1/comments/allComments"
    );
    expect(allComments.type).toBe("application/json");
    expect(allComments.body[1].comment).toBe("I'm also a test comment!");
  });

  test("Post A Comment ", async () => {
    // await supertest(server)
    //   .post("/api/auth/register")
    //   .send(user);

    // await supertest(server)
    //   .post("/api/auth/login")
    //   .send({ username: "User", password: "password" });

    await supertest(server).get("/api/users/1/issues");

    await supertest(server)
      .post("/api/users/1/issues/1/comments")
      .send({ comment: "I'm a test comment!" });

    const updated = await supertest(server)
      .put("/api/users/1/issues/1/comments/1")
      .send({ comment: "I'm an updated test comment!" });

    expect(updated.status).toBe(200);
    expect(updated.type).toBe("application/json");
    expect(updated.body.comment).toBe("I'm an updated test comment!");
  });

  test("Delete A Comment ", async () => {
    // await supertest(server)
    //   .post("/api/auth/register")
    //   .send(user);

    // await supertest(server)
    //   .post("/api/auth/login")
    //   .send({ username: "User", password: "password" });

    await supertest(server).get("/api/users/1/issues");

    await supertest(server)
      .post("/api/users/1/issues/1/comments")
      .send({ comment: "I'm a test comment!" });

    const updated = await supertest(server).delete(
      "/api/users/1/issues/1/comments/1"
    );

    expect(updated.status).toBe(200);
    expect(updated.type).toBe("application/json");
    expect(updated.body).toEqual({ removed: 1 });
  });
});
