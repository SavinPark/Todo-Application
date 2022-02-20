import React from 'react';
import './Item.css';

function Item({todo, changeTodoDone}) {

  // toggleDone : 할 일의 완료/미완료 상태를 표현하는 함수
  const toggleDone = (e) => {
    changeTodoDone(e.target.dataset.id);
  }

  // todo의 done 속성값이 true(완료)이면 'done', false(미완료)이면 ''
  const ItemClassName = todo.done === true ? 'done' : '';

  return(
    <li data-id={todo.todoCode} onClick={toggleDone} className={ItemClassName}>{todo.title}</li>
  );
}

export default Item;