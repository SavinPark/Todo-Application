// [ DB 연결 X ]

// Express | port | cors & body-parser --------------------------------- //
const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
const bodyParser = require('body-parser');

// InitialTodoData ------------------------------------------------------ //
const initialTodoData = require('../src/InitialTodoData.js');
// const { Todo } = require('../models/index.js');  // DB


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json()); 

// API ------------------------------------------------------------------ //
// GET 
/// 모든 Todos 조회
app.get('/initialtodos', (req, res) => {
  res.send(initialTodoData);
  // res.send(Todo.findAll());
});

/// 특정 날짜에 해당하는 Todos 조회
app.get('/initialtodos/:dailyKey', (req, res) => {
  const { dailyKey } =  req.params;
  res.send(initialTodoData.filter(todo => todo.date === Number(dailyKey)));
  // const todayTodos = Todo.findAll({ where: { date: Number(dailyKey) } });  // DB
  // if(todayTodos) {
  //   res.send(todayTodos);  // DB
  // } else {
  //   res.status(404).send({ message : 'There is no such todos!' });
  // }
});


// listen() ------------------------------------------------------------- //
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});