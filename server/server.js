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
    console.log('DB 연결 성공!');
  })
  .catch((error) => {
    console.log(error);
  })


// API
// ---- GET ---- 
// 모든 Todos 조회
app.get('/todos', async(req, res) => {
  let response = await Todo.findAll();
  // res.send(response);
  res.send(response.body);
});
// 특정 Todos 조회
app.get('/todos/:dailyKey', async(req, res) => {
  const { dailyKey } =  req.params;
  let response = await Todo.findAll({ where: { date : dailyKey } });
  res.send(response);
});

// ---- PUT ---- 
app.put('/todos/:dailyKey');
// ---- POST ---- 
app.post('/todos/:dailyKey');
// ---- DELETE ---- 
app.delete('/todos/:dailyKey');

// LISTEN
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});