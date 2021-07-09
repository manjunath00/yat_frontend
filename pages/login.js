import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Navbar,
} from "reactstrap";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";

import yatApi from "./api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginCall = async (data) => {
    try {
      const response = await yatApi.post("/api/user/authenticate", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const loggedInUser = {
      email,
      password,
    };
    setEmail("");
    setPassword("");
    return loginCall(loggedInUser);
  };

  return (
    <>
      <Container>
        <div className="form-box">
          <div>
            <h3>Login</h3>
          </div>
          <Form onSubmit={onFormSubmit}>
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
              Login
            </Button>
          </Form>
          <div>
            New to Yat?{" "}
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
