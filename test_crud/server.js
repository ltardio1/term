console.log('server works!')

const {MongoClient} = require('mongodb')

const express = require('express');
// const MongoClient = require('mongodb').mongoClient es6 below
const bodyParser = require('body-parser')
MongoClient.connect('mongodb://localhost:27017/crudtest', (err, crudtest) => {
  if (err) return console.log(err)
  db = crudtest
  console.log('listening mongo')
})
const app = express();

app.listen(3000, function () {
  console.log('listening on 3000')
})
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req,res)=> {
  res.sendFile(__dirname + "/index.html")
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req,res)=>{
  var cursor = db.collection('quotes').find().toArray(function(err,results){
    console.log(results)
  })


})




// MongoClient.connect('mongodb://localhost:27017', (err, crudtest)=>{
//   if (err) throw error;
//   db = crudtest
// app.listen(3000, () => {
//     console.log('listening on 3000')
//   })
// })
