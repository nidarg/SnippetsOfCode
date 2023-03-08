import { useAppContext } from "../context/appContext"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import {Form, Button,} from 'react-bootstrap'
import {Loading} from '../components';
import {CustomAlert} from "../components";
import { useNavigate } from "react-router-dom";


const SnippetEditPage = () => {
    const {id:snippetId} = useParams()
    const navigate = useNavigate()

    const {updateSnippet,getSnippet,isLoading,displayAlert,showAlert,snippet} = useAppContext()

    useEffect(()=>{
        getSnippet(snippetId)
    },[snippetId])

    const {title,description,code} = snippet

    const initialState = {
        title,description,code
    }

    const [values,setValues] = useState(initialState)

   
    const handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
      }

    const submitHandler = (e)=>{
        e.preventDefault()
        const{title,description,code} = values
        if(!title || !code){
          displayAlert()
          return
        }
        const currentSnippet = {snippetId,title,description,code}
        // console.log(currentSnippet);
         updateSnippet(currentSnippet)
         setTimeout(()=>{
          navigate(`/snippets/${snippetId}`)
          window.location.reload(false);
        },1000)
    }



  return (

        <Form className=" p-2 flex-column align-items-center justify-content-center" onSubmit={submitHandler}>
        {showAlert && <CustomAlert/>}
        {isLoading && <Loading/>}
        
            <Form.Group className="mb-3" controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control className = "form-control-lg"
              type='text'
              name='title'
              placeholder='Enter title'
              value={values.title}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
           
        
        <Form.Group className="mb-3" controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={5} className = "form-control-lg"
            type='text'
            name='description'
            placeholder='Enter description'
            value={values.description}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId='code'>
          <Form.Label>Code Snippet</Form.Label>
          <Form.Control as ="textarea" rows={20} className = "form-control-lg"
            type='text'
            name='code'
            placeholder='Enter code snippet'
            value={values.code}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button className="mb-3" variant='outline-info' type='submit' disabled = {isLoading}>
          Submit
        </Button>
        </Form>
   
    
       
  )
}

export default SnippetEditPage