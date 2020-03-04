const supertest = require("supertest")
const server = require("../index")
const db = require("../data/db-config")


beforeEach(async () => {
  await db("users").truncate()
    await db.seed.run
})

afterAll(async () => {
  await db.destroy();
});

const testIssue = {
  
    issue: "Newly Created Issue",
    issue_description: "I'm an issue description",
    hazard_level: 2,
    city: "Chicago",
    state: "Illinois",
    zip_code: 60619
  
}


    describe("Get issues",  () => {
      test("get all issues", async () => {
        await supertest(server)
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


        const issues = await supertest(server)
        .get("/api/users/1/issues/")
      expect(issues.status).toBe(200);
      expect(issues.type).toBe("application/json");
      expect(issues.body[0].issue).toBe("pothole");



      });
  

      test("post a new issue", async () => {
        await supertest(server)
        .post("/api/auth/register")
        .send({ 
            username: "SuperTest2", 
        password: "password",
        email: "super@test2.com",
        first_name: "Super",
        last_name: "Test",
        city: "SuperTestapolis",
        state: "Stable",
        zip_code: 61401,
        is_admin: false
     });
        const postIssue = await supertest(server)
        .post("/api/users/1/issues")
        .send(testIssue)
  
        expect(postIssue.status).toBe(201);
        expect(postIssue.type).toBe("application/json");
        expect(postIssue.body.issue).toBe("Newly Created Issue");
       })

      });