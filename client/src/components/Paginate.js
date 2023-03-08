
import Pagination from 'react-bootstrap/Pagination';
import { useAppContext } from '../context/appContext'

const Paginate = () => {

    const {numPages,page,changePage} = useAppContext()

  return( numPages > 1 && (
      <Pagination>
          {[...Array(numPages).keys()].map(x=>(
                <Pagination.Item key={x} active={x+1===page} onClick={()=> changePage(x+1)}>{x+1}</Pagination.Item>
          ))}
      </Pagination>
    )
  )
}

export default Paginate