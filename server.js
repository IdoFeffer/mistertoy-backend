import path from "path"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import { toyService } from "./services/toy.service.js"
import { userService } from "./services/user.service.js"
import { loggerService } from "./services/logger.service.js"

const app = express()

const corsOptions = {
  origin: [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  credentials: true,
}
app.use(cors(corsOptions))

// Express Config:
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())
app.set("query parser", "extended")

// Express Routing:

// REST API for Toys
// Get toys 
app.get("/api/toy", (req, res) => {
  const filterBy = {
    txt: req.query.txt || "",
    inStock:
      req.query.inStock !== undefined
        ? req.query.inStock === "true"
        : undefined,
    labels: req.query.labels
      ? Array.isArray(req.query.labels)
        ? req.query.labels
        : [req.query.labels]
      : [],
    sortBy: req.query.sortBy || "name",
    sortDir: +req.query.sortDir || 1,
  }

  toyService
    .query(filterBy)
    .then((toys) => res.send(toys))
    .catch((err) => {
      loggerService.error("Cannot get toys", err)
      res.status(400).send("Cannot get toys")
    })
})

// Get toy
app.get("/api/toy/:toyId", (req, res) => {
  const { toyId } = req.params

  toyService
    .getById(toyId)
    .then((toy) => {
      if (!toy) return res.status(404).send("Toy not found")

      toy.msgs = [
        { from: "Support", txt: "Hi! Need help?" },
        { from: "System", txt: "Toy viewed 3 times" },
      ]

      res.send(toy)
    })
    .catch((err) => {
      loggerService.error("Cannot get toy", err)
      res.status(400).send("Cannot get toy")
    })
})

// Add 
app.post("/api/toy", (req, res) => {
  const loggedinUser = userService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send("Cannot add toy")

  const toy = {
    toyName: req.body.toyName,
    price: +req.body.price,
    imgUrl: req.body.imgUrl || "",
    labels: req.body.labels || [],
    inStock: req.body.inStock ?? true,
    createdAt: Date.now(),
    owner: {
      _id: loggedinUser._id,
      fullname: loggedinUser.fullname,
    },
  }

  toyService
    .save(toy, loggedinUser)
    .then((savedToy) => res.send(savedToy))
    .catch((err) => {
      loggerService.error("Cannot save toy", err)
      res.status(400).send("Cannot save toy")
    })
})

// Edit 
app.put("/api/toy/:id", (req, res) => {
  const loggedinUser = userService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send("Cannot update toy")

  const toy = {
    ...req.body,
    _id: req.params.id,
  }

  toyService
    .save(toy, loggedinUser)
    .then((savedToy) => res.send(savedToy))
    .catch((err) => {
      loggerService.error("Cannot save toy", err)
      res.status(400).send("Cannot save toy")
    })
})

// Delete 
app.delete("/api/toy/:toyId", (req, res) => {
  const loggedinUser = userService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(401).send("Cannot remove toy")

  const { toyId } = req.params
  toyService
    .remove(toyId, loggedinUser)
    .then(() => res.send("Removed!"))
    .catch((err) => {
      loggerService.error("Cannot remove toy", err)
      res.status(400).send("Cannot remove toy")
    })
})

// User API
app.get("/api/user", (req, res) => {
  userService
    .query()
    .then((users) => res.send(users))
    .catch((err) => {
      loggerService.error("Cannot load users", err)
      res.status(400).send("Cannot load users")
    })
})

app.get("/api/user/:userId", (req, res) => {
  const { userId } = req.params

  userService
    .getById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      loggerService.error("Cannot load user", err)
      res.status(400).send("Cannot load user")
    })
})

// Auth API
app.post("/api/auth/login", (req, res) => {
  const credentials = req.body

  userService
    .checkLogin(credentials)
    .then((user) => {
      if (user) {
        const loginToken = userService.getLoginToken(user)
        res.cookie("loginToken", loginToken)
        res.send(user)
      } else {
        res.status(401).send("Invalid Credentials")
      }
    })
    .catch((err) => {
      loggerService.error("Cannot login", err)
      res.status(400).send("Cannot login")
    })
})

app.post("/api/auth/signup", (req, res) => {
  const credentials = req.body

  userService
    .save(credentials)
    .then((user) => {
      if (user) {
        const loginToken = userService.getLoginToken(user)
        res.cookie("loginToken", loginToken)
        res.send(user)
      } else {
        res.status(400).send("Cannot signup")
      }
    })
    .catch((err) => {
      loggerService.error("Cannot signup", err)
      res.status(400).send("Cannot signup")
    })
})

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("loginToken")
  res.send("logged-out!")
})

app.put("/api/user", (req, res) => {
  const loggedinUser = userService.validateToken(req.cookies.loginToken)
  if (!loggedinUser) return res.status(400).send("No logged in user")
  const { diff } = req.body
  if (loggedinUser.score + diff < 0) return res.status(400).send("No credit")
  loggedinUser.score += diff
  return userService
    .save(loggedinUser)
    .then((user) => {
      const token = userService.getLoginToken(user)
      res.cookie("loginToken", token)
      res.send(user)
    })
    .catch((err) => {
      loggerService.error("Cannot edit user", err)
      res.status(400).send("Cannot edit user")
    })
})

// Fallback route
app.get("/*all", (req, res) => {
  res.sendFile(path.resolve("public/index.html"))
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)
