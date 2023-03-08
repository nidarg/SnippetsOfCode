import { Outlet } from "react-router-dom"
import { CustomNavbar } from "../components"
import {SearchContainer} from '../components'
import{Container,Row,Col} from 'react-bootstrap'

const SharedLayout = () => {
  return (
    <>
      {/* CustomNavbar will be shared across all child routes */}
    <Row className="mb-3">
    <Col><CustomNavbar/></Col>
  </Row>
  
    
    <Container >
        <Row className="mb-3">
          <Col><SearchContainer/></Col>
        </Row>
  
       
          {/* Outlet -> child routes */}
        <Outlet/>
      
       
    </Container>
    </>
   
  )
}

export default SharedLayout