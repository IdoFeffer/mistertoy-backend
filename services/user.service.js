import fs from "fs"
import Cryptr from "cryptr"
import { utilService } from "./util.service.js"

const cryptr = new Cryptr(process.env.SECRET1 || "secret-puk-1234")
const STORAGE_PATH = "data/user.json"

export const userService = {
  query,
  getById,
  remove,
  save,
  checkLogin,
  getLoginToken,
  validateToken,
}

// Load users from file dynamically to reflect updates
function _loadUsers() {
  return utilService.readJsonFile(STORAGE_PATH)
}

async function query() {
  try {
    const users = _loadUsers()
    return users.map((user) => ({
      _id: user._id,
      fullname: user.fullname,
      score: user.score,
    }))
  } catch (err) {
    console.error("Query users failed:", err)
    throw err
  }
}

function getById(userId) {
  const users = _loadUsers()
  const user = users.find((user) => user._id === userId)
  if (!user) return Promise.reject("User not found!")

  const { _id, username, fullname, score } = user
  return Promise.resolve({ _id, username, fullname, score })
}

async function remove(userId) {
  try {
    let users = _loadUsers()
    const idx = users.findIndex((user) => user._id === userId)
    if (idx === -1) throw new Error("User not found!")
    users.splice(idx, 1)
    await _saveUsersToFile(users)
  } catch (err) {
    console.error("Remove user failed:", err)
    throw err
  }
}

async function save(user) {
  try {
    let users = _loadUsers()
    let userToSave

    if (user._id) {
      userToSave = users.find((u) => u._id === user._id)
      if (!userToSave) throw new Error("User not found!")
      userToSave.score = user.score
    } else {
      userToSave = {
        _id: utilService.makeId(),
        username: user.username,
        password: user.password,
        fullname: user.fullname,
        score: 10000,
        isAdmin: false,
      }
      users.push(userToSave)
    }

    const miniUser = {
      _id: userToSave._id,
      fullname: userToSave.fullname,
      score: userToSave.score,
      isAdmin: userToSave.isAdmin,
    }

    await _saveUsersToFile(users)
    return miniUser
  } catch (err) {
    console.error("Save failed:", err)
    throw err
  }
}

async function checkLogin({ username, password }) {
  try {
    const users = _loadUsers()
    const user = users.find(
      (u) => u.username === username && u.password === password
    )
    if (!user) return null

    const { _id, fullname, score, isAdmin } = user
    return { _id, fullname, score, isAdmin }
  } catch (err) {
    console.error("Login check failed:", err)
    throw err
  }
}

function getLoginToken(user) {
  const str = JSON.stringify(user)
  return cryptr.encrypt(str)
}

function validateToken(token) {
  try {
    const str = cryptr.decrypt(token)
    return JSON.parse(str)
  } catch {
    return null
  }
}

function _saveUsersToFile(users) {
  return new Promise((resolve, reject) => {
    const usersStr = JSON.stringify(users, null, 2)
    fs.writeFile(STORAGE_PATH, usersStr, (err) => {
      if (err) {
        console.log("Failed to write users file:", err)
        return reject(err)
      }
      resolve()
    })
  })
}
