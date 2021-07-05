import { Input, Container } from "reactstrap";
import React, { useState, useEffect } from "react";

import yatApi from "../pages/api/hello";
import Router from "next/router";

const Dashboard = (props) => {
  const { todos = [] } = props;
  const [tasks, setTasks] = useState(todos);
  const [allTasks, setAllTasks] = useState(todos);

  const getTasks = async () => {
    try {
      const response = await yatApi.get("/api/task");
      console.log("Not Executed");
      setTasks(response.data);
      setAllTasks(response.data);
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
      <div className="flex">
        <h3>Dashboard</h3>
        <div>
          <button onClick={() => onLogout()}>Logout</button>
        </div>
      </div>
      <div className="flex">
        <div className="col-3 sidebar">
          <div
            className="flex sidebar-item"
            onClick={() => onToggleStatus(true)}
          >
            <h6>Completed</h6>
            <span>50</span>
          </div>
          <div className="flex sidebar-item todo-active">
            <h6>Favourites </h6>
            <span>50</span>
          </div>
          <div
            className="flex sidebar-item"
            onClick={() => onToggleStatus(false)}
          >
            <h6>Todo</h6>
            <span>50</span>
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

Dashboard.defaultProps = {
  todos: [
    {
      id: 1,
      title: "Hello",
      description: "Hello 1",
      completed: true,
    },
    {
      id: 2,
      title: "Hello 2",
      description: "Hello 2",
      completed: false,
    },
    {
      id: 3,
      title: "Hello 3",
      description: "Hello 3",
      completed: false,
    },
    {
      id: 4,
      title: "Hello 4",
      description: "Hello 4",
      completed: true,
    },
  ],
};
