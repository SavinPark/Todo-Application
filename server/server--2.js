// DB 연결 TEST
// [참고] https://velog.io/@limsw/NodeJS-Mysql-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0
/*
const mysql = require("mysql");
const express = require("express");
const app = express();


const conn = {
    host: 'localhost',
    port: '4000',
    user: 'root',
    password: 'root',
    database: 'TODOLIST'
}

app.get('/todos', (req, res) => {

    // create DB connection
    let connection = mysql.createConnection(conn);
    connection.connect(); // connect database

    const testQuery = "SELECT * FROM TODOS";

    connection.query(testQuery, (error, result, field) => {
        if (error) {
            console.log("Error Execution :", error);
        }
        res.send(result);
    });
    connection.end(); // de-connect database


})

app.listen(4000, () => {
    console.log("Running Mysql Example..");
})
*/

// ---------------------------------------------------------------
// [참고] https://lgphone.tistory.com/86 
// DB 연결
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { Todo } = require('../models/index.js'); // db.sequelize

const app = express();
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true
});
Todo.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결됨.');
    }).catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// GET
// 모든 Todos 조회
app.get('/initialtodos', async (req, res) => {
  const allTodos = await Todo.findAll();
  res.render('sequelize', {allTodos});
});
  
// 특정 날짜에 해당하는 Todos 조회
// app.get('/initialtodos/:dailyKey', async (req, res) => {
app.get('/initialtodos/20', async (req, res) => {
//   const { dailyKey } =  req.params;
  const todayTodos = await Todo.findAll({
    where: { date: 20220220 }
  });  //
  res.render('sequelize', {todayTodos});  //
//   res.send(todayTodos);  //
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

// ---------------------------------------------------------------
// [참고] https://soohyun6879.tistory.com/165