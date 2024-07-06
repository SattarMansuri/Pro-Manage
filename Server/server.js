const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const auth = require('./routes/auth')
const task = require('./routes/task')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Db connected!");
}).catch((error) => {
  console.log( error);
})

app.use(express.json())
app.use(cors())

app.use('/api/auth', auth)
app.use('/api/task', task)

app.get('/', (req, res)=>{
  res.json({message: "This is running perfect"})
})



app.listen(process.env.PORT, (err)=>{
  if(err){
    console.log(err)
  }else{
    console.log('server is started')
  }
})