import React, { useContext } from 'react';
import { TodoContext } from '../App.js';
import Item from './Item.jsx';

function List() {

  const {todos, when, loading, changeTodoDone, changeTodoEdit, changeTodoDelete} = useContext(TodoContext);

  /*
  - List.jsx는 전달 받은 loading의 값이 true이면 "Loading..."을 출력하고,
  - 전달 받은 loading의 값이 false이면 TodoList 항목을 브라우저에 렌더링하도록 한다.
  */
  let todoList = <div>Loading...</div>;
  // const todoList = todos.map(todo => <li key={todo.id}>{todo.title}</li>);
  // if(!loading) todoList = todos.map(todo => <li key={todo.todoCode}>{todo.title}</li>);
  if(!loading) todoList = todos.map(todo => 
    <Item key={todo.todoCode} todo={todo} changeTodoDone={changeTodoDone} changeTodoEdit={changeTodoEdit} changeTodoDelete={changeTodoDelete} when={when} />
  );

  
  return(
    <ul>
      {todoList}

      {/* ------------- 디버깅 ------------- */}
      {console.log('List Component', todos)}
    </ul>
  );
}

export default List;