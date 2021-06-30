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
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = {
      email,
      password,
    };
    setEmail("");
    setPassword("");
    console.log("loggedInUser ", loggedInUser);
  };

  return (
    <>
      <Container>
        <Navbar>
          <h3>Login</h3>
        </Navbar>
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