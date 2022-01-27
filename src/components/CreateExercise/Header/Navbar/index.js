import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AppBar extends React.Component {
  render() {
    const navbar = {backgroundColor: '#005f73'};
    return(
        <Navbar variant='dark' expand="lg" style={navbar} >
        <Container fluid="md">
            <Navbar.Brand href="/">ExerTracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Exercises</Nav.Link>
                <Nav.Link href="/create">Create Exercises Log</Nav.Link>
                <Nav.Link href="/user">Create User</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
  }
}
