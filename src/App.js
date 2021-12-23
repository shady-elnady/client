import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import Home from "./components/Home";
import Users from "./components/Users";
import Canvas from "./components/Canvas";

const App = () => {
  return (
    <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/">El Nady Classify Digit</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Canvas">Canvas</Nav.Link>
              <Nav.Link href="/Users">Users</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Canvas" element={<Canvas />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
    </Router>
  );
};

export default App;
