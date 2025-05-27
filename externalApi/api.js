const axios = require('axios')
const { fetchAddOrder, fetchOrderByID } =require("../controllers/orders/ordersService")

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



const fetchApiOrders =  async  (startDate, endDate) => {
    const options = {
          params: {
            ordersRange: {
              ordersDateRange: {
                ordersDateType: 'add',
                ordersDateBegin: startDate,
                ordersDateEnd: endDate
              }
            },
          }
      };
     
      axios.post('https://zooart6.yourtechnicaldomain.com/api/admin/v5/orders/orders/search',
        options,
        {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': apiKey
              }
        })

        .then(response => {
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
        })
        .catch(error => {console.error('Error:', error);
        }
      );
  }
  
  module.exports = { fetchApiOrders };
  

