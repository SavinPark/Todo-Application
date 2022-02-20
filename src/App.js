import React, { useEffect, useState } from 'react';
import './App.css';

// Custom Hook
import useFetch from './useFetch.js';

// Components 
import Header from './components/Header.jsx';
import Form from './components/Form.jsx';
import List from './components/List.jsx';

// Context API
export const TodoContext = React.createContext();

// App Component
function App() {

  const [todos, setTodos] = useState([]);  // todos
  
  const loading = useFetch(setTodos, 'http://localhost:4000/initialtodos');
  
  const addTodo = (newTodo) => { // addTodo : 새로운 todo를 배열에 추가하는 함수
    setTodos([...todos, {'title': newTodo, 'todoCode': todos.length + 1, 'contents': '', done: false, edit: false}]);
  }

  // changeTodoDone
  const changeTodoDone = (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.done === true) todo.done = false;
        else todo.done = true;
      }
      return todo;
    })
    setTodos(updateTodos);
  }

  useEffect(() => {
    console.log("새로운 내용이 추가되었습니다.", todos);
  }, [todos]);


  return(

    <TodoContext.Provider value={{todos, addTodo, loading, changeTodoDone}}>
      <Header />
      <Form />
      <List />
    </TodoContext.Provider>

  );
}

export default App;
