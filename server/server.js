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
// --------  GET 조회 -------- 
// 모든 Todos 조회
app.get('/todos', async (req, res) => {
  let response = await Todo.findAll();
  res.send(response);
});
// 특정 Todos 조회
app.get('/todos/:dailyKey', async (req, res) => {
  const { dailyKey } =  req.params;
  let response = await Todo.findAll({ where: { date : dailyKey } });
  // console.log(dailyKey); // 디버깅
  // console.log(response); // 디버깅
  res.send(response);
});

// -------- POST 등록 -------- 
// [참고] https://fe-flower.tistory.com/32
// 새로운 Todo 추가
app.post('/add/todo', async (req, res) => {
  // const { dailyKey } =  req.params;
  // console.log('-----------------------',req.body, '-----------------------'); // 디버깅
  const newTodo = req.body;
  await Todo.create({
    todoCode: newTodo.todoCode,
    date: newTodo.date, // req.body.date
    title: newTodo.title,
    contents: newTodo.contents,
    done: newTodo.done, // "0" , req.body.done
    edit: newTodo.edit, // "0" , req.body.edit
    delete : newTodo.delete // "0" , req.body.delete
  })
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
});

// ------ PUT 수정 -------- 
// todo의 제목 & 내용 업데이트
app.put('/update/todo/:todoCode', async (req, res) => {
  const { todoCode } =  req.params;
  const newInfo = req.body;
  // console.log('----------------------------------------------'); // 디버깅
  // console.log(todoCode, newInfo);
  const result = await Todo.update(newInfo, { where: { todoCode } });
  if (result[0]) {
    // 배열의 첫 번째 요소가 0이 아닐 경우
    res.send({ message: `${result[0]} row(s) affected` });
  } else {
    // 배열의 첫 번째 요소가 0일 경우
    res.status(404).send({ message : 'There is no such Todo with the todoCode!' });
  }
});

// todo의 done(완료/미완료)상태 업데이트
app.put('/update/todo/done/:todoCode', async (req, res) => {
  const { todoCode } =  req.params;
  const newInfo = req.body;
  console.log('----------------------------------------------'); // 디버깅
  console.log(todoCode, newInfo);
  const result = await Todo.update(newInfo, { where: { todoCode } });
  if (result[0]) {
    // 배열의 첫 번째 요소가 0이 아닐 경우
    res.send({ message: `${result[0]} row(s) affected` });
  } else {
    // 배열의 첫 번째 요소가 0일 경우
    res.status(404).send({ message : 'There is no such Todo with the todoCode!' });
  }
});

// -------- DELETE 삭제 -------- 
// app.delete('/delete/todo/:todoCode', async (req, res) => {
app.delete('/delete/todo/:todoCode', async (req, res) => {
  const {todoCode } =  req.params;
  // console.log(todoCode); // 디버깅
  // console.log('----------------------------------------------'); // 디버깅
  const deletedCount = await Todo.destroy({ where: { todoCode }});

  if(deletedCount) {
    // 삭제될 row가 있을 경우
    res.send({ message: `${deletedCount} row(s) deleted` });
  } else {
    // 삭제될 row가 없을 경우
    res.status(404).send({ message : 'There is no member with the id!' });
  }
});



// LISTEN
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});