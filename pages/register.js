import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

import yatApi from "../pages/api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupCall = async (data) => {
    try {
      const response = await yatApi.post("/api/user", data);
      Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName: name,
      email,
      password,
    };
    setName("");
    setEmail("");
    setPassword("");
    Router.push("/login");
    return signupCall(newUser);
  };

  return (
    <Container>
      <div className="form-box">
        <div>
          <h3>Sign Up</h3>
        </div>
        <Form onSubmit={onFormSubmit}>
          <FormGroup>
            <Label for="text">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <br />
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <br />
          <Button color="primary" size="md" block>
            Register
          </Button>
        </Form>

        <div>
          Already Have an account{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Register;
