
import { useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import './App.css'

function App() {

  const [isCompleteScreen, setCompleteScreen] = useState(false)
  const [allTodos, setTodos] = useState([])
  const [titlevalue, settitlevalue] = useState('')
  const [descriptionvalue, setdescriptionvalue] = useState('')
  const [completedTodos, setcompletedTodos] = useState([])

  const addHandler = () => {
    if (titlevalue.trim() === "" || descriptionvalue.trim() === "") {
      alert("Title and description are required. Please add something.");
      return;
    }
    let newdata = {
      title: titlevalue,
      description: descriptionvalue
    }
    let updateddata = [...allTodos]
    updateddata.push(newdata)
    setTodos(updateddata)
    localStorage.setItem('todolist', JSON.stringify(updateddata))
    settitlevalue('')
    setdescriptionvalue('')
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let completedTodo = JSON.parse(localStorage.getItem('completedTodos'))
    if (savedTodo) {
      setTodos(savedTodo)
    }
    if (completedTodo) {
      setcompletedTodos(completedTodo)
    }
  }, [])

  const DeleteHandler = (index) => {
    let reduceTodo = [...allTodos]
    reduceTodo.splice(index, 1)
    localStorage.setItem('todolist', JSON.stringify(reduceTodo))
    setTodos(reduceTodo)
  }

  const handlecomplete = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let completedOn = date + '-' + month + '-' + year + ' at ' + hour + ':' + minutes + ':' + seconds;


    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompleted = [...completedTodos]
    updatedCompleted.push(filteredItem)
    setcompletedTodos(updatedCompleted)
    DeleteHandler(index)
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted))
  }

  let CompleteDeleteHandler = (index) => {
    let reduceTodo = [...completedTodos]
    reduceTodo.splice(index, 1)
    localStorage.setItem('completedTodos', JSON.stringify(reduceTodo))
    setcompletedTodos(reduceTodo)
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="What's your task title..." value={titlevalue} onChange={(e) => { settitlevalue(e.target.value) }} onKeyDown={(e) => {
              if (e.key === 'Enter') { addHandler() }
            }} />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="What's the task about..." value={descriptionvalue} onChange={(e) => { setdescriptionvalue(e.target.value) }} onKeyDown={(e) => {
              if (e.key === 'Enter') { addHandler() }
            }} />
          </div>
          <div className="todo-input-item">
            <button type='button' className='primaryBtn' onClick={addHandler}>Add</button>
          </div>

        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen == false && 'active'}`} onClick={() => setCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen == true && 'active'}`} onClick={() => setCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          {isCompleteScreen == false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiFillDelete className='delete-icon' onClick={() => DeleteHandler(index)} />
                  <BsCheckLg className='check-icon' onClick={() => handlecomplete(index)} />
                </div>
              </div>
            )
          })}
          {isCompleteScreen == true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>Completed On :{item.completedOn}</p>
                </div>
                <div>
                  <AiFillDelete className='delete-icon' onClick={() => CompleteDeleteHandler(index)} />

                </div>
              </div>
            )
          })}
        </div>

      </div>

    </div>
  )
}

export default App
