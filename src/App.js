import React, { useEffect, useState } from 'react';
import './App.css';

// custom Hook
import useFetch from './useFetch.js';

// components 
import List from './components/List.jsx';



// App Component
function App() {

  // ---- useState ---- //
  // 등록한 todo들을 담은 배열
  const [todos, setTodos] = useState(['Java 공부하기', 'React 공부하기', '운동하기']);
  // 새로운 todo
  const [newTodo, setNewTodo] = useState();
  
  const loading = useFetch(setTodos, 'http://localhost:4000/initialtodos');

  // changeInputData : newTodo에 input에 입력한 내용을 저장하는 함수
  const changeInputData = (e) => {
    setNewTodo(e.target.value);
  }
  // addTodo : 새로운 todo를 배열에 추가하는 함수
  const addTodo = (e) => {
    e.preventDefault(); // 기본값 form 전송방지
    setTodos([...todos, {'title': newTodo, 'todoCode': todos.length, 'contents': '', done: false, edit: false}]);
  }

  useEffect(() => {
    console.log("새로운 내용이 추가되었습니다.", todos);
  }, [todos]);


  return(
    <>
      <h1>Todo Application</h1>

      <form action="">
        <input type="text" name="" onChange={changeInputData}/>
        <button onClick={addTodo}>ADD</button>
      </form>

      <List todos={todos} loading={loading}/>
    </>
  );
}

export default App;
