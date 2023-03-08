import React,{useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {Row,Col,Button} from 'react-bootstrap'
import { Loading } from '../components'
import { useAppContext } from '../context/appContext'
import {CopyToClipboard} from 'react-copy-to-clipboard';


const SnippetPage = () => {
  const {id:snippetId} = useParams()
  const navigate = useNavigate()

  const {isLoading,getSnippet,snippet,deleteSnippet} = useAppContext()
  
  useEffect(()=>{
    getSnippet(snippetId)
    // eslint-disable-next-line
  },[snippetId])

  const handleDeleteSnippet = ()=>{
    deleteSnippet(snippetId)
    navigate('/')
  }
  const handleEditSnippet = ()=>{
   
    navigate(`/snippets/edit/${snippetId}`)
  }

  

  return (
    <>
    {isLoading && <Loading/>}
    
      <Row >
        <Col className='d-flex p-3 justify-content-center'>
            <Button onClick={handleDeleteSnippet}>Delete</Button>
        </Col>
        <Col className='d-flex p-3 justify-content-center'>
          <Button onClick={handleEditSnippet}>Edit</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className='d-flex p-3 justify-content-center align-items-center border border-info rounded-top rounded-bottom'>
          {snippet.title}
        </Col> 
      </Row >
      {snippet.description && (<Row className="mb-3"><Col style={{ whiteSpace: "pre-wrap" }}  className='d-flex  p-3 justify-content-center align-items-center border border-info rounded-top rounded-bottom'>{snippet.description}</Col>
      </Row>)}
      <Row  className='d-flex flex-column p-3 justify-content-center align-items-center border border-info rounded-top rounded-bottom'>
        <Col className='d-flex p-3 justify-content-center align-items-center '>
        <CopyToClipboard text={snippet.code}>
          <Button>Copy</Button>
        </CopyToClipboard></Col>
      
        <Col style={{ whiteSpace: "pre-wrap" }} className='d-flex p-3 justify-content-center align-items-center '>
       
          {snippet.code}
        </Col >
        </Row>
    
    </>
    
  )
}

export default SnippetPage