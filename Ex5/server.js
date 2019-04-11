const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb+srv://jackil182:105237naNa@cluster0-ypedd.mongodb.net/test?retryWrites=true';

const client = new MongoClient(url, { useNewUrlParser: true });
client.connect(err => {
  if (err) console.log(err);
  console.log('connected to db')

  const collection = client.db('test-proj').collection('users');
  
  // perform actions on the collection object
  // insertDocuments(collection, () => {
  //   client.close();
  // });
  // findDocuments(collection, () => {
  //   client.close();
  // });
  // updateDocuments(collection, () => {
  //   client.close();
  // })
  removeDocuments(collection, () => {
    client.close();
  })
  
});

const insertDocuments = (collection, cb) => {
  const document = {d:1, e:2, f:3};
  collection.insertMany([document], (err, res) => {
    // console.log(res);
    assert.equal(err, null);
    cb(res);
  });
  console.log('inserted to collection');
};

const findDocuments = (collection, cb) => {
  collection.find({f:3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('found following records');
    console.log(docs);
    cb(docs);
  });
};

const updateDocuments = (collection, cb) => {
  collection.update({f:3}, { $set: {f:33}}, (err, docs) => {
    assert.equal(err, null);
    console.log('updated doc');
    console.log(docs);
    cb();
  });
};

const removeDocuments = (collection, cb) => {
  collection.remove({d:1}, (err, docs) => {
    assert.equal(err, null);
    console.log('removed document');
    console.log(docs);
    cb();
  });
}