const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const admin = require('./api/admin')
const main = require('./api/main')
const accounts = require('./api/accounts')


const port = process.env.PORT
const host = process.env.HOST
const db_uri = process.env.MONGODB_URI

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/main/', main)
app.use('/api/admin/', admin)
app.use('/api/accounts/', accounts)


try {
  mongoose.connect(db_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('db connected...')
    app.listen(port,()=>console.log(`server running at : ${host}:${port}`))
  })
} catch (err) {
  console.error(err)
  console.log('existing now...done.')
  process.exit(1)
}