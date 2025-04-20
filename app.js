const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const schedule = require('node-schedule')
const ordersRouter = require('./routes/api/orders')
const newUsersRouter = require('./routes/api/newUsers')
const usersRouter = require('./routes/api/users')
const JWTStrategy = require('./config/jwt')
const authMiddleware = require('./middlewares/jwt')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const {fetchApiOrders} =require("./externalApi/api")

app.use(express.json())
app.use(cors())
app.use(logger(formatsLogger))

JWTStrategy()
app.use('/api', newUsersRouter)
app.use('/api', authMiddleware, usersRouter)
app.use('/api/orders', authMiddleware ,ordersRouter)


const dataBaseUpdate = async ()=>{
    const date = Date()
    const newDate = new Date(date)
    const year = newDate.getFullYear().toString()
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2)
    const prevDay = ("0" + (newDate.getDay() -1)).slice(-2)
    const today = ("0" + newDate.getDay() ).slice(-2)
    const startDate = `${year}-${month}-${prevDay} 23:59:00`
    const endDate = `${year}-${month}-${today} 23:59:00`
    await fetchApiOrders(startDate, endDate)
  }


schedule.scheduleJob('01 59 23 * * *', function(){
  dataBaseUpdate()
});


// setInterval(async ()=>{
//   const date = Date()
//   const newDate = new Date(date)
//   const year = newDate.getFullYear().toString()
//   const month = ("0" + (newDate.getMonth() + 1)).slice(-2)
//   const prevDay = ("0" + (newDate.getDay() -1)).slice(-2)
//   const day = ("0" + newDate.getDay() ).slice(-2)
//   const startDate = `2023-${month}-${prevDay} 23:59:59`
//   const endDate = `${year}-${month}-${day} 23:59:59`
//   await fetchApiOrders(startDate, endDate)
// }, 1000)

 




app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` })
})
app.use((err, req, res, next) => {
  console.log(err.name)
  if(err.name === 'ValidationError'){
    return res.status(400).json({ message: err.message })
  }
  if(err.name === 'BodyData'){
    return res.status(400).json({ message: err.message })
  }
  if(err.name === 'IncorrectCredentials'){
    return res.status(401).json({ message: err.message })
  }
  if(err.name === 'OcupatedEmail'){
    return res.status(409).json({ message: err.message })
  }
  res.status(500).json({ message: err.message })
})

module.exports = app
