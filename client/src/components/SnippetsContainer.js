
import { useAppContext } from "../context/appContext";
import Alert from 'react-bootstrap/Alert';
import { useEffect } from "react";
import Loading from "./Loading";
import CustomAlert from "./Alert";
import Paginate from "./Paginate";
import {Row,Col } from "react-bootstrap";
import Snippet from './Snippet'

const SnippetsContainer = ()=>{
    const {getSnippets,isLoading,snippets,page,totalSnippets,search,showAlert} = useAppContext()

    useEffect(()=>{
        getSnippets()
         // eslint-disable-next-line
    },[page,search])

    if(isLoading) return <Loading/>

    if(totalSnippets === 0){
        return <Row><Alert variant="danger">No Snippets to display...</Alert></Row>
    }

    return(
        <>
            {showAlert && <CustomAlert/>}
            {totalSnippets === 0 && <Row><Col><Alert  variant="danger">No Snippets to display...</Alert></Col></Row>}
            <div className="d-flex flex-column gap-3 justify-content-center">
                 {snippets.map(snippet=>{
                    return(
                    <Col key = {snippet._id} >
                        <Snippet {...snippet}/>
                    </Col>
                    )
                })
                }
                 
            </div>
            <Paginate/>
       
            </>  
    )
}

export default SnippetsContainer