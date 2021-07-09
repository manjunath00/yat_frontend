import { Input, Container, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import Router from "next/router";

import yatApi from "../pages/api/hello";

const Dashboard = (props) => {
  const { todos = [] } = props;
  const [tasks, setTasks] = useState(todos);
  const [allTasks, setAllTasks] = useState(todos);
  const [meta, setMeta] = useState({ completed: 0, pending: 0 });

  const getTasks = async () => {
    try {
      const response = await yatApi.get("/api/task");
      setTasks(response.data);
      setAllTasks(response.data);
      completedPending();
    } catch (error) {
      console.log("Error ", error.message);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      return getTasks();
    }, 500);
  }, []);

  const onStatusChange = (e, id) => {
    const isChecked = e.target.checked;

    const newTasks = tasks.filter((item) => item.id != id);

    const task = tasks.filter((item) => item.id === id)[0];

    task.completed = isChecked;

    newTasks.push(task);

    setTasks(newTasks);
  };

  const onToggleStatus = (status = true) => {
    const completedTasks = allTasks.filter((item) => item.completed === status);
    setTasks(completedTasks);
  };

  const onAll = () => setTasks(allTasks);

  const completedPending = () => {
    const completed =
      allTasks.filter((item) => item.completed === true).length || 0;

    const pending = allTasks.length - completed;
    setMeta({ completed, pending });
  };

  const onDeleteTask = async (id) => {
    const response = await yatApi.delete(`/api/task/${id}`);
    return getTasks();
  };

  const onToggleTask = async (id, completed) => {
    const response = await yatApi.patch(`/api/task/${id}`, {
      completed: !completed,
    });
    return getTasks();
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    Router.push("/login");
  };

  return (
    <Container>
      <div className="dashboard-header">
        <h3>Dashboard</h3>

        <div className="dashboard-right">
          <div>
            <Button
              color="primary"
              size="md"
              onClick={() => Router.push("/new")}
            >
              New Task
            </Button>
          </div>

          <div>
            <button onClick={() => onLogout()}>Logout</button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="col-3 sidebar">
          <div
            className="flex sidebar-item todo-active"
            onClick={() => onAll()}
          >
            <h6>All </h6>
            <span>{allTasks.length || 0}</span>
          </div>
          <div
            className="flex sidebar-item"
            onClick={() => onToggleStatus(true)}
          >
            <h6>Completed</h6>
            <span>{meta.completed}</span>
          </div>
          <div
            className="flex sidebar-item"
            onClick={() => onToggleStatus(false)}
          >
            <h6>Pending</h6>
            <span>{meta.pending}</span>
          </div>
        </div>
        <div className="col-9 main-bar">
          <h3>Todos</h3>
          <div>
            {tasks.map(({ _id, name, description, completed }) => (
              <div key={_id} className="todo flex-layout">
                <Input
                  type="checkbox"
                  checked={completed}
                  onChange={() => onToggleTask(_id, completed)}
                />
                <div className="flex">
                  <div className="todo-text">
                    <div className="todo-text-primary">{name}</div>
                    <div>{description}</div>
                  </div>

                  <div onClick={() => onDeleteTask(_id)}>Delete</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
