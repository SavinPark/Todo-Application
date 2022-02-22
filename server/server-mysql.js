// [ Node.js & MySQL Module ]

// EXPRESS
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); 

// MYSQL
var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',  // db 서버의 port (Node.js와 mysql서버가 동일한 컴퓨터에 있다면 localhost)
  user     : 'root',  // 사용자
  password : 'root',  // 비번
  database : 'TODOLIST'  // db name
});



// API
// ---- GET ----
// 모든 Todos 조회
app.get('/todos', (req, res) => {

  connection.connect(); // DB 접속 시작
  const response =  connection.query('SELECT * FROM todos', function (error, results, fields) {
    if(error) {
      console.log(error);
    } 
    console.log(results);
    
    console.log(results.data);
  });
  connection.end(); // DB 접속 중단

  res.send(response);
});

// 특정 todos조회
app.get('/todos/:dailyKey', (req, res) => {
  const { dailyKey } =  req.params;

  connection.connect(); // DB 접속 시작
  const response = connection.query(`SELECT * FROM todos WHERE date = ${dailyKey}`, function (error, results, fields) {
    if(error) {
      console.log(error);
    } 
    console.log(results);
  });
  connection.end(); // DB 접속 중단
  
  res.send(response);
  console.log(typeof(response))
});


// /// ---- PUT ---- 
// app.put();
// // ---- POST ---- 
// app.post();
// // ---- DELETE ---- 
// app.delete()


/// SQL TEST ------------------ //
// const dailyKey = 20220222;
// connection.connect(); // DB 접속 시작
// connection.query(`SELECT * FROM todos WHERE date = ${dailyKey}`, function (error, results, fields) {
//   if(error) {
//     console.log(error);
//   } 
//    console.log(results);
//   }
// );
// connection.end(); // DB 접속 중단


// LISTEN
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});