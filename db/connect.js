const mongoose = require('mongoose')

/**
 *
 * @param url
 * @returns {Promise<void>}
 */
const connectToDB = (url) => {
  return  mongoose.connect(url).then(()=>console.log('Database Connected!!'))
}

module.exports = connectToDB

