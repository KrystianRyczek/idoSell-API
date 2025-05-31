const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema({

    date: {
        type: String,
        required: [true, 'Set date'],
        unique: true,
      },
},{
    versionKey: false,
    timestamps: true,
})




const Date = mongoose.model('date', dateSchema, 'date')

module.exports = Date