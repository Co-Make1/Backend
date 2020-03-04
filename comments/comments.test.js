const supertest = require("supertest")
const server = require("../index")
const db = require("../data/db-config")

beforeEach(async () => {
  await db.seed.run
  await db("users").truncate()
})
test("Test Route", async () => {
  const res = await supertest(server).get("/")
  expect(res.status).toBe(200)
  expect(res.type).toBe("text/html");
  expect(res.text).toBe("<h3>Co-make API is live!</h3>")
  })


// beforeEach(async () => {
//     await db.seed.run
//     await db("users").truncate()
// })

// afterAll(async () => {
//   await db.destroy();
// });

// const testComment = {
//   comment: "new comment"
// }

//     describe("Get Comments",  () => {
//       test("get all comments", async () => {
//         await supertest(server)
//           .post("/api/auth/register")
//           .send({ 
//               username: "SuperTest2", 
//           password: "password",
//           email: "super@test2.com",
//           first_name: "Super",
//           last_name: "Test",
//           city: "SuperTestapolis",
//           state: "Stable",
//           zip_code: 61401,
//           is_admin: false
//        });
//        const res = await supertest(server)
//        .get("/api/users/1/issues/1/comments/allComments")
//        expect(res.status).toBe(200)
//        expect(res.type).toBe("application/json")
//        expect(res.body[0].comment).toBe("I'm the first comment.");

//       });
//       test("post a new comment", async () => {
//         await supertest(server)
//         .post("/api/auth/register")
//         .send({ 
//             username: "SuperTest3", 
//         password: "password",
//         email: "super@test3.com",
//         first_name: "Super",
//         last_name: "Test",
//         city: "SuperTestapolis",
//         state: "Stable",
//         zip_code: 61401,
//         is_admin: false
//      });
//         const postComment = await supertest(server)
//         .post("/api/users/1/issues/1/comments")
//         .send(testComment)
//       expect(postComment.status).toBe(201);
//       expect(postComment.type).toBe("application/json");
//       expect(postComment.body.comment).toBe("new comment");
//        })

//       });