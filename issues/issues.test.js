const supertest = require("supertest")
const server = require("../index")
const db = require("../data/db-config")


beforeEach(async () => {
  await db("users").truncate()
  await db("issues").truncate()
    await db.seed.run
})

afterAll(async () => {
  await db.destroy()
});

test("Test Route", async () => {
  const res = await supertest(server).get("/")
  expect(res.status).toBe(200)
  expect(res.type).toBe("text/html");
  expect(res.text).toBe("<h3>Co-make API is live!</h3>")
  })

//$$$$$$$$$$$$$$$$$ THESE TESTS WORK $$$$$$$$$$$$$$$$$$$$$$$
  const testIssue = {
  
    issue: "Newly Created Issue",
    issue_description: "I'm an issue description",
    hazard_level: 2,
    city: "Chicago",
    state: "Illinois",
    zip_code: 60619
  
}

const user ={ 
  username: "User", 
  password: "password",
  email: "user@test.com",
  first_name: "User",
  last_name: "Test",
  city: "Userapolis",
  state: "User",
  zip_code: 61401,
  is_admin: 0
}

    describe("Issues Tests",  () => {
      test("get all issues", async () => {
        const regRes = await supertest(server)
            .post("/api/auth/register")
            .send(user);

          const res = await supertest(server)
            .post("/api/auth/login")
            .send({ username: "User", password: "password" });
          expect(res.status).toBe(200);
          expect(res.type).toBe("application/json");
          expect(res.body.user.username).toBe("User");


        const issues = await supertest(server)
        .get("/api/users/1/issues")
      expect(issues.status).toBe(200);
      expect(issues.type).toBe("application/json");
      // expect(issues).toBe(issues[0]);
      });
  
      // test("get issues by user", async () => {
      //   const regRes = await supertest(server)
      //       .post("/api/auth/register")
      //       .send(user);

      //     const res = await supertest(server)
      //       .post("/api/auth/login")
      //       .send({ username: "User", password: "password" });
      //     expect(res.status).toBe(200);
      //     expect(res.type).toBe("application/json");
      //     expect(res.body.user.username).toBe("User");


      //   const issues = await supertest(server)
      //   .get(`/api/users/1/issues/`)
      // expect(issues.status).toBe(200);
      // expect(issues.type).toBe("application/json");
      // expect(issues[0]).toBe(issues);
      // });

      test("post a new issue", async () => {
        const regRes = await supertest(server)
            .post("/api/auth/register")
            .send({ 
                username: "User", 
            password: "password",
            email: "user@test.com",
            first_name: "User",
            last_name: "Test",
            city: "Userapolis",
            state: "User",
            zip_code: 61401,
            is_admin: 0
         });

          const res = await supertest(server)
            .post("/api/auth/login")
            .send({ username: "User", password: "password" });

        const postIssue = await supertest(server)
        .post(`/api/users/${res.body.user.id}/issues`)
        .send(testIssue)
        expect(postIssue.status).toBe(201);
        expect(postIssue.type).toBe("application/json");
        expect(postIssue.body.issue.issue).toBe("Newly Created Issue");
       })

       test("Update an issue", async () => {
        await supertest(server)
            .post("/api/auth/register")
            .send(user);

          const res = await supertest(server)
            .post("/api/auth/login")
            .send({ username: "User", password: "password" });
          expect(res.status).toBe(200);
          expect(res.type).toBe("application/json");
          expect(res.body.user.username).toBe("User");

          const postIssue = await supertest(server)
          .post(`/api/users/${res.body.user.id}/issues`)
          .send(testIssue)

        const update = await supertest(server)
        .put(`/api/users/1/issues/${postIssue.body.issue.id}`)
        .send({...testIssue ,issue_description : "New Issue description"})
        expect(200).toBe(200);
        expect(update.type).toBe("application/json");
        expect(update.body.issue.issue_description).toBe("New Issue description");
       })

       test("Delete an issue", async () => {
        const regRes = await supertest(server)
            .post("/api/auth/register")
            .send(user);



          const res = await supertest(server)
            .post("/api/auth/login")
            .send({ username: "User", password: "password" });
          expect(res.status).toBe(200);
          expect(res.type).toBe("application/json");
          expect(res.body.user.username).toBe("User");

          const postIssue = await supertest(server)
          .post(`/api/users/${res.body.user.id}/issues`)
          .send(testIssue)

        const deleteIssue = await supertest(server)
        .delete(`/api/users/${res.body.user.id}/issues/1`)
        expect(deleteIssue.status).toBe(200);
        expect(deleteIssue.type).toBe("application/json");
        expect(deleteIssue.body).toEqual({removed: 1});
       })

      });

