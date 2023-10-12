const express = require('express');
var db = require('../modules/mongodb');
var mongodb = require('mongodb');

const router = express.Router();

// Get all logs
router.get('/', async (req, res) => {
    const collection = await db.loadCollection('logs');
    res.status(200).send(await collection.find({}).toArray());
});

// Get log by id
router.get('/:id', async (req, res) => {
    const log = await db.getDocument('logs', {_id: new mongodb.ObjectId(req.params.id)})
    if(log)
        res.status(200).send(log);
    else
        res.status(404).send();
});

// Get next log
router.get('/next/:id', async (req, res) => {
    const collection = await db.loadCollection('logs');
    const next = await collection.find({_id: {$gt:new mongodb.ObjectId(req.params.id)}}).limit(1).toArray()
    if(next.length)
        res.status(200).send(next[0]);
    else
        res.status(404).send();
});

// Get previous log
router.get('/previous/:id', async (req, res) => {
    const collection = await db.loadCollection('logs');
    const previous = await collection.find({_id: {$lt:new mongodb.ObjectId(req.params.id)}}).limit(1).toArray()
    if(previous.length)
        res.status(200).send(previous[0]);
    else
        res.status(404).send();
});

// Add new log
router.post('/', async (req, res) => {
    await db.insertDocument('logs', req.body)
    res.status(200).send(req.body);
});

// Update log
router.put('/:id', async (req, res) => {
    res.status(200).send('update');
});

// Delete log
router.delete('/:id', (req, res) => {
    res.status(200).send('destroy');
});

module.exports = router;