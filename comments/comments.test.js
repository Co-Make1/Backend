const supertest = require("supertest")
const server = require("../index")
const db = require("../data/db-config")


beforeEach(async () => {
  await db("users").truncate()
    await db.seed.run
    await db("users").truncate()
})

afterAll(async () => {
  await db.destroy();
});

const testComment = {
  comment: "new comment"
}

    describe("Get Comments",  () => {
      test("get all comments", async () => {
        const regRes = await supertest(server)
          .post("/api/auth/register")
          .send({ 
              username: "SuperTest1", 
          password: "password",
          email: "super@test1.com",
          first_name: "Super",
          last_name: "Test",
          city: "SuperTestapolis",
          state: "Stable",
          zip_code: 61401,
          is_admin: false
       });

      });
      // test("post a new comment", async () => {
      //   const comments = await supertest(server)
      //   .get("/api/users/1/issues/1/comments", testComment)
      // expect(comments.status).toBe(200);
      // expect(comments.type).toBe("application/json");
      // expect(comments.body[0].comment).toBe("I'm the first comment.");
      //  })

      });