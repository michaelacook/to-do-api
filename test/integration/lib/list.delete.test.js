const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

const listService = require("../../../services/list")

module.exports = () => {
  describe("DELETE list routes", () => {
    it("returns 204 No Content on the happy path", async () => {
      const lists = await listService._getAllLists(1)
      const { id } = lists[lists.length - 1]

      request(app)
        .delete(`/lists/${id}`)
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(204)
    })

    it("returns 401 Unauthorized when auth credentials not sent", (done) => {
      request(app).delete("/lists/1").expect(401, done)
    })

    it("returns 404 Not Found when a non-existent id sent", (done) => {
      request(app)
        .delete("/lists/1000000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(404, done)
    })
  })
}
