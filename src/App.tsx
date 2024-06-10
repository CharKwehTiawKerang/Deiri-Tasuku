import { useState } from 'react'
import uuid from 'react-uuid';

import './App.scss'

import DeleteIcon from '@mui/icons-material/Delete';

type Todo = {
  id: string;
  task: string;
  isCompleted: boolean;
}

function App() {
  const [list, setList] = useState<Todo[]>([])
  const [task, setTask] = useState<string>('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(task.trim().length === 0) {
      alert("Task cannot be empty!");
      return;
    }

    const todo: Todo = {
      id: uuid(),
      task: task,
      isCompleted: false,
    }

    setList([todo, ...list])
    setTask('');
    // console.log(todo.id)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  }

  const handleChecked = (todo: Todo) => {
    const index = list.indexOf(todo);
    todo.isCompleted = !todo.isCompleted;
    list.splice(index, 1, todo);
    setList([...list]);
  }

  const handleDelete = (id: string) => {
    const index = list.findIndex((todo) => todo.id === id);
    list.splice(index, 1);
    setList([...list]);
  }

  return (
    <>
      <div className="main">
        <h2>Deiri Tasuku</h2>

        <div className="form">
          <form action="" onSubmit={handleSubmit}>
            <label>Your Task:</label>
            <input type="text" placeholder='Go to work...' value={task} onChange={handleInput} />
            <button>Submit</button>
          </form>
        </div>

        <div className="list-task">
          <ul>
            {list.map((obj) => (
              <li key={obj.id}>
                <span>
                  <input 
                    type="checkbox" 
                    checked={obj.isCompleted}
                    onChange={() => handleChecked(obj)}
                  />
                  <span>{obj.task}</span>
                </span>
                <span>
                  <DeleteIcon onClick={() => handleDelete(obj.id)} className='icon'/>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  )
}

export default App
