import { ChangeEvent, useState } from "react";
import SnackBar from "../../components/snackBar/SnackBar";
import {
  FaTrashCan,
  FaPlus,
  FaPenToSquare,
  FaCircleCheck,
  FaHourglassStart,
} from "react-icons/fa6";
import "./Add.css";
import { FaBackspace } from "react-icons/fa";
function Add() {
  const ERROR = "TextField is required or let validate your modifications"; 
  const [todo, setTodo] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [listTodo, setListTodo] = useState<string[]>([]);
  const [listTasksInProgress, setListTaskInProgress] = useState<string[]>([]);
  const [listFinishedTask, setListFinishedTask] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [idTask, setIdTask] = useState<number>();
  const [isError, setIsError] =  useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
    setIsError(false);
  };

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(value) ;
    setIsError(false);
  };

  const handleAdd = () => {
    if (!edit) {
      if (editTask) {
        if(task.trim() !== ""){
          let list = listTasksInProgress;
          list[idTask!] = task.trim();
          setListTaskInProgress(list);
          setTask("");
          setEditTask(false);
          setIdTask(-1);
        } else {
          setIsError(true);
        }    
      }  else {
        
        if (todo.trim() !== "") {
          setListTodo([...listTodo, todo.trim()]);
          setTodo("");
          
        } else {
          setIsError(true);
        }
      }
    } else {
      
      if(todo){
        let list = listTodo;
        list[id!] = todo;
        setListTodo(list);
        setTodo("");
        setEdit(false);
        setId(-1);
      } else {
        setIsError(true);
      }
    }
  };

  const handleDo = (index: number) => {
    if(!edit){
      setListTaskInProgress([...listTasksInProgress, listTodo[index]]);
    let list = listTodo.filter((item) => item !== listTodo[index]);
    setListTodo(list);
    } else {
       setIsError(true);
    }
    
  };

  const handleDelete = (index: number) => {
    let list = listTodo.filter((item) => item !== listTodo[index]);
    setListTodo(list);
  };

  const handleDeleteInProgressTask = (index: number) => {
    let list = listTasksInProgress.filter((item) => item !== listTasksInProgress[index]);
    setListTaskInProgress(list);
  };

  const handleDeleteFinishTask = (index: number) => {
    let list = listFinishedTask.filter(
      (item) => item !== listFinishedTask[index]
    );
    setListFinishedTask(list);
  };

  const handleDone = (index: number) => {
    if(!editTask){
      setListFinishedTask([...listFinishedTask, listTasksInProgress[index]]);
      handleDeleteInProgressTask(index);
    } else {
      console.log("Veillez valider votre modification");
    } 
  };

  const handleEdit = (index: number, value: string) => {
    setEdit(true);
    setId(index);
    setTodo(value);
  };

  const handleEditTaskInProgress = (index: number, value: string) => {
    setEditTask(true);
    setIdTask(index);
    setTask(value);
  };

  const handleBackToAdd = (index: number) => {
    if(!editTask){
      setListTodo([...listTodo, listTasksInProgress[index]]);
      handleDeleteInProgressTask(index);
    } else {
      console.log("Veillez valider votre modification");
    } 
  }

  const handleBackToInProgress = (index: number) =>{
    setListTaskInProgress([...listTasksInProgress, listFinishedTask[index]]);
    handleDeleteFinishTask(index);
  }

  const handleClose = ()=>{
    setIsError(false);
  }
  return (
    <>
      <div className="container">
        <h1>TO DO LIST</h1>
        {
          isError && <SnackBar title={ERROR} onClose={handleClose} />
        }
        <nav>
          <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="false"
            >
              Add Tasks
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              In Progress
            </button>
            <button
              className="nav-link"
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected="true"
            >
              Finished
            </button>
          </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade active show"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div className="panel">
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={todo}
                />
                <button className="btn btn-success " onClick={handleAdd}>
                  {edit ? <FaPenToSquare /> : <FaPlus />}
                </button>
              </div>
              <br />
              <div className={listTodo.length !== 0 ? "card" : ""}>
                {listTodo.map((item, index) => (
                  <div className="content" key={index}>
                    <div
                      className={
                        id != index
                          ? "form-control texte"
                          : "form-control texte edit"
                      }
                    >
                      {item}
                    </div>
                    <div className="button">
                      <button
                        className="btn btn-success"
                        onClick={() => handleDo(index)}
                      >
                        <FaHourglassStart />
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(index, item)}
                      >
                        <FaPenToSquare />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              {editTask ? (
                <div className="panel">
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChangeTask}
                    value={task}
                  />
                  <button className="btn btn-success " onClick={handleAdd}>
                    <FaPenToSquare />
                  </button>
                </div>
              ) : null}
              <br />
              <div className={listTasksInProgress.length !== 0 ? "card" : ""}>
                {listTasksInProgress.map((item, index) => (
                  <div className="content" key={index}>
                    <div
                      className={
                        idTask != index
                          ? "form-control texte"
                          : "form-control texte edit"
                      }
                    >
                      {item}
                    </div>
                    <div className="button">
                      <button
                        className="btn btn-success"
                        onClick={() => handleBackToAdd(index)}
                      >
                        <FaBackspace />
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditTaskInProgress(index, item)}
                      >
                        <FaPenToSquare />
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleDone(index)}
                      >
                        <FaCircleCheck />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteInProgressTask (index)}
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <div className={listFinishedTask.length !== 0 ? "card" : ""}>
                {listFinishedTask.map((item, index) => (
                  <div className="content" key={index}>
                    <div className="form-control texte">{item}</div>
                    <div className="button">
                    <button
                        className="btn btn-success"
                        onClick={() => handleBackToInProgress(index)}
                      >
                        <FaBackspace />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteFinishTask(index)}
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Add;
