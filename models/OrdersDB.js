const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({

    orderID: {
        type: String,
        required: [true, 'Set order id'],
        unique: true,
      },
    orderWorth: {
        type: Number,
      },
    products: [{ productID: String, quantity: Number }]
},{
    versionKey: false,
    timestamps: true,
})




const Orders = mongoose.model('orders', ordersSchema, 'orders')

module.exports = Orders