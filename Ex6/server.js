const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {user, port} = require('./config');

const app = express();

mongoose.connect(`mongodb+srv://${user}@cluster0-ypedd.mongodb.net/test-proj?retryWrites=true`, {useNewUrlParser: true}, err => {
  if(err) console.log(err);
  console.log('connected to MongoDB');
});

app.use(morgan('combined'));
app.use(express.json());

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tel: Number,
});

const UserModel = mongoose.model('User', usersSchema, 'users');

app.get('/', (req, res) => {
  UserModel.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      console.log('docs', docs);
      res.json(docs);
    };
  });
});

app.get('/:id', (req, res) => {
  UserModel.findById(req.params.id, 'email password').exec((err, doc) => {
    res.json(doc);
  })
})

app.post('/', (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save((err, dog) => {
    if(err) console.log(err);
    console.log(dog);
  });

  // console.log(newUser);
  res.json(req.body);
})

app.listen(port, () => {
  console.log(`server started on ${port}`)
});