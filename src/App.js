import './App.css';
import * as React from 'react';

import { v4 as uuidv4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";

import TaskForm from "./Components/taskForm"
import ToDoList from './Components/toDoList';
import RemoveAction from './Components/action'

import { setTaskLc, getTaskLc } from './services/localStorageService'

function App() {

  const [task, setTask] = React.useState({
    title: "",
    description: "",
    date: new Date(),
    piority: "Normal"
  })
  const [listTasks, setListTask] = React.useState([])
  const [err, setErr] = React.useState([])

  const [search, setSearch] = React.useState('')


  const save = (newTask) => {
    if (!!newTask) {
      if (!!newTask.title) {
        var today = new Date();
        var date = new Date(today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear());
        let mydata = new Date(newTask.date.toLocaleDateString(['ban', 'id']))
        const id = uuidv4()
        if (mydata < date) {
          setErr([
            ...err,
            2
          ])
        }
        else {
          setErr([
            ...err.filter((number) => {
              return number !== 2;
            })
          ])
          setListTask([
            ...listTasks,
            { ...newTask, id: id, toggle: false, check: false }
          ])
          let items = { ...newTask, id: id, toggle: false, check: false }
          setTaskLc(items)
        }
      } else {
        setErr([
          ...err,
          1
        ])
      }
    }
  }

  const updateTask = (newTask) => {
    var index = listTasks.findIndex((t) => t.id === newTask.id)
    if (index > -1) {
      setListTask([
        ...listTasks.slice(0, index),
        { ...newTask },
        ...listTasks.slice(index + 1)
      ])
    }
  }

  const onChnageCheckBox = (task) => {
    var index = listTasks.findIndex((t) => t.id === task.id)
    if (index > -1) {
      setListTask([
        ...listTasks.slice(0, index),
        { ...listTasks[index], check: !task.check },
        ...listTasks.slice(index + 1)
      ])
    }
  }

  const onChnageToggle = (task) => {
    var index = listTasks.findIndex((t) => t.id === task.id)
    if (index > -1) {
      setListTask([
        ...listTasks.slice(0, index),
        { ...listTasks[index], toggle: !task.toggle },
        ...listTasks.slice(index + 1)
      ])
    }
  }

  const removeTask = (task) => {
    var index = listTasks.findIndex((t) => t.id === task.id)
    if (index > -1) {
      setListTask([
        ...listTasks.slice(0, index),
        ...listTasks.slice(index + 1)
      ])
    }
  }

  const removeAction = () => {
    setListTask([
      ...listTasks.filter((number) => {
        return number.check === false;
      })
    ])
  }

  const onSearchEnter = (e) => {
    if (e.key === 'Enter') {
      let localStorage = getTaskLc()
      let newtaskList = localStorage.filter((task) => task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      setListTask([...newtaskList])
    }
}


  return (
    <div className='container'>

      <div className="add-tesk">
        <TaskForm task={task} setTask={setTask} save={save} err={err} setErr={setErr} />
      </div>

      <div className="container-toDoList">

        <h4>To Do List</h4>
        <div className="layout-listToDo">
          <div>
            <input
              className='input-listToDo'
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onSearchEnter}
            />
            <div>
              {
                listTasks.length > 0
                  ? listTasks.map((t, index) =>
                    <div key={t.id}>
                      <div>
                        <ToDoList
                          t={t}
                          removeTask={removeTask}
                          onChnageToggle={onChnageToggle}
                          onChnageCheckBox={onChnageCheckBox}
                        />

                      </div>
                      {
                        t.toggle ?
                          <div
                            className="list-task-todo">
                            <TaskForm task={t} save={updateTask} err={err} setErr={setErr} />
                          </div>
                          :
                          <div />
                      }
                    </div>
                  ) :
                  <div className="show-task" style={{ color: 'red' }}>No task . Please add a new task . </div>
              }
            </div>
            {
              listTasks && listTasks.filter((number) => {
                return number.check === true
              }).length > 0 ?
                <RemoveAction
                  removeAction={removeAction}
                />
                :
                <div />
            }


          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
