const express = require('express')
const http = require('http')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const session = require('express-session')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const logFile = '/access.log'
const mongoose = require('mongoose')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const LOG = require('./utils/logger.js')

// create express app ..................................

const app = express()
const fs = require("fs")

// Load environment variables from .env file, where API keys and passwords are configured.
// dotenv.load({ path: '.env.example' })
dotenv.load({ path: '.env' })
LOG.info('Environment variables loaded.')

// app variables
const port = 8081 || process.env.PORT

// configure app.settings.............................
app.set('port', process.env.PORT || port)

// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// specify desired view engine
app.set('view engine', 'ejs')
//....app.engine('ejs', engines.ejs)

// configure middleware.....................................................
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(expressStatusMonitor())

// log calls
app.use((req, res, next) => {
  LOG.debug('%s %s', req.method, req.url)
  next()
})

// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(express.static('public'))
//app.use(expressLayouts)
app.use(errorHandler()) // load error handler

const routes = require('./routes/index.js')
app.use('/', routes)  // load routing
LOG.info('Loaded routing.')
app.get("/", function(req, res){
  res.render("index.ejs")
})

app.use((req, res) => { res.status(404).render('404.ejs') }) // handle page not found errors

// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data

// start Express app
app.listen(port, function() {
  console.log('App is running at http://localhost:' + port)
  console.log('\n Logs will be sent to this terminal and ' + logFile )
})

module.exports = app
