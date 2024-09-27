import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseLogout } from "../../Services/Auth";
import { db } from "../../Services/FirebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

const Todo = () => {
    const [task, setTask] = useState({ name: "", complete: false, delete: false });
    const [tasks, setTasks] = useState([]);
    const navTo = useNavigate();
    const userId = localStorage.getItem("Uid");

    useEffect(() => {
        if (!userId) {
            alert("You must login first");
            navTo("/Login");
        } else {
            fetchTasks();
        }
    }, []);

    const fetchTasks = async () => {
        const todoCollection = collection(db, "user", userId, "todo");
        const todoSnapshot = await getDocs(todoCollection);
        const todoList = todoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(todoList);
    };

    const taskHandle = (event) => {
        setTask({ ...task, name: event.target.value });
    };

    const addTask = async () => {
        if (task.name.trim()) {
            const todoCollection = collection(db, "user", userId, "todo");
            await addDoc(todoCollection, task);
            fetchTasks();
            setTask({ name: "", complete: false, delete: false });
        }
    };

    const deleteTask = async (taskId) => {
        const taskDoc = doc(db, "user", userId, "todo", taskId);
        await updateDoc(taskDoc, { delete: true });
        fetchTasks();
    };

    const completeFunc = async (taskId, currentStatus) => {
        const taskDoc = doc(db, "user", userId, "todo", taskId);
        await updateDoc(taskDoc, { complete: !currentStatus });
        fetchTasks();
    };

    const onLogOut = () => {
        try {
            firebaseLogout();
            localStorage.removeItem("Uid");
            alert("Log Out is done");
            navTo("/Login");
        } catch (e) {
            alert("Error in logout");
            console.log(e);
        }
    };

    return (
        <>
            <div className="container-fluid text-white bg-primary d-flex flex-column justify-content-center" style={{ height: 250 }}>
                <h1 className="d-flex justify-content-between">TODO APP! <button type="button" className="btn btn-danger fw-bold" onClick={onLogOut}>Log Out</button></h1>
                <label htmlFor="taskInput" className="form-label fw-bold h4">Add new To-Do</label>
                <input type="text" className="col-9 form-control" onChange={taskHandle} placeholder="Enter new task" id="taskInput" value={task.name} />
                <button type="button" className="btn btn-primary col-sm-2 col-xs-4 border m-3" onClick={addTask}>Add</button>
            </div>
            <ul className="bg-primary">
                {tasks.map((task, index) => (
                    !task.delete ? (
                        <div key={task.id} className="row">
                            <li className={`${task.complete ? 'text-decoration-line-through' : ''} my-2 bg-secondary col-3 border text-white fw-bold row justify-content-evenly align-items-center`}>
                                {index + 1} - {task.name}
                            </li>
                            <button type="button" className="btn btn-danger col-sm-2 col-3 p-10 border m-3" onClick={() => deleteTask(task.id)}>Delete</button>
                            <button type="button" className="btn btn-success col-sm-2 col-4 p-10 border m-3 text-white" onClick={() => completeFunc(task.id, task.complete)}>Complete</button>
                        </div>
                    ) : ""
                ))}
            </ul>
        </>
    );
}

export default Todo;

