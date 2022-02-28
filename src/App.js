import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

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
  const [when, setWhen] = useState(0); // when
  // dailyKey
  const now = new Date();
  // let dailyKey = Number(new Date(now.setDate(now.getDate() + when)).toISOString().substring(0,10).replace(/-/g,''));
  const [dailyKey, setDaliyKey] = useState(Number(new Date(now.setDate(now.getDate())).toISOString().substring(0,10).replace(/-/g,'')));
  

  // Date Control Btns ----------------------
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(0);
  const [openFormPage, setOpenFormPage] = useState(false);
  // onPrev
  const onPrev = () => {
    console.log('prev');
    setPrev(prev + 1);
    setWhen(when - 1);
    setDaliyKey(Number(new Date(now.setDate(now.getDate() + when -1)).toISOString().substring(0,10).replace(/-/g,'')));
    console.log('when :',when, 'dailyKey', dailyKey);  // 디버깅
  }
  // onNext
  const onNext = () => {
    console.log('next');
    setNext(next + 1);
    setWhen(when + 1);
    setDaliyKey(Number(new Date(now.setDate(now.getDate() + when + 1)).toISOString().substring(0,10).replace(/-/g,'')));
    console.log('when :',when, 'dailyKey', dailyKey);  // 디버깅
  }
  const openForm = () => {
    setOpenFormPage(!openFormPage);
  }
  
  let loading = useFetch(when, setTodos, `http://localhost:4000/todos/${dailyKey}`);
  
  // addTodo
  const addTodo = async (newTodoTitle, newTodoContents) => { // addTodo : 새로운 todo를 배열에 추가하는 함수
    setTodos([...todos, {todoCode: `${dailyKey}${todos.length + 1}`, date: dailyKey, title: newTodoTitle, contents: newTodoContents, done: "0", edit: "0", delete: "0"}]);
    // 업데이트된 todo를 post로 server에 보냄
    const res = await axios(`http://localhost:4000/add/todo`, {
      method: 'POST',
      data : {
        'todoCode': `${dailyKey}${todos.length + 1}`,
        'date' : dailyKey,
        'title' : newTodoTitle,
        'contents' : newTodoContents,
        'done' : "0",
        'edit' : "0",
        'delete' : "0"
      },
      headers: new Headers()
    });
    alert('Todo 등록 완료');
    return window.location.reload();
  }

  // changeTodoDone
  const changeTodoDone = (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.done === "1") todo.done = "0";
        else todo.done = "1";
      }
      return todo;
    })
    setTodos(updateTodos);
  }

  // changeTodoEdit ---------------------------
  const changeTodoEdit = (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.edit === "0") todo.edit = "1";
        else todo.edit = "0";
      }
      return todo;
    })
    setTodos(updateTodos);
    /*
    // 업데이트된 todo를 post로 server에 보냄
    const res = await axios(`http://localhost:4000/add/todo`, {
      method: 'PUT',
      data : {
        'todoCode': todoCode,
        'date' : dailyKey,
        'title' : newTodoTitle,
        'contents' : newTodoContents,
        'done' : "0",
        'edit' : "0",
        'delete' : "0"
      },
      headers: new Headers()
    });

    if(res.data) {
      alert('Todo 수정 완료');
      return window.location.reload();
    }
    */
  }

  // changeTodoDelete ---------------------------
  const changeTodoDelete = async (todoCode) => {
    const updateTodos = todos.map(todo => {
      if(todo.todoCode === todoCode) {
        if(todo.delete === "1") todo.delete = "0";
        else todo.delete = "1";
      }
      return todo;
    })
    console.log(updateTodos); // 디버깅
    setTodos(updateTodos);
    // 업데이트된 todo를 delete로 server에 보냄
    const res = await axios(`http://localhost:4000/delete/todo/${todoCode}`, {
    // await axios(`http://localhost:4000/delete/todo/${todoCode}`, {
      method: 'DELETE',
      headers: new Headers()
    });
    alert('Todo 삭제 완료');
    return window.location.reload();
  }


  useEffect(() => {
    console.log("새로운 내용이 추가되었습니다.", when, todos);
  }, [todos, when]);


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

      {/* --------------------- 디버깅 ------------------------ */}
      {console.log(`http://localhost:4000/todos/${dailyKey}`, todos)}
    </TodoContext.Provider>
  );
}

export default App;

