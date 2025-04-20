import axios from "axios"

const apiKey = 'YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP';

export const fetchOrderById =  async  (id) => {

        const url = `https://zooart6.yourtechnicaldomain.com/api/admin/v5/orders/orders?ordersIds=${id}`;
        
        axios.get(url, {
          headers: {
            'X-API-KEY': apiKey
          }
        })
        .then(response => {
            let products=[]
            response.data.Results[0].orderDetails.productsResults.forEach(element => {
                products=[...products,{"productID":element.productId,
                                 "Quantity":element.productQuantity,
                                 "productOrderPrice":element.productOrderPrice,
                }]
            });

            const orderSummary = {
                orderID: response.data.Results[0].orderId,
                products,
                orderWorth: response.data.Results[0].orderDetails.payments.orderCurrency.orderProductsCost,
            }
            console.log("orderSummary =", orderSummary)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });   
  }


  export const fetchOrders =  async  (startDate, endDate) => {
    const options = {
          params: {
            ordersRange: {
              ordersDateRange: {
                ordersDateType: 'add',
                ordersDateBegin: '2024-12-24 23:59:59',
                ordersDateEnd: '2025-01-01 23:59:59'
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
                'X-API-KEY': 'YXBwbGljYXRpb24xNjpYeHI1K0MrNVRaOXBaY2lEcnpiQzBETUZROUxrRzFFYXZuMkx2L0RHRXZRdXNkcmF5R0Y3ZnhDMW1nejlmVmZP'
              }
        })

        .then(response => {
            //console.log('Response:', response.data);
            response.data.Results.forEach(element => {
                let products =[]
                element.orderDetails.productsResults.forEach(item => {
                    products=[...products,{"productID":item.productId,
                                     "Quantity":item.productQuantity,
                                     "productOrderPrice":item.productOrderPrice,
              
                    }]
                });

                const orderSummary = {
                    orderID: element.orderId,
                    products,
                    orderWorth: element.orderDetails.payments.orderCurrency.orderProductsCost,
                }
                console.log("-----------------------------------------")
                console.log("orderSummary =", orderSummary)

            });
        })
        .catch(error => {console.error('Error:', error);
        });


  }
  
