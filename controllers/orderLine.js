const express = require('express')
const api = express.Router()
const Model = require('../models/orderLine.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'orderLineItem'

api.get('/', (req, res) => {
	res.render('orderline/index.ejs');
})
api.get('/', (req, res) => {

	res.render('orderline/index.ejs',{
	  title: 'Index',
	  layout: 'layout.ejs'
	})
  })
api.get('/create', (req, res) => {

	res.render('orderline/create.ejs');
})

api.get('/delete/:id', (req, res) => {
	
	res.render('orderline/delete.ejs');
})

api.get('/edit/:id', (req, res) => {
	
	res.render('orderline/edit.ejs');
})

api.get('/details/:id', (req, res) => {
	
	res.render('orderline/details.ejs');
})


module.exports = api