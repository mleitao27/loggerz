const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Request access
router.post('/token', async (req, res) => {
    if(!req?.body?.username) res.status(422).send('Missing username in request body')
    const expiresIn = process.env.JWT_EXPIRATION ?? 1800
    res.status(200).send({token: jwt.sign({username: req.body.username}, process.env.TOKEN_SECRET, { expiresIn })})
});

module.exports = router;