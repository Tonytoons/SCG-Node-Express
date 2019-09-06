/*
 *
 ############################################
 * Index of routers
 ############################################
 *
 */

/*
 * Initialize Express and others network module
 */
const expFormData = require("express-form-data")
const express = require('express')
const app = express()
const expFormDataOptions = {
    uploadDir: __dirname + "/dump",
    maxFilesSize: 5000,
    autoClean: true
}

/**
 * Initialize cors
 * This must be the first of middleware, use before inspect request
 */
const cors = require('cors')
app.options('*', cors())

const whitelist = ['http://localhost:8010', 'http://localhost:8020']

const corsOptionsDelegate = function (req, callback) {
    let corsOptions
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

/**
 * Encoded bodies
 */
app.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies
app.use(expFormData.parse(expFormDataOptions)) // parse data with connect-multiparty. 
app.use(expFormData.format()) // delete from the request all empty files (size == 0)
// app.use(expFormData.stream()) // change the file objects to fs.ReadStream 
// app.use(expFormData.union()) // union the body and the files
// app.use(inspectRequest) // use middleware to inspect request before reach the presenter function
app.use(cors(corsOptionsDelegate))

/*
 * Initialize user management presenter
 */
const StarterPresenter = require('./repos/starter/presenter/presenter.js')
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
app.get("/starter/api/get/:suffix", (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.get(req.params.id)
})

/**
 * example of post api
 */
app.post("/starter/api/post/:suffix", (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.post(req.body.message)
})

/**
 * example of put api
 */
app.put("/starter/api/put/:suffix", (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.put(req.body.message)
})

/**
 * example of delete api
 */
app.delete("/starter/api/delete/:suffix", (req, res) => {
    const callback = (result) => {
        res.json(result)
    }
    starterPreseneter.setCallback(callback)
    starterPreseneter.delete(req.params.id)
})

/**
 * server listen
 */
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("API listening on port " + port)
})