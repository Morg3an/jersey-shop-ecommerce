const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('DB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;