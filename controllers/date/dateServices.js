const Date = require('../../models/DateDB')

const fetchDate = () => {
    return Date.find();
}
const fetchNewDate = (newDate) => {
    return Date.create(newDate);
}
const fetchUpdateDate = (filter, newDate) => {
    return Date.findOneAndUpdate(filter, newDate, { new: true })
}

module.exports = { fetchDate,
                   fetchNewDate,
                   fetchUpdateDate, 
                 };