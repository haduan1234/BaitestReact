import React, { useState } from "react"
import Button from '@mui/material/Button';

import DatePicker from "react-datepicker";

const TaskForm = (props) => {
  const { task, save, err, setErr } = props

  const [newTask, setNewTask] = useState(task)

  return (
    <>
      {
        !task.id &&
        <h4>New Task</h4>
      }
      <div >
        <input
          className='input'
          placeholder="Add new task..."
          value={newTask.title}
          onChange={e => setNewTask({
            ...newTask,
            title: e.target.value
          })}
          onClick={() => {
            if (err.length > 0) {
              setErr([
                ...err.filter((number) => {
                  return number !== 1;
                })
              ])
            }
          }}
        ></input>
        {!!err && err.map((e, index) =>
          <div key={index}>
            {e === 1 ?
              <div
                className="err" >
                Bạn cần nhập tiêu để nhiệm vụ
              </div>
              : <div></div>
            }
          </div>)}

      </div>
      <div className=" descrpition">
        <div className="title-conten">Description</div>
        <textarea
          className="descrpition-textarea"
          value={newTask.description}
          onChange={e => setNewTask({
            ...newTask,
            description: e.target.value
          })}
        />
      </div>
      <div className="date-piority">
        <div className="date">
          <div className="title-conten">
            Due Date
          </div>
          <DatePicker
            className="form-select"
            placeholder="Birth Day"
            dateFormat="dd/MM/yyyy "
            selected={newTask.date}
            onChange={(date) => setNewTask({
              ...newTask,
              date: date
            })
            }
          />
          {!!err && err.map((e, index) =>
            <div key={index}>
              {
                e === 2 ?
                  <div className="err">
                    Bạn cần chọn ngày lớn hơn ngày hôm nay .
                  </div>
                  :
                  <div></div>
              }
            </div>
          )}
        </div>
        <div className="piority">
          <div className="title-conten">
            Piority
          </div>
          <select
            className="form-select"
            aria-label="Default select example"
            value={newTask.piority}
            onChange={(e) => setNewTask({
              ...newTask,
              piority: e.target.value
            })}
          >
            <option defaultValue='Normal'>Normal</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          className="button-add"
          onClick={() => save(newTask)}
        >{!task.id ? "Add" : "Update"}</Button>
      </div>
    </>
  )
}

export default TaskForm