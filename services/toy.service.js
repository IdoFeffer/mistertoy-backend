import fs from "fs"
import { utilService } from "./util.service.js"
import { loggerService } from "./logger.service.js"

export const toyService = {
  query,
  getById,
  remove,
  save,
}

const PAGE_SIZE = 5
const toys = utilService.readJsonFile("data/toy.json")

async function query(filterBy = {}) {
  try {
    let toysToReturn = [...toys]

    const regex = new RegExp(filterBy.txt || "", "i")
    toysToReturn = toysToReturn.filter((toy) => regex.test(toy.toyName))

    if (filterBy.inStock !== undefined) {
      toysToReturn = toysToReturn.filter(
        (toy) => toy.inStock === filterBy.inStock
      )
    }

    if (filterBy.labels && filterBy.labels.length) {
      toysToReturn = toysToReturn.filter((toy) =>
        filterBy.labels.some((label) => toy.labels.includes(label))
      )
    }

    if (filterBy.sortBy) {
      toysToReturn.sort((toyA, toyB) => {
        if (filterBy.sortBy === "name") {
          return toyA.toyName.localeCompare(toyB.toyName) * filterBy.sortDir
        }
        return (
          (toyA[filterBy.sortBy] - toyB[filterBy.sortBy]) * filterBy.sortDir
        )
      })
    }

    if (filterBy.pageIdx !== undefined) {
      const startIdx = filterBy.pageIdx * PAGE_SIZE
      toysToReturn = toysToReturn.slice(startIdx, startIdx + PAGE_SIZE)
    }

    return toysToReturn
  } catch (err) {
    console.error("Query failed:", err)
    throw err
  }
}

async function getById(toyId) {
  try {
    const toy = toys.find((toy) => toy._id === toyId)
    if (!toy) throw new Error("Toy not found")
    toy.msgs = ["Nice!", "Great toy!", "My kid loved it!"]
    return toy
  } catch (err) {
    console.error("getById:", err.message)
    throw err
  }
}

async function remove(toyId) {
  try {
    const idx = toys.findIndex((toy) => toy._id === toyId)
    if (idx === -1) throw new Error("No such toy")

    toys.splice(idx, 1)
    await _saveToysToFile()
  } catch (err) {
    console.error("Remove failed:", err)
    throw err
  }
}

async function save(toy) {
  try {
    if (toy._id) {
      const idx = toys.findIndex((curr) => curr._id === toy._id)
      if (idx === -1) throw new Error("Toy not found")
      toys[idx] = { ...toys[idx], ...toy }
    } else {
      toy._id = utilService.makeId()
      toy.createdAt = Date.now()
      toys.push(toy)
    }
    await _saveToysToFile()
    return toy
  } catch (err) {
    console.error("Save failed:", err)
    throw err
  }
}

function _saveToysToFile() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(toys, null, 2)
    fs.writeFile("data/toy.json", data, (err) => {
      if (err) {
        loggerService.error("Cannot write to toys file", err)
        return reject(err)
      }
      resolve()
    })
  })
}
