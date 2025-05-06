import { ObjectId } from "mongodb"

import { dbService } from "../../services/db.service.js"
import { loggerService } from "../../services/logger.service.js"
import { utilService } from "../../services/util.service.js"

export const toyService = {
  remove,
  query,
  getById,
  add,
  update,
  addToyMsg,
  removeToyMsg,
}

async function query(filterBy = { txt: "" }) {
  try {
    const criteria = {
      toyName: { $regex: filterBy.txt, $options: "i" },
    }
    const collection = await dbService.getCollection("toy")
    var toys = await collection.find(criteria).toArray()
    return toys
  } catch (err) {
    loggerService.error("cannot find toys", err)
    throw err
  }
}

async function getById(ToyId) {
  try {
    const collection = await dbService.getCollection("toy")
    const toy = await collection.findOne({
      _id: ObjectId.createFromHexString(ToyId),
    })
    toy.createdAt = toy._id.getTimestamp()
    return toy
  } catch (err) {
    loggerService.error(`while finding toy ${ToyId}`, err)
    throw err
  }
}

async function remove(ToyId) {
  try {
    const collection = await dbService.getCollection("toy")
    const { deletedCount } = await collection.deleteOne({
      _id: ObjectId.createFromHexString(ToyId),
    })
    return deletedCount
  } catch (err) {
    loggerService.error(`cannot remove toy ${ToyId}`, err)
    throw err
  }
}

async function add(toy) {
  try {
    const collection = await dbService.getCollection("toy")
    await collection.insertOne(toy)
    return toy
  } catch (err) {
    loggerService.error("cannot insert toy", err)
    throw err
  }
}

async function update(toy) {
  try {
    const ToyToSave = {
      vendor: toy.vendor,
      price: toy.price,
    }
    const collection = await dbService.getCollection("toy")
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(toy._id) },
      { $set: ToyToSave }
    )
    return toy
  } catch (err) {
    loggerService.error(`cannot update toy ${toy._id}`, err)
    throw err
  }
}

async function addToyMsg(ToyId, msg) {
  try {
    msg.id = utilService.makeId()

    const collection = await dbService.getCollection("toy")
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(ToyId) },
      { $push: { msgs: msg } }
    )
    return msg
  } catch (err) {
    loggerService.error(`cannot add toy msg ${ToyId}`, err)
    throw err
  }
}

async function removeToyMsg(ToyId, msgId) {
  try {
    const collection = await dbService.getCollection("toy")
    await collection.updateOne(
      { _id: ObjectId.createFromHexString(ToyId) },
      { $pull: { msgs: { id: msgId } } }
    )
    return msgId
  } catch (err) {
    loggerService.error(`cannot add toy msg ${ToyId}`, err)
    throw err
  }
}
