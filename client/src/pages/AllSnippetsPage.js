import {SnippetsContainer,AddSnippet} from '../components'
import {Row,Col,Container} from 'react-bootstrap'


const AllSnippetsPage = ()=>{
    return(
   
       <Container >
            <Row>
                <Col ><SnippetsContainer/></Col>
                <Col><AddSnippet/></Col>
            </Row>
            
        </Container>


   
    )
    
}

export default AllSnippetsPage