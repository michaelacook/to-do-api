const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("PUT user routes", () => {
    it("returns 200 OK and an updated user object on happy path", (done) => {
      request(app)
        .put("/users/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          firstName: "Updated Name",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isObject(response.body)
          assert.hasAllDeepKeys(response.body, [
            "id",
            "email",
            "password",
            "firstName",
            "lastName",
            "createdAt",
            "updatedAt",
          ])
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    it("returns 401 Unauthorized when auth credentials not sent", (done) => {
      request(app).put("/users/1").expect(401, done)
    })

    it("returns 401 Unauthorized when requesting another user's data", (done) => {
      request(app)
        .put("/users/2")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          lastName: "Updated name",
        })
        .set("Accept", "application/json")
        .expect(401)
        .then((response) => {
          assert.equal(
            response.body,
            "You do not have authorization to modify the requested resource."
          )
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    it("returns 404 Not Found when non-existent id passed", (done) => {
      request(app)
        .put("/users/1000000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          firstName: "Updated Name",
        })
        .expect(404, done)
    })
  })
}
