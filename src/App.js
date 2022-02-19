import React, { Component, useEffect, useState } from 'react';
import './App.css';

// components
import List from './components/List.jsx';

function App() {

  // ---- useState ---- //
  // 등록한 todo들을 담은 배열
  const [todos, setTodos] = useState(['Java 공부하기', 'React 공부하기', '운동하기']);
  // 새로운 todo
  const [newTodo, setNewTodo] = useState();


  // changeInputData : newTodo에 input에 입력한 내용을 저장하는 함수
  const changeInputData = (e) => {
    setNewTodo(e.target.value);
  }
  // addTodo
  const addTodo = (e) => {
    e.preventDefault(); // 기본값 form 전송방지
    setTodos([...todos, newTodo]);
  }

  // ---- useEffect ---- //
  useEffect(() => {
    console.log('새롭게 렌더링 되었습니다.');
  // });
  }, [todos]); // todos에 변경사항이 생기면 콜백함수 실행

  return(
    <>
      <h1>Todo Application</h1>

      <form action="">
        <input type="text" name="" onChange={changeInputData}/>
        <button onClick={addTodo}>ADD</button>
      </form>

      <List todos={todos} />
    </>
  );
}

export default App;
