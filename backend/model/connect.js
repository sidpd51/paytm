const { MONGODB_URL } = require('../config/serverConfig')

module.exports = {
    connectDb(){
        mongoose.connect(MONGODB_URL)
        console.log('db connected')
    }
}