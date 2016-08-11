'use strict'
const express = require('express')
const throng = require('throng')
const mongoose = require('mongoose')
const uuid = require('uuid')
throng(function (id) {
  console.log(`Started worker ${id}`)
  mongoose.connect('mongodb://mongo:27017/test')
  let Cats = mongoose.model('Cats', mongoose.Schema({ name: String }))
  let app = express()
  app.get('/', (req, res) => {
    res.send('hello world')
  })
  app.get('/cats', (req, res) => {
    Cats.find({}, (e, r) => res.send(r))
  })
  app.get('/cats/p', (req, res) => {
    let cat = new Cats({name: uuid.v4()})
    cat.save((e, r) => res.send(r))
  })
  app.listen(3000,()=>console.log('listen'))
})
