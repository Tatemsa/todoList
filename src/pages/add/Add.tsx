import { ChangeEvent, useState } from "react";
import {
  FaTrashCan,
  FaPlus,
  FaPenToSquare,
  FaCircleCheck,
  FaHourglassStart,
} from "react-icons/fa6";
import "./Add.css";
function Add() {
  const [todo, setTodo] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [listTodo, setListTodo] = useState<string[]>([]);
  const [listTasksInProgress, setListTaskInProgress] = useState<string[]>([]);
  const [listFinishedTask, setListFinishedTask] = useState<string[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [idTask, setIdTask] = useState<number>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTask(value) 
  };

  const handleAdd = () => {
    if (!edit) {
      if (editTask && task) {
          let list = listTasksInProgress;
          list[idTask!] = task;
          setListTaskInProgress(list);
          setTask("");
          setEditTask(false);
          setIdTask(-1);
      } else {
        if (todo) {
          setListTodo([...listTodo, todo]);
          setTodo("");
        }
      }
    } else {
      let list = listTodo;
      list[id!] = todo;
      setListTodo(list);
      setTodo("");
      setEdit(false);
      setId(-1);
    }
  };

  const handleDo = (index: number) => {
    setListTaskInProgress([...listTasksInProgress, listTodo[index]]);
    let list = listTodo.filter((item) => item !== listTodo[index]);
    setListTodo(list);
  };

  const handleDelete = (index: number) => {
    let list = listTodo.filter((item) => item !== listTodo[index]);
    setListTodo(list);
  };

  const handleDeleteFinishTask = (index: number) => {
    let list = listFinishedTask.filter(
      (item) => item !== listFinishedTask[index]
    );
    setListFinishedTask(list);
  };

  const handleDone = (id: number) => {
    setListFinishedTask([...listFinishedTask, listTasksInProgress[id]]);
    let list = listTasksInProgress.filter(
      (item) => item !== listTasksInProgress[id]
    );
    setListTaskInProgress(list);
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

  return (
    <>
      <div className="container">
        <h1>TO DO LIST</h1>
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
                        onClick={() => handleDone(index)}
                      >
                        <FaCircleCheck />
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditTaskInProgress(index, item)}
                      >
                        Edit
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
