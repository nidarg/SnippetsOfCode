import Alert from 'react-bootstrap/Alert';
import { useAppContext } from '../context/appContext';

const CustomAlert = ()=>{
    const {alertType, alertText} = useAppContext()
    return <Alert className='' variant={alertType}>{alertText}</Alert>
}

export default CustomAlert