import React, { useContext, useRef } from 'react';
import { TodoContext } from '../App.js';
import './Form.css';

function Form({id}) {

  const titleRef = useRef(false);
  const contentsRef = useRef(false);
  const {addTodo} = useContext(TodoContext);
  
  // addTodoData
  const addTodoData = (e) => {
    e.preventDefault(); 
    addTodo(titleRef.current.value, contentsRef.current.value);
  }

  return(
    <form action="" className='todoForm'>
      <input placeholder="Title" type="text" className="title" ref={titleRef}/>
      <textarea placeholder="Contents" className="contents" ref={contentsRef}/>
      <button onClick={addTodoData} className="addBtn">SAVE</button>
    </form>
  );
}

export default Form;