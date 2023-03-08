

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/appContext";
import {Form, Button} from 'react-bootstrap'
import Loading from './Loading';
import CustomAlert from './Alert'




const initialState = {
  title: '',
  description: '',
  code: '',
  
}

const AddSnippet = () => {

  const [values, setValues] = useState(initialState)

  const {isLoading, showAlert, displayAlert,createSnippet} = useAppContext()
  
  const navigate = useNavigate()

  // global state and useNavigate



    const handleChange = (e) => {
      setValues({...values, [e.target.name] : e.target.value})
    }
  
    const submitHandler = (e) => {
      e.preventDefault()
      const{title,description,code} = values
      // code = code.replace(/↵/g, "\n")
      if(!title || !code){
        displayAlert()
        return
      }
      const currentSnippet = {title,description,code}
      // console.log(currentSnippet);
       createSnippet(currentSnippet)
       setTimeout(()=>{
        navigate('/')
        window.location.reload(false);
      },1000)
    }

    // ! very important -> useEffect after onSubmit
    // useEffect(()=>{
    //   if(successCreateSnippet){
    //     setTimeout(()=>{
    //       navigate('/')
    //       window.location.reload(false);
    //     },1000)
    //   }
    // },[successCreateSnippet,navigate])

   
    return (

        
     <div>
        <Form  className=" p-2 d-flex flex-column align-items-center" onSubmit={submitHandler}>
        {showAlert && <CustomAlert/>}
        {isLoading && <Loading/>}
        
            <Form.Group style={{ width: '30rem'}} className="mb-3" controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control className = "form-control-lg"
              type='text'
              name='title'
              placeholder='Enter title'
              value={values.title}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
           
        
        <Form.Group style={{ width: '30rem'}} className="mb-3" controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control  as="textarea" rows={5} className = "form-control-lg"
            type='text'
            name='description'
            placeholder='Enter description'
            value={values.description}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group style={{ width: '30rem'}} className="mb-3" controlId='code'>
          <Form.Label>Code Snippet</Form.Label>
          <Form.Control as ="textarea" rows={20} cols={5} className = "form-control-lg"
            type='text'
            name='code'
            placeholder='Enter code snippet'
            value={values.code}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button className="mb-3" variant='outline-info' type='submit' disabled = {isLoading}>
          Create Snippet
        </Button>
        </Form>
        </div>

    )
}

export default AddSnippet
