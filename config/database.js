const mongoose = require('mongoose')

module.exports.connect =async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}