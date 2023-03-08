

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/appContext";
import {Container,Form, Button, Row, Col} from 'react-bootstrap'
import { Loading } from "../components";
import {CustomAlert} from '../components'



const initialState = {
  name: '',
  email: '',
  password: '',
  isMember:false
}

const RegisterPage = () => {

  const [values, setValues] = useState(initialState)

  const {isLoading, showAlert, displayAlert, setupUser, user} = useAppContext()
  
  const navigate = useNavigate()

  // global state and useNavigate



    const handleChange = (e) => {
      setValues({...values, [e.target.name] : e.target.value})
    }
  
    const submitHandler = (e) => {
      e.preventDefault()
      const{name, email, password, isMember} = values
      
      if(!email || !password || (!isMember && !name)){
        displayAlert()
        return
      }
      const currentUser = {name, email, password}
      if(isMember){
        setupUser({
            currentUser,
            endPoint: 'login',
            alertText: 'Login Successful! Redirecting...',
          });
      }else{
        setupUser({
            currentUser,
            endPoint: 'register',
            alertText: 'User Created! Redirecting...',
          });
      }
      
    }

    // ! very important -> useEffect after onSubmit
    useEffect(()=>{
      if(user){
        setTimeout(()=>{
          navigate('/')
          window.location.reload(false);
        },1000)
      }
    },[user,navigate])

    const toggleMember = ()=>{
      setValues({...values, isMember : !values.isMember})
    }

    return (

        <Container >
        
        <Form className="d-flex p-2 flex-column align-items-center justify-content-center" onSubmit={submitHandler}>
        {<h3>{values.isMember? 'Login' : 'Register'}</h3>}
        {showAlert && <CustomAlert/>}
        {isLoading && <Loading/>}
        {!values.isMember && (
            <Form.Group className="mb-3" controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='Enter name'
              value={values.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
            )}
        
        <Form.Group className="mb-3" controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={values.email}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter password'
            value={values.password}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button className="mb-3" variant='outline-info' type='submit' disabled = {isLoading}>
          Submit
        </Button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member? '}

          <Button  variant='outline-info' type='button' onClick={toggleMember} className='mb-3'>
            {values.isMember ? 'Register' : 'Login'}
          </Button>
        </p>
        </Form>
        </Container>

      

        


    )
}

export default RegisterPage
