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

  // Today
  const [when, setWhen] = useState(0);
  const now = new Date();
  const dailyKey = Number(new Date(now.setDate(now.getDate() + when)).toISOString().substring(0,10).replace(/-/g,''));
  
  const loading = useFetch(setTodos, `http://localhost:4000/todos/${dailyKey}`);
  
  const addTodo = (newTodoTitle, newTodoContents) => { // addTodo : 새로운 todo를 배열에 추가하는 함수
    setTodos([...todos, {todoCode: `${dailyKey}${todos.length + 1}`, date: dailyKey, title: newTodoTitle, contents: newTodoContents, done: false, edit: false, delete: false}]);
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
  // changeTodoEdit ---------------------------
  const changeTodoEdit = (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.edit === true) todo.edit = false;
        else todo.edit = true;
      }
      return todo;
    })
    setTodos(updateTodos);
  }
  // changeTodoDelete ---------------------------
  const changeTodoDelete = (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.delete === true) todo.delete = false;
        else todo.delete = true;
      }
      return todo;
    })
    console.log(updateTodos);
    setTodos(updateTodos);
  }

  useEffect(() => {
    console.log("새로운 내용이 추가되었습니다.", todos);
  }, [todos]);

  // Date Control Btns ----------------------
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(0);
  const [openFormPage, setOpenFormPage] = useState(false);
  const onPrev = () => {
    console.log('prev');
    setPrev(prev + 1);
    setWhen(when - 1);
    console.log(when);
  }
  const onNext = () => {
    console.log('next');
    setNext(next + 1);
    setWhen(when + 1);
    console.log(when);
  }
  const openForm = () => {
    setOpenFormPage(!openFormPage);
  }


  return(

    <TodoContext.Provider value={{todos, when, addTodo, loading, changeTodoDone, changeTodoEdit, changeTodoDelete}}>
      <Header />
      <List />
      <div className='btn-container'>
        <button className='btn btn--prev' onClick={onPrev}>PREV</button>
        <button className='btn btn--next' onClick={onNext}>NEXT</button>
        <button className='btn btn--create' onClick={openForm} >OPEN FORM</button>
      </div>
      {
        openFormPage && <Form />
      }
      {console.log(when)}
      {console.log(dailyKey)}
      {/* {
        // edit === true 이면 Form 컴포넌트 open
        todos.map(todo => todo.edit && <Form />) 
      } */}
    </TodoContext.Provider>
  );
}

export default App;
