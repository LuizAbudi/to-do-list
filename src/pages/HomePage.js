import React, { useState } from "react";
import "./HomePage.css";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [selectTasks, setSelectTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [showDescriptionTaskId, setShowDescriptionTaskId] = useState(null);

  const adicionarTarefa = () => {
    const task = {
      id: tasks.length + 1,
      title: taskTitle,
      descripition: taskDescription,
      done: false,
    };
    setTasks([...tasks, task]);
    setIsModalOpen(false);
    setTaskTitle("");
    setTaskDescription("");
  };

  const moveTaksToCompleted = () => {
    const newTasks = tasks.map((task) => {
      if (selectTasks.includes(task.id)) {
        return { ...task, done: true };
      }
      return task;
    });
    setTasks(newTasks);
    setSelectTasks([]); // Limpar a seleção após mover
  };

  const deleteTask = () => {
    const newTasks = tasks.filter((task) => !selectTasks.includes(task.id));
    setTasks(newTasks);
    setSelectTasks([]); // Limpar a seleção após deletar
  };

  const handleSelectTask = (id, checked) => {
    if (checked) {
      setSelectTasks((prev) => [...prev, id]);
    } else {
      setSelectTasks((prev) => prev.filter((taskId) => taskId !== id));
    }
  };

  const editTask = () => {
    const newTasks = tasks.map((task) => {
      if (selectTasks.includes(task.id)) {
        return { ...task, title: editTarefa(task.title) };
      }
      return task;
    });
    setTasks(newTasks);
    setSelectTasks([]);
  };

  const editTarefa = (taskTitle) => {
    const task = prompt(`Digite o novo nome da tarefa ${taskTitle}`);
    if (task === null || task === "") {
      return editTarefa();
    }
    return task;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showTaskDescription = () => {
    if (selectTasks.length === 1) {
      // Verifica se apenas uma tarefa está selecionada
      setShowDescriptionTaskId(selectTasks[0]);
    } else {
      alert("Por favor, selecione apenas uma tarefa para ver a descrição.");
    }
  };

  return (
    <div className="all">
      <h1 id="header">Lista de Tarefas</h1>
      <div className="App">
        <div className="boards">
          <div className="board">
            <div className="board-header">
              <h2>A fazer</h2>
              <div style={{ color: "white", fontSize: "20px", float: "right" }}>
                <Button onClick={moveTaksToCompleted}>
                  <RightOutlined />
                </Button>
                <Button onClick={editTask}>
                  <EditOutlined />
                </Button>
                <Button onClick={showModal}>
                  <PlusCircleOutlined />
                </Button>
              </div>
            </div>
            <Modal
              title="Adicione uma nova tarefa"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Form.Item>
                  <label
                    style={{ justifyContent: "flex-start", display: "flex" }}
                  >
                    Título:
                  </label>
                  <Input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <label
                    style={{ justifyContent: "flex-start", display: "flex" }}
                  >
                    Descrição:
                  </label>
                  <Input.TextArea
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={adicionarTarefa}
                >
                  Adicionar
                </Button>
              </Form>
            </Modal>
            <ul>
              {tasks
                .filter((task) => !task.done)
                .map((task) => (
                  <div>
                    <Checkbox
                      onChange={(e) =>
                        handleSelectTask(task.id, e.target.checked)
                      }
                      key={task.id}
                    >
                      <li
                        key={task.id}
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                      >
                        {task.title}-{task.id}
                      </li>
                    </Checkbox>
                    <ul>
                      <li>{`Descrição: ${task.descripition}`}</li>
                    </ul>
                  </div>
                ))}
            </ul>
          </div>
          <div className="board">
            <div className="board-header">
              <h2>Concluídas</h2>
              <div
                style={{
                  color: "white",
                  fontSize: "20px",
                  float: "right",
                  display: "flex",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                  onClick={showTaskDescription}
                >
                  Show descripition
                </Button>
                <Button
                  onClick={deleteTask}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    float: "right",
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </div>

            <ul>
              {tasks
                .filter((task) => task.done)
                .map((task) => (
                  <div key={task.id}>
                    <Checkbox
                      onChange={(e) =>
                        handleSelectTask(task.id, e.target.checked)
                      }
                    >
                      <li
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                        }}
                      >
                        {task.title}
                      </li>
                    </Checkbox>
                    {showDescriptionTaskId === task.id && (
                      <p>Descrição: {task.descripition}</p>
                    )}
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
