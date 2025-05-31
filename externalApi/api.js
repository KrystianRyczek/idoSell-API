const axios = require('axios')
const { fetchAddOrder, fetchOrderByID } =require("../controllers/orders/ordersService")
const date = require('../controllers/date/date')
require('dotenv').config()
const {API_KEY:apiKey}=process.env


const addNeworder = async (newOrder)=>{
  try{
    const order = await fetchOrderByID({orderID: newOrder.orderID})
    if(order){
    throw new Error(`orderID ${newOrder.orderID} already exists`)
    }
    try{
    console.log("order added to DB")
    await fetchAddOrder(newOrder)
    }
    catch(error){
    console.log(error)
    }
    }catch(error){
    error.name = "conflictID"
    console.log(error.name," : ", error.message)
    }  
}
 


const fetchApiOrders =  async  (startDate, endDate, initDB=false) => {

  const url='https://zooart6.yourtechnicaldomain.com/api/admin/v5/orders/orders/search'

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-API-KEY': apiKey
  }

  const options = {
    params: {
      ordersRange: {
        ordersDateRange: {
          ordersDateType: 'add',
          ordersDateBegin: startDate,
          ordersDateEnd: endDate
        }
      },
      resultsPage: 0
    }
  };
     
  const dbUpdate = (response)=>{
    response.data.Results.forEach(element => {
      let products =[]
      element.orderDetails.productsResults.forEach(item => {
          products=[...products,{"productID":item.productId,
                           "quantity":item.productQuantity,
          }]
      });
      const newOrder = {
          orderID: element.orderId,
          products,
          orderWorth: element.orderDetails.payments.orderCurrency.orderProductsCost,
      }
      addNeworder(newOrder) 
    });
  }

  axios.post(url,
    options,
    {
        headers: headers
    })
    .then(response => {
      if(response.status===200){
        dbUpdate(response)
        if(response.data.resultsNumberPage>1){
          for (let pangeNo = 1; pangeNo < response.data.resultsNumberPage; pangeNo++) {            const options = {
              params: {
                ordersRange: {
                  ordersDateRange: {
                    ordersDateType: 'add',
                    ordersDateBegin: startDate,
                    ordersDateEnd: endDate
                  }
                },
                resultsPage: pangeNo
              }
            };
            axios.post(url,
              options,
              {
                  headers: headers
              })
              .then(response => {
                dbUpdate(response)
              })
          }
        } 
      }     
    })
    .then(response=>{
      if(initDB===true){date.create(endDate)}
      else{
        date.update(startDate, endDate)
      }
    })
    .catch(error => {
      console.error('Error:', error);
    }
  );
}
  
  module.exports = { fetchApiOrders };
  

