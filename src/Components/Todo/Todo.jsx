import { useState } from "react"

const Todo = () => {

    const [task, setTask] = useState({ name: "Read a book", complete: false });
    const [tasks, setTasks] = useState([]);

    function taskHandle(event) {
        setTask(...task, name = event.target.value, complete = false);
    }

    function Add() {
        setTasks([...tasks, task]);
        console.log(task);
        console.log(tasks);
    }

    function deleteTask(index) {
        setTasks(tasks.filter((element, i) => i != index));
    }

    return <>
        <div className="container-fluid text-white bg-primary d-flex flex-column justify-content-center" style={{ height: 250 }}>
            <h1>TODO APP !</h1>
            <label htmlFor="taskInput" className="form-label fw-bold h4">Add new To-Do</label>
            <input type="text" className="col-9 form-control" onChange={(event) => { taskHandle(event); }}
                placeholder="Enter new task" id="taskInput" />
            <button type="button" class="btn btn-primary col-1 border m-3" onClick={() => { Add(); }}>Add</button>
        </div>
        <ul className="bg-primary ">
            {tasks.map((task, index) => (
                <div className="row">
                    <li key={index} className="bg-secondary col-3 border text-white text-decoration-line-through row justify-content-evenly align-items-center" >{index + 1} - {task.name}
                    </li>
                    <button type="button" className="btn btn-danger col-2 border m-3" onClick={() => deleteTask(index)}>Delete</button>
                    <button type="button" className="btn btn-success col-2 border m-3 text-white" onClick={() => { task.complete = true }}>Complete</button>
                </div>
            ))}
        </ul>
    </>;
}

export default Todo;