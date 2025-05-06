import path from "path"
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import { toyService } from "./services/toy.service.js"
import { userService } from "./services/user.service.js"
import { loggerService } from "./services/logger.service.js"
import { authRoutes } from "./api/auth/auth.routes.js"
import { userRoutes } from "./api/user/user.routes.js"
import { toyRoutes } from "./api/toy/toy.routes.js"

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

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)

app.get("/*all", (req, res) => {
  res.sendFile(path.resolve("public/index.html"))
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () =>
  loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`)
)
