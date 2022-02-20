import React, { useContext, useRef } from 'react';
import { TodoContext } from '../App.js';

function Form() {

  const inputRef = useRef(false);
  const {addTodo} = useContext(TodoContext);
  
  // addTodoData
  const addTodoData = (e) => {
    e.preventDefault(); 
    addTodo(inputRef.current.value);
  }

  return(
    <form action="">
      <input type="text" ref={inputRef}/>
      <button onClick={addTodoData}>ADD</button>
    </form>
  );
}

export default Form;