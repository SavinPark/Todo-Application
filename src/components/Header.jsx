import React, { useContext } from 'react';
import './Header.css';
import { TodoContext } from '../App.js';

function Header() {

  // useContext를 통해 todos 정보 접근
  const {todos} = useContext(TodoContext);

  // 미완료 상태(done: false)인 todo들의 배열
  const undoneTasks = todos.filter(todo => todo.done === false);

  // 날짜, 요일
  const now = new Date();
  // const today = new Date(now.setDate(now.getDate() + when));
  const today = new Date(now.setDate(now.getDate()));
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  return(
    <>
      <h1 className='date'>{dateString}</h1>
      <div className='dayname'>{dayName}</div>
      <div className='countInfo'>{`남은 할 일 : ${undoneTasks.length}`}</div>
    </>    
  );
}

export default Header;