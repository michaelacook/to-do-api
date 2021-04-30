if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const logger = require("morgan")
const createError = require("http-errors")
const cors = require("cors")

const userRouter = require("./routes/user")
const categoryRouter = require("./routes/category")
const listRouter = require("./routes/list")
const listItemRouter = require("./routes/listItem")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my to-do list API! To view the documentation visit https://github.com/michaelacook/to-do-api#endpoints"
  })
})

app.use("/users", userRouter)
app.use("/categories", categoryRouter)
app.use("/lists", listRouter)
app.use("/list-items", listItemRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  res.status(err.status || 500).json(err)
})

module.exports = app
