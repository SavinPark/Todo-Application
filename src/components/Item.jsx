import React from 'react';
import './Item.css';
import Form from './Form';
// import EditForm from './EditForm';

function Item({todo, when,  changeTodoDone, changeTodoEdit, changeTodoDelete}) {

  // toggleDone : 할 일의 완료/미완료 상태를 표현하는 함수
  const toggleDone = (e) => {
    changeTodoDone(e.target.dataset.id);
  }
  // toggleEdit : edit 상태 표시
  const toggleEdit = (e) => {
    changeTodoEdit(e.target.dataset.id);
  }
  // toggleDelete : delete상태 표시
  const toggleDelete = (e) => {
    changeTodoDelete(e.target.dataset.id);
  }
  // todo의 done 속성값이 true(완료)이면 'done', false(미완료)이면 ''
  const ItemClassName = todo.done === true ? 'done' : '';

  return(
    <div className='item-container'>
      <input type="checkbox" data-id={todo.todoCode} onClick={toggleDone} />
      <li data-id={todo.todoCode} key={todo.todoCode} className={ItemClassName}>{todo.title}</li>
      {/* <li data-id={todo.todoCode} onClick={toggleDone} className={ItemClassName}>{todo.title}</li> */}
      <button data-id={todo.todoCode} className="btn--delete" onClick={toggleEdit}>EDIT</button>
      <button data-id={todo.todoCode} className="btn--delete" onClick={toggleDelete}>DELETE</button>

      {todo.edit && <Form id={todo.todoCode}/>}
    </div>
  );
}

export default Item;