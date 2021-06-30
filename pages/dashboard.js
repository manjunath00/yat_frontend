import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import React, { useState, useEffect } from "react";

const Dashboard = (props) => {
  const { todos = [] } = props;
  const [tasks, setTasks] = useState(todos);

  const onStatusChange = (e, id) => {
    const isChecked = e.target.checked;

    const newTasks = tasks.filter((item) => item.id != id);

    const task = tasks.filter((item) => item.id === id)[0];

    task.completed = isChecked;

    newTasks.push(task);

    setTasks(newTasks);
  };

  return (
    <Container>
      <h3>Dashboard</h3>

      <div className="flex">
        <div className="col-3 sidebar">
          <div className="flex sidebar-item">
            <h6>Completed</h6>
            <span>50</span>
          </div>
          <div className="flex sidebar-item todo-active">
            <h6>Favourites </h6>
            <span>50</span>
          </div>
          <div className="flex sidebar-item">
            <h6>Todo</h6>
            <span>50</span>
          </div>
        </div>
        <div className="col-9 main-bar">
          <h3>Todos</h3>
          <div>
            {tasks.map(({ id, title, description, completed }) => (
              <div key={id} className="todo flex-layout">
                {" "}
                <Input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => onStatusChange(e, id)}
                />{" "}
                <div className="todo-text">
                  <span className="todo-text-primary">{title}</span>
                  <div>{description}</div>
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
