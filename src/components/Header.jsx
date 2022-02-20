import React from 'react';
import './Header.css';

function Header({todos}) {

  // 미완료 상태(done: false)인 todo들의 배열
  const undoneTasks = todos.filter(todo => todo.done === false);

  return(
    <div className='countInfo'>{`남은 할 일 : ${undoneTasks.length}`}</div>
  );
}


export default Header;