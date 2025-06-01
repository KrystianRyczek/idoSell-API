const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const schedule = require('node-schedule')
const ordersRouter = require('./routes/api/orders')
const newUsersRouter = require('./routes/api/newUsers')
const usersRouter = require('./routes/api/users')
const JWTStrategy = require('./config/jwt')
const authMiddleware = require('./middlewares/jwt')
const date = require('./controllers/date/date')
const { format, addDays } = require('date-fns');
const {fetchApiOrders} =require("./externalApi/api")

require('dotenv').config()

const {PAST_DAYS:pastDays}=process.env

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.json())
app.use(cors())
app.use(logger(formatsLogger))

JWTStrategy()
app.use('/api', newUsersRouter)
app.use('/api', authMiddleware, usersRouter)
app.use('/api/orders', authMiddleware ,ordersRouter)


let lastUpdate

const readingUpdateDate = async () => {
  lastUpdate = await date.get()
}

const OrdersDbInit = async ()=>{
  const now = new Date()
  const curentDate = format(now, 'yyyy-MM-dd HH:mm:ss');
  const pastDate = format(addDays(now, -pastDays), 'yyyy-MM-dd HH:mm:ss');
  console.log("DB orders is init")
  console.log("start date:", pastDate, "| end date:", curentDate);
  await fetchApiOrders(pastDate, curentDate, true)
}

(async ()=>{
  await readingUpdateDate()
  !lastUpdate ? OrdersDbInit()
                          : console.log("Last DB update: ", lastUpdate.date,"\nDaily DB update is scheduled at 01:00:00 AM " )
  })()


const dataBaseUpdate = async ()=>{
  await readingUpdateDate()
  const now = new Date()
  const curentDate = format(now, 'yyyy-MM-dd HH:mm:ss');
  console.log("DB orders is updating!")
  console.log("start date:", lastUpdate.date, "| end date:", curentDate);
  await fetchApiOrders(lastUpdate.date, curentDate)
  }
  
schedule.scheduleJob('0 0 1 * * *', function(){

  dataBaseUpdate()

});

// setInterval(async ()=>{
//   console.log("run")
//   fetchApiOrders('2025-01-30 12:08:42', '2025-05-31 13:04:00')
// }, 20000)


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
