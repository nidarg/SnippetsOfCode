import React from 'react'
import Container from 'react-bootstrap/Container';
import page_not_found from '../assets/page_not_found.svg'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import {Link} from 'react-router-dom'


const Error = () => {
  return (
    <Container fluid className="d-flex p-2 flex-column align-items-center justify-content-center">
        <Image fluid src={page_not_found}/>
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find page you are looking for</p>
        <Link to='/'>
            <Button variant="primary" size="lg">
            Back Home
            </Button>
          </Link>
    </Container>
  )
}

export default Error