
import {useState,useMemo} from 'react'
import { useAppContext } from "../context/appContext";

import {Container,Form, Button, Row, Col} from 'react-bootstrap'


const SearchContainer = () => {

    const [inputSearch,setInputSearch] = useState('')
    const{isLoading,handleChange,clearFilters} = useAppContext()

    const submitHandler = (e)=>{
        e.preventDefault()
        setInputSearch('')
        clearFilters()
    }
    const debounce = () => {
        let timeoutID;
        return (e) => {
          setInputSearch(e.target.value);
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            handleChange({ name: e.target.name, value: e.target.value });
          }, 1000);
        };
      };
      const optimizedDebounce = useMemo(() => debounce(), []);

  return (
  
    <Container>
        <Form onSubmit={submitHandler} >
            <Row className="d-flex justify-content-center align-items-center" >
                <Col>
                    <Form.Control type='search' name='search' value = {inputSearch} 
                        onChange = {optimizedDebounce} 
                        placeholder='Search Products...' 
                        className='p-2'>
                    </Form.Control>
                </Col>
                <Col>
                <Button type='submit' variant='outline-info' className='p-2' disabled={isLoading}>
                    Clear Filters
                </Button>
                </Col>
            </Row>
        </Form>

    </Container>
        
  
    
  )
}

export default SearchContainer
