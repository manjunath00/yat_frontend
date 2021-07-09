import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import Router from "next/router";

import yatApi from "../pages/api/hello";

const NewTask = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const asyncNewTask = async (data) => {
    const response = await yatApi.post("/api/task", data);
    Router.push("/dashboard");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const task = {
      name: taskName,
      description,
      completed,
    };
    setTaskName("");
    setCompleted(false);
    setDescription("");

    return asyncNewTask(task);
  };

  return (
    <Container>
      <div className="form-box">
        <h3>New Task</h3>

        <div>
          <Form onSubmit={onFormSubmit}>
            <FormGroup>
              <Label for="Task Name">Task Name</Label>
              <Input
                type="text"
                name="taskName"
                placeholder="Enter your task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormGroup>
            <br />

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Enter Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <br />

            <FormGroup>
              <Input
                type="checkbox"
                value={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />{" "}
              <Label for="email">Completed</Label>
            </FormGroup>
            <br />

            <FormGroup>
              <Button color="primary" size="md" block>
                Create New Task
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default NewTask;
