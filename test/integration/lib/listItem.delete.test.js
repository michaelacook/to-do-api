const request = require("supertest")
const app = require("../../../app")

const listService = require("../../../services/list")

module.exports = () => {
  describe("DELETE list-items route", () => {
    it("returns 204 No Content on the happy path", async () => {
      const { ListItems } = await listService.getList(1)
      const { id } = ListItems[ListItems.length - 1]

      request(app)
        .delete(`/list-items/${id}`)
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(204)
    })

    it("returns 401 Unauthorized when auth credentials not sent", (done) => {
      request(app).delete("/list-items/1").expect(401, done)
    })

    it("returns 404 Not Found when sent a non-existent id", (done) => {
      request(app)
        .delete("/list-items/1000000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(404, done)
    })
  })
}
