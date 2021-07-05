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

import yatApi from "../pages/api/hello";

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
        <div>
          <h3>Login</h3>
        </div>
        <div className="form-box">
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

          <p>Forgot Password?</p>

          <div>
            New to Yat?{" "}
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </div>

          <div>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
