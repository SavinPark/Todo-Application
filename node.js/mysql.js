// [ Node.js & MySQL Module ]

// mysql 모듈을 mysql이라는 변수로 사용하겠다. 
// mysql --> Error : ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
// var mysql = require('mysql');
// mysql2로 대체
var mysql = require('mysql2');

// mysql 안에 존재하는 객체의 createConnection 메소드 호출
// --> 메소드의 인자로 Object를 전달
// 
var connection = mysql.createConnection({
  host     : 'localhost',  // db 서버의 port (Node.js와 mysql서버가 동일한 컴퓨터에 있다면 localhost)
  user     : 'root',  // 사용자
  password : 'root',  // 비번
  database : 'TODOLIST'  // db name
});


// connect 메소드 : 접속 시작
connection.connect();
 
// query 메소드 
// - sql문 : sql문이 DB 서버에 전송되어 실행
// - callback 함수 : sql문 실행이 종료된 후 callback함수 실행
//   + error :
//   + results :
//   + fields :

connection.query('SELECT * FROM todos', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});
 
//  end 메소드 : 접속 종료
connection.end();