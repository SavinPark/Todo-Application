import React, { useContext, useRef } from 'react';
import { TodoContext } from '../App.js';
import './Form.css';

function Form({todo}) {  // $$$$ 
// function Form() {
  const titleRef = useRef(false);
  const contentsRef = useRef(false);
  const {addTodo, editTodo} = useContext(TodoContext);
  
  // addTodoData
  const saveTodoData = (e) => {
    e.preventDefault(); 
    // addTodo(titleRef.current.value, contentsRef.current.value);  // EDIT 기능 추가 전

    // EDIT 기능 추가 후
    if (todo) { // edit 기능
      editTodo(todo.todoCode, titleRef.current.value, contentsRef.current.value);
    } else {
      addTodo(titleRef.current.value, contentsRef.current.value); // add 기능
    }
  }

  return(
    <form action="" className='todoForm'>
      { 
        todo ? 
        // EDIT 기능
        <>
          <input placeholder={todo.title} type="text" className="title" ref={titleRef}/> 
          <textarea placeholder={todo.contents} className="contents" ref={contentsRef}/>
        </>
        :
        // ADD 기능
        <>
          <input placeholder="Title" type="text" className="title" ref={titleRef}/> 
          <textarea placeholder="Contents" className="contents" ref={contentsRef}/>
        </>
      }
    <button onClick={saveTodoData} className="addBtn">SAVE</button>
    </form>
  );
}

export default Form;