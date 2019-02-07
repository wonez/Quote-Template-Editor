module.exports = () => {
    const mongoose = require('mongoose')
    
    mongoose.connect('mongodb://localhost:27017/qoute-template-editor',{
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
