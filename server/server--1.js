// [ NOTE ]

// Express / port / cors & body-parser --------------------------------- //
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

// InitialTodoData ------------------------------------------------------ //
const initialTodoData = require('../src/InitialTodoData.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// API ------------------------------------------------------------------ //
// GET 
app.get('/initialtodos', (req, res) => {
  // Request
  // const todoCode = req.body.name;
  // Response
  console.log(req.body);
  res.send(initialTodoData);
})
/*
// ==================== O =================== //
/// 모든 Todos 조회
app.get('/initialtodos', (req, res) => {
  res.send(initialTodoData);
});

/// 특정 날짜에 해당하는 Todos 조회
app.get('/initialtodos/:dailyKey', (req, res) => {
  const {dailyKey} =  req.params;
  res.send(initialTodoData.filter(todo => todo.date === Number(dailyKey)));
});
// ========================================= //
*/

// listen() ------------------------------------------------------------- //
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});