import React, {  useContext } from 'react';
import { TodoContext } from '../App.js';
import './Item.css';
import Form from './Form';

// function Item({todo, when,  changeTodoDone, changeTodoEdit, changeTodoDelete}) { // ----------
function Item({todo}) {

  const {when,  changeTodoDone, changeTodoEdit, changeTodoDelete} = useContext(TodoContext);

  // toggleDone : 할 일의 완료/미완료 상태를 표현하는 함수
  const toggleDone = (e) => {
    changeTodoDone(e.target.dataset.id);
  }
  // toggleEdit : 할 일의 edit 상태를 표tl
  const toggleEdit = (e) => {
    changeTodoEdit(e.target.dataset.id);
  }
  // toggleDelete : delete상태 표시
  const toggleDelete = (e) => {
    changeTodoDelete(e.target.dataset.id);
  }
  // todo의 done 속성값이 true(완료)이면 'done', false(미완료)이면 ''
  const ItemClassName = todo.done === "1" ? 'done' : '';

  return(
    <div className='item-container'>
      <input type="checkbox" data-id={todo.todoCode} onClick={toggleDone} />
      <li data-id={todo.todoCode} key={todo.todoCode} className={ItemClassName} when={when}>{todo.title}</li>
      {/* <li data-id={todo.todoCode} onClick={toggleDone} className={ItemClassName}>{todo.title}</li> */}
      <button data-id={todo.todoCode} className="btn--delete" onClick={toggleEdit}>EDIT</button>
      <button data-id={todo.todoCode} className="btn--delete" onClick={toggleDelete}>DELETE</button>

      {/* {todo.edit === "1" && <Form id={todo.todoCode} todo={todo} />} */}
      {todo.edit === "1" && <Form todo={todo} />}
    </div>
  );
}

export default Item;