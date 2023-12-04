var db = require('../services/mongodbService')
var mongodb = require('mongodb')

const getLogs = async (req, res) => {
    const page = parseInt(req.query.page ?? 1)
    const logsPerPage = parseInt(req.query.logsPerPage ?? process.env.DEFAULT_LOGS_PER_PAGE)

    const collection = await db.loadCollection('logs')
    const collectionSize = await collection.count()
    
    res.set('Has-Next-Page', collectionSize > page * logsPerPage + logsPerPage ? 1 : 0)
    res.set('Total-Log-Count', collectionSize)
    const logs = await collection.find({}).skip(page * logsPerPage).limit(logsPerPage).toArray()

    return logs
}

const getLog = async (req, res) => {
    const log = await db.getDocument('logs', {_id: new mongodb.ObjectId(req.params.id)})

    return log
}

const getNextLog = async (req, res) => {
    const collection = await db.loadCollection('logs')
    const next = await collection.findOne({_id: {$gt:new mongodb.ObjectId(req.params.id)}})

    return next
}

const getPreviousLog = async (req, res) => {
    const collection = await db.loadCollection('logs')
    const previous = await collection.findOne({_id: {$lt:new mongodb.ObjectId(req.params.id)}}, {sort: {_id: -1}})

    return previous
}

const addLog = async (req, res) => {
    const log = await db.insertDocument('logs', req.body)

    return log
}

const getOptions = async (req, res) => {
    const collection = await db.loadCollection('logs')
    const options = await collection.distinct(req.body.type)

    return options
}

const updateLog = async (req, res) => {
    return 0
}

const deleteLog = async (req, res) => {
    return 0
}

exports.getLogs = getLogs;
exports.getLog = getLog;
exports.getNextLog = getNextLog;
exports.getPreviousLog = getPreviousLog;
exports.addLog = addLog;
exports.getOptions = getOptions;
exports.updateLog = updateLog;
exports.deleteLog = deleteLog;