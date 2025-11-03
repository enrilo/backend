const mongoose = require('mongoose');
const config = require('../config/backend-config/dev');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoDb.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Stop the app if DB connection fails
    }
};

module.exports = {
    mongoose,
    connectDB
};
