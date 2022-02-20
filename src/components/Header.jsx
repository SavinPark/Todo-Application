import React, { useContext } from 'react';
import './Header.css';
import { TodoContext } from '../App.js';

function Header() {

  // useContext를 통해 todos 정보 접근
  const {todos} = useContext(TodoContext);

  // 미완료 상태(done: false)인 todo들의 배열
  const undoneTasks = todos.filter(todo => todo.done === false);

  return(
    <>
      <h1>Todo Application</h1>
      <div className='countInfo'>{`남은 할 일 : ${undoneTasks.length}`}</div>
    </>    
  );
}

export default Header;