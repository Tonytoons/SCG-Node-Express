/*
 *
 ############################################
 * Index of routers
 ############################################
 *
 */

const express = require('express')
const router = express.Router()

/*
 * Initialize user management presenter
 */
const StarterPresenter = require('./presenter/presenter')
const starterPreseneter = new StarterPresenter()

/*
 *
 ############################################
 * Endpoints initiative
 ############################################
 *
 */

 /**
 * example of get api
 */
router.get('/starter/api/get/:suffix', (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.get(req.params.suffix)
})

/**
 * example of post api
 */
router.post('/starter/api/post/:suffix', (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.post(req.body.message)
})

/**
 * example of put api
 */
router.put('/starter/api/put/:suffix', (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.put(req.body.message)
})

/**
 * example of delete api
 */
router.delete('/starter/api/delete/:suffix', (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.delete(req.params.id)
})

module.exports = router