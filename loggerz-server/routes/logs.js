const express = require('express')
var db = require('../modules/' + process.env.DB_MODULE)
var auth = require('../middleware/authenticate')

const router = express.Router()

// Get all logs
router.get('/', auth.authenticateToken, async (req, res) => {
    const logs = await db.getLogs(req, res)
    res.status(200).send(logs)
});

// Get log by id
router.get('/:id', auth.authenticateToken, async (req, res) => {
    const log = await db.getLog(req, res)
    if(log)
        res.status(200).send(log)
    else
        res.status(404).send()
});

// Get next log
router.get('/next/:id', auth.authenticateToken, async (req, res) => {
    const next = await db.getNextLog(req, res)
    if(next)
        res.status(200).send(next)
    else
        res.status(404).send()
});

// Get previous log
router.get('/previous/:id', auth.authenticateToken, async (req, res) => {
    const previous = await db.getPreviousLog(req, res)
    if(previous)
        res.status(200).send(previous)
    else
        res.status(404).send()
});

// Add new log
router.post('/', auth.authenticateToken, async (req, res) => {
    const log = await db.addLog(req, res)
    res.status(200).send(log)
});

// Get field options
router.post('/options', auth.authenticateToken, async (req, res) => {
    const options = await db.getOptions(req, res)
    if(options && options.length)
        res.status(200).send(options)
    else
        res.status(404).send()
});

// Update log
router.put('/:id', auth.authenticateToken, async (req, res) => {
    const log = await db.updateLog(req, res)

    res.status(200).send('update')
});

// Delete log
router.delete('/:id', auth.authenticateToken, async (req, res) => {
    const log = await db.deleteLog(req, res)

    res.status(200).send('destroy')
});

module.exports = router;