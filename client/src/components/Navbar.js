import {Navbar, Nav, Container,NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'

const CustomNavbar = ()=>{

    const {user,logout} = useAppContext()

    return(
        <header>
              <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
              <Container>
                <LinkContainer to='/'>
                  <Navbar.Brand ><Logo/></Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                  <Nav className='ms-auto'>
                 
                      <NavDropdown title = {user.name} id = 'username'>
                        <NavDropdown.Item onClick = {logout}>Logout</NavDropdown.Item>
                      </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </header>
    )

}

export default CustomNavbar