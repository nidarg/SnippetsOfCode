import React from "react";
import Logo from "../components/Logo";
import code_snippets from '../assets/code_snippets.svg'
import {Link} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

const Landing = ()=>{
    return(
    <Container fluid>
        <Nav  activeKey="/home">
            <Nav.Item>
            <Nav.Link href="/landing"><Logo/></Nav.Link>
            </Nav.Item>
        </Nav>

        <Row xs={1} md={2}>
        <Col className="d-flex p-2 flex-column align-items-center justify-content-center">
          <h1>Code Snippets</h1>
          <p>Save your time by using your code snippets anytime anywhere</p>
          <Link to='/register'>
            <Button variant="primary" size="lg">
            Login/Register
            </Button>
          </Link>
        </Col>
        <Col  >
          <Image fluid src={code_snippets}/>
        </Col>
      </Row>

    </Container>
    )
}

export default Landing