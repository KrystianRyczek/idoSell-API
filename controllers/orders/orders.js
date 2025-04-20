const { fetchAddOrder,
        fetchOrders, 
        fetchOrderByID,
        fetchOrderByWorth
      } =require("./ordersService")
      

const getOrders = async (req, res, next) => {
  try{
    const ordersList = await fetchOrders()
    res.json(ordersList)
  }catch(error){
    next(error)
  }
}

const getOrderById = async (req, res, next)  => {
  try{
    const order = await fetchOrderByID({orderID: req.params.orderId})
    if(order){
      res.json(order)
    }else{
      next()
    }
  }catch(error){
    next(error)
  }
}

const addOrder = async (req, res, next) => {
  try{
    if (JSON.stringify(req.body) === '{}'){
      throw new Error('No body data!')
  }
  }catch(error){
    error.name = "BodyData"
    console.log(error.name)
      return next(error)
  }
  try{
    const order = await fetchOrderByID({orderID: req.body.orderID})
    if(order){
      throw new Error('id order conflict')
    }
  }catch(error){
    error.name = "conflictID"
      return next(error)
  }
  try{
    const order = await fetchAddOrder(req.body)
      res.status(201).json(order)
  }catch(error){
    next(error)
  }
}

const getOrderByWorth = async (req, res, next) => {
  try{
    const order = await fetchOrderByWorth(req.params)
      res.status(201).json(order)
  }catch(error){
    next(error)
  }
}

module.exports = {
  addOrder,
  getOrders,
  getOrderById,
  getOrderByWorth,
}
