/*
 *
 ############################################
 * Index of apps
 ############################################
 *
 */

/*
 * Initialize Express and others network module
 */
const config = require('./repos/config/config')
const expFormData = require('express-form-data')
const express = require('express')
const app = express()
const expFormDataOptions = {
    uploadDir: __dirname + '/dump',
    maxFilesSize: 5000,
    autoClean: true
}

/**
 * Initialize cors
 * This must be the first of middleware, use before inspect request
 */
const cors = require('cors')
app.options('*', cors())

const whitelist = config.whitelist

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


const starter = require('./repos/starter/index')

app.use(starter)


/**
 * server listen
 */
const port = process.env.PORT || config.default_port
app.listen(port, () => {
    console.log('API listening on port ' + port)
})