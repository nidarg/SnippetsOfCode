import React from 'react'

import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const Snippet = ({_id,title,description,code}) => {

    
  return (
    
    <Card style={{ width: '30rem', height:'15rem' }} className='my-3 p-2 rounded overflow-hidden'>
           <Link to={`/snippets/${_id}`}>
            
                <Card.Title as='div'>
                    <strong>{title}</strong>
                </Card.Title>
                <Card.Body>
           
                {description  & (
                    <Card.Text as = 'div' style={{ whiteSpace: "pre-wrap" }}>
                        {description}
                    </Card.Text>
                )}
                    
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>{code}</Card.Text>
                </Card.Body>
          
                </Link>
                
        </Card>
       
  )
}

export default Snippet