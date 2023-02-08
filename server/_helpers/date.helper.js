const add = require('date-fns/add')

exports.addHours =  ( {dt = new Date(), hours = 0}) => {
    return add(dt, {hours} )
}

