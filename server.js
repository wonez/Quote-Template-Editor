const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000;

require('./db')();

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/api', require('./routes.js'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  })
}

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})