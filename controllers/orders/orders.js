const { fetchAddOrder,
        fetchOrders, 
        fetchOrderByID,
        fetchOrderByWorth
      } =require("./ordersService")

const ObjectsToCsv = require('objects-to-csv')     


const getOrders = async (req, res, next) => {
  try{
    const ordersList = await fetchOrders()
    if(ordersList){
      const arrayData = ordersList.flatMap((order)=>{
                        return  order.products.map((product)=>{
                                return {"orderID":order.orderID,  
                                  "orderWorth":order.orderWorth, 
                                  "productID":product.productID, 
                                  "quantity":product.quantity}
                              })
                        })
      const csv = new ObjectsToCsv(arrayData); 
      //await csv.toDisk('./ordersList.csv')                 
      res.status(200).json(await csv.toString())

    }else{
    next()
    }
  }catch(error){
    next(error)
  }
}


const getOrderById = async (req, res, next)  => {
  try{
    const order = await fetchOrderByID({orderID: req.params.orderId})
    if(order){
      console.log(order)
      const arrayData = order.products.map((product)=>{
        return {"orderID":order.orderID,  
                "orderWorth":order.orderWorth, 
                "productID":product.productID, 
                "quantity":product.quantity}
      })

      const csv = new ObjectsToCsv(arrayData);
      //await csv.toDisk('./order.csv')
      res.status(200).json(await csv.toString())
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
    const ordersList = await fetchOrderByWorth(req.params)
      if(ordersList){
        const arrayData = ordersList.flatMap((order)=>{
                          return  order.products.map((product)=>{
                                  return {"orderID":order.orderID,  
                                    "orderWorth":order.orderWorth, 
                                    "productID":product.productID, 
                                    "quantity":product.quantity}
                                })
                          })
        const csv = new ObjectsToCsv(arrayData); 
        //await csv.toDisk('./ordersListByWorth.csv')                 
        res.status(200).json(await csv.toString())
      }else{
      next()
      }
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
