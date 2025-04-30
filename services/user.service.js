import fs from 'fs'
import Cryptr from 'cryptr'
import { utilService } from './util.service.js'

const cryptr = new Cryptr(process.env.SECRET1 || 'secret-puk-1234')
const STORAGE_PATH = 'data/user.json'

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

function query() {
    const users = _loadUsers()
    const usersToReturn = users.map(user => ({
        _id: user._id,
        fullname: user.fullname,
        score: user.score,
    }))
    return Promise.resolve(usersToReturn)
}

function getById(userId) {
    const users = _loadUsers()
    const user = users.find(user => user._id === userId)
    if (!user) return Promise.reject('User not found!')

    const { _id, username, fullname, score } = user
    return Promise.resolve({ _id, username, fullname, score })
}

function remove(userId) {
    let users = _loadUsers()
    const idx = users.findIndex(user => user._id === userId)
    if (idx === -1) return Promise.reject('User not found!')
    users.splice(idx, 1)
    return _saveUsersToFile(users)
}

function save(user) {
    let users = _loadUsers()
    let userToSave
    if (user._id) {
        userToSave = users.find(u => u._id === user._id)
        if (!userToSave) return Promise.reject('User not found!')
        userToSave.score = user.score
    } else {
        userToSave = {
            _id: utilService.makeId(),
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            score: 100,
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
    return _saveUsersToFile(users).then(() => miniUser)
}

function checkLogin({ username, password }) {
    const users = _loadUsers()
    const user = users.find(u => u.username === username && u.password === password)
    if (!user) return Promise.resolve(null)

    const { _id, fullname, score, isAdmin } = user
    return Promise.resolve({ _id, fullname, score, isAdmin })
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
        fs.writeFile(STORAGE_PATH, usersStr, err => {
            if (err) {
                console.log('Failed to write users file:', err)
                return reject(err)
            }
            resolve()
        })
    })
}
