import { useEffect, useState } from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('')
  const [newDescription,setNewDescription] = useState('')
  const [completedTodos, setCompletedTodos] = useState([])


  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    }

    let updateTodoArr = [...allTodos]
    updateTodoArr.push(newTodoItem)
    setTodos(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
  }

  const handleDeleteTodo = (index)=>{
    let reduceTodo = [...allTodos]
    reduceTodo.splice(index)


    localStorage.setItem('todolist', JSON.stringify(reduceTodo))

    setTodos(reduceTodo)
  }

  const handleComplete = (index)=>{
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() +1
    let yyyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedOn = dd + '-' + mm + '-' + yyyy + "at" + h + ':' + m + ':' + s

    let filteredItem ={
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(allTodos))

  }

  const handleDeleteCompletedTodo = (index) =>{
    let reduceTodo = [...completedTodos]
    reduceTodo.splice(index)

    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo))
    setCompletedTodos(reduceTodo)
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedcompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))

    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedcompletedTodos){
      setCompletedTodos(savedcompletedTodos)
    }
  },[])

  return (
    <div className='App'>
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
          <div className='todo-input'>
            <div className='todo-input-item'>
              <label>Title</label>
              <input type='text' value={newTitle}  onChange={(e)=>setNewTitle(e.target.value)} placeholder='whats the task title'/>
            </div>
            <div className='todo-input-item'>
              <label>Description</label>
              <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder='whats the task description'/>
            </div>
            <div className='todo-input-item'>
              <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
            </div>
          </div>
          <div className='btn-area'>
            <button className={`isCompleteScreen ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
            <button className={`isCompleteScreen ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
          </div>
          <div className='todo-list'>
            {isCompleteScreen === false && allTodos.map((item,index)=>{
              return(
                <div className='todo-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete className='Icon' onClick={()=>handleDeleteTodo(index)} title='Delete' />
                    <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='complete' />
                  </div>
                </div>
              )
            })}
          </div>
          <div className='todo-list'>
            {isCompleteScreen === true && completedTodos.map((item,index)=>{
              return(
                <div className='todo-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p><small>Completed on:{item.completedOn}</small></p>
                  </div>
                  <div>
                    <AiOutlineDelete className='Icon' onClick={()=> handleDeleteCompletedTodo(index)} title='Delete' />
    
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    </div>
  );
}

export default App;
