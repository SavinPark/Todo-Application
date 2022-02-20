import React, { useEffect, useState } from 'react';
import './App.css';

// Custom Hook
import useFetch from './useFetch.js';

// Components 
import List from './components/List.jsx';
import Header from './components/Header.jsx';



// App Component
function App() {

  const [todos, setTodos] = useState([]);  // todos
  const [newTodo, setNewTodo] = useState();  // new todos
  
  const loading = useFetch(setTodos, 'http://localhost:4000/initialtodos');

  const changeInputData = (e) => { // changeInputData : newTodo에 input에 입력한 내용을 저장하는 함수
    setNewTodo(e.target.value);
  }
  
  const addTodo = (e) => { // addTodo : 새로운 todo를 배열에 추가하는 함수
    e.preventDefault(); // 기본값 form 전송방지
    setTodos([...todos, {'title': newTodo, 'todoCode': todos.length, 'contents': '', done: false, edit: false}]);
  }

  // changeTodoDone
  const changeTodoDone = (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.done === true) todo.done = false;
        else todo.done = true;
      }
      return todo;
    })
    setTodos(updateTodos);
  }

  useEffect(() => {
    console.log("새로운 내용이 추가되었습니다.", todos);
  }, [todos]);


  return(
    <>
      <h1>Todo Application</h1>

      <Header todos={todos} />

      <form action="">
        <input type="text" name="" onChange={changeInputData}/>
        <button onClick={addTodo}>ADD</button>
      </form>

      <List todos={todos} loading={loading} changeTodoDone={changeTodoDone} />
    </>
  );
}

export default App;
