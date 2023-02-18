const mongoose =  require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDb',
    {
        useNewParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set('debug', true);

module.exports = connection;