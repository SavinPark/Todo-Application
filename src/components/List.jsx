import React from 'react';

function List({todos}) {

  const todoList = todos.map(todo => <li>{todo}</li>);
  
  return(
    <ul>
      {todoList}
    </ul>
  );
}

export default List;