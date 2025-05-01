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

function query(filterBy = {}) {
  let toysToReturn = [...toys]

  // Text 
  const regex = new RegExp(filterBy.txt || "", "i")
  toysToReturn = toysToReturn.filter((toy) => regex.test(toy.toyName))

  // In stock 
  if (filterBy.inStock !== undefined) {
    toysToReturn = toysToReturn.filter(
      (toy) => toy.inStock === filterBy.inStock
    )
  }

// Label 
  if (filterBy.labels && filterBy.labels.length) {
    toysToReturn = toysToReturn.filter(toy =>
      filterBy.labels.some(label => toy.labels.includes(label))
    )
  }

  // Sorting
  if (filterBy.sortBy) {
    toysToReturn.sort((toyA, toyB) => {
      if (filterBy.sortBy === "name") {
        return toyA.toyName.localeCompare(toyB.toyName) * filterBy.sortDir
      }
      return (toyA[filterBy.sortBy] - toyB[filterBy.sortBy]) * filterBy.sortDir
    })
  }

  // Pages 
  if (filterBy.pageIdx !== undefined) {
    const startIdx = filterBy.pageIdx * PAGE_SIZE
    toysToReturn = toysToReturn.slice(startIdx, startIdx + PAGE_SIZE)
  }

  return Promise.resolve(toysToReturn)
}

function getById(toyId) {
  const toy = toys.find((toy) => toy._id === toyId)
  if (!toy) return Promise.reject("Toy not found")
  toy.msgs = ["Nice!", "Great toy!", "My kid loved it!"] // דוגמא להוספת msgs
  return Promise.resolve(toy)
}

function remove(toyId) {
  const idx = toys.findIndex((toy) => toy._id === toyId)
  if (idx === -1) return Promise.reject("No such toy")
  toys.splice(idx, 1)
  return _saveToysToFile()
}

function save(toy) {
  if (toy._id) {
    const idx = toys.findIndex((curr) => curr._id === toy._id)
    toys[idx] = { ...toys[idx], ...toy }
  } else {
    toy._id = utilService.makeId()
    toy.createdAt = Date.now()
    toys.push(toy)
  }
  return _saveToysToFile().then(() => toy)
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
