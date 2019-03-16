module.exports = () => {
    const mongoose = require('mongoose')
    
    mongoose.connect('mongodb://admin:admin123@ds131765.mlab.com:31765/quote-template-editor',{
        useNewUrlParser: true, 
        useCreateIndex: true,
        useFindAndModify: false 
    }).then(res => {
        console.log('DB connected successfully');
    }).catch(err => {
        console.log(err.message, '\nDB not connected')
    });

    return mongoose.connection;
}
