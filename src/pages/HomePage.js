import React, { useState } from "react";
import "./HomePage.css";
import { Button, Checkbox } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [selectTasks, setSelectTasks] = useState([]);

  const adicionarTarefa = () => {
    const task = {
      id: tasks.length + 1,
      title: novaTarefa(),
      descripition: novaDescricao(),
      done: false,
    };
    setTasks([...tasks, task]);
  };

  const novaTarefa = () => {
    const task = prompt("Digite o nome da tarefa");
    if (task === null || task === "") {
      return novaTarefa();
    }
    return task;
  };

  const novaDescricao = () => {
    const task = prompt("Digite a descrição da tarefa");
    if (task === null || task === "") {
      return novaDescricao();
    }
    return task;
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

  return (
    <div className="all">
      <h1 id="header">Lista de Tarefas</h1>
      <div className="App">
        <div className="boards">
          <div className="board">
            <div className="board-header">
              <h2>A fazer</h2>
              <div style={{ color: "white", fontSize: "20px", float: "right" }}>
                <Button onClick={adicionarTarefa}>
                  <PlusCircleOutlined />
                </Button>
                <Button onClick={moveTaksToCompleted}>
                  <RightOutlined />
                </Button>
                <Button onClick={editTask}>
                  <EditOutlined />
                </Button>
              </div>
            </div>

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
                  <Checkbox
                    onChange={(e) =>
                      handleSelectTask(task.id, e.target.checked)
                    }
                  >
                    <li
                      key={task.id}
                      style={{
                        textDecoration: task.done ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </li>
                  </Checkbox>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
