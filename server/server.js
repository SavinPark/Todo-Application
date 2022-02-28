// [ Node.js & Sequelize ]

// EXPRESS
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); 


// SEQUELIZE
const db = require('../models/index.js');
const { Todo } = db;

Todo.sync({froce : false})
  .then(() => {
    console.log('Database Connected!');
  })
  .catch((error) => {
    console.log(error);
  })


// API
// --------  GET -------- 

// 모든 Todos 조회
app.get('/todos', async(req, res) => {
  let response = await Todo.findAll();
  res.send(response);
});
// 특정 Todos 조회
app.get('/todos/:dailyKey', async(req, res) => {
  const { dailyKey } =  req.params;
  let response = await Todo.findAll({ where: { date : dailyKey } });
  console.log(dailyKey); // 디버깅
  console.log(response); // 디버깅
  res.send(response);
});

/*
// -------- POST -------- 
// [참고] https://fe-flower.tistory.com/32
// 새로운 Todo 추가
app.post('/add/:dailyKey', (req, res) => {
  const { dailyKey } =  req.params;
  console.log(req.body);

  Todo.create({
    todoCode: req.body.todoCode,
    date: dailyKey, // req.body.date
    title: req.body.title,
    contents: req.body.contents,
    done: false, // "0" , req.body.done
    edit: false, // "0" , req.body.edit
    delete : false // "0" , req.body.delete
  })
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
});

// ------ PUT -------- 
app.post('/put/:dailyKey', (req, res) => {
  const { dailyKey } =  req.params;
  console.log(req.body);
});

// -------- DELETE -------- 
app.post('/delete/:dailyKey', (req, res) => {
  const { dailyKey } =  req.params;
  console.log(req.body);
});
*/


// LISTEN
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});