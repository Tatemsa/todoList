import { ChangeEvent, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import "./Add.css";
function Add() {
  const [todo, setTodo] = useState<string>("");
  const [listTodo, setListTodo] = useState<string[]>([]);
  const [listTasksInProgress, setListTaskInProgress] = useState<string[]>([]); 
  const [listFinishedTask, setListFinishedTask] = useState<string[]>([]); 
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
  };

  const handleAdd = () => {
    if (!edit) {
      if (todo) {
        setListTodo([...listTodo, todo]);
        setTodo("");
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

  const handleDo = (index:number) => {
    setListTaskInProgress([...listTasksInProgress, listTodo[index]])
    console.table(listTodo);
  };

  const handleDelete = (id: number) => {
    let list = listTodo.filter((item) => item !== listTodo[id]);
    setListTodo(list);
  };

  const handleEdit = (index: number, value: string) => {
    setEdit(true);
    setId(index);
    setTodo(value);
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
                  {edit ? "Edit" : "Add"}
                </button>
              </div>
              <br />
              <div className={listTodo.length !== 0? "card":""}>
                {listTodo.map((item, index) => (
                  <div className="content" key={index}>
                    <div className={id!=index ? "form-control texte": "form-control texte edit"}>{item}</div>
                    <div className="button">
                      <button className="btn btn-success" onClick={()=>handleDo(index)}>
                        Do
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(index, item)}
                      >
                        Edit
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
              <div className={listTasksInProgress.length !== 0? "card":""}>
                {listTasksInProgress.map((item, index) => (
                  <div className="content" key={index}>
                    <div className={id!=index ? "form-control texte": "form-control texte edit"}>{item}</div>
                    <div className="button">
                      <button className="btn btn-success" onClick={()=>handleDo(index)}>
                        Do
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(index, item)}
                      >
                        Edit
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
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <div className={listFinishedTask.length !== 0? "card":""}>
                {listFinishedTask.map((item, index) => (
                  <div className="content" key={index}>
                    <div className={id!=index ? "form-control texte": "form-control texte edit"}>{item}</div>
                    <div className="button">
                      <button className="btn btn-success" onClick={()=>handleDo(index)}>
                        Do
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(index, item)}
                      >
                        Edit
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
          </div>
        </nav>
      </div>
    </>
  );
}

export default Add;
