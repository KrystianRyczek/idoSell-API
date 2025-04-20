const Orders = require('../../models/OrdersDB')


const fetchAddOrder = (bodyData) => {
    return Orders.create({ ...bodyData });
}
const fetchOrders = () => {
    return Orders.find();
}
const fetchOrderByID = (filter) => {
    return Orders.findOne(filter)
}

const fetchOrderByWorth = (filter) => {
    return Orders.find({$and:[{orderWorth:{$gt:filter.min}},{orderWorth:{$lt:filter.max}}]})
}

module.exports = { fetchAddOrder,
                   fetchOrders, 
                   fetchOrderByID,
                   fetchOrderByWorth
                 };