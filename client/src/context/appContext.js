
import React, { useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'

import {

 DISPLAY_ALERT ,
CLEAR_ALERT ,
//  REGISTER_REQUEST,
//  REGISTER_SUCCESS, 
//  REGISTER_FAIL,

//  LOGIN_REQUEST,
//  LOGIN_SUCCESS,
//  LOGIN_FAIL,
 LOGOUT ,

 SETUP_USER_REQUEST,
SETUP_USER_SUCCESS,
SETUP_USER_FAIL,

 GET_SNIPPETS_REQUEST, 
 GET_SNIPPETS_SUCCESS,
//  GET_SNIPPETS_FAIL, 

 GET_SNIPPET_REQUEST,
 GET_SNIPPET_SUCCESS, 
 GET_SNIPPET_FAIL,

 CREATE_SNIPPET_REQUEST,
 CREATE_SNIPPET_SUCCESS, 
 CREATE_SNIPPET_FAIL, 

DELETE_SNIPPET_REQUEST,

DELETE_SNIPPET_FAIL, 


UPDATE_SNIPPET_REQUEST,
UPDATE_SNIPPET_SUCCESS, 
UPDATE_SNIPPET_FAIL, 

 HANDLE_CHANGE,
 CLEAR_FILTERS,
CLEAR_VALUES,
 CHANGE_PAGE,

} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


export const initialState = {
  userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user:user ? JSON.parse(user) : null,
    token:token,
    page:1,
    numPages:1,
    totalSnippets:0,
    snippets:[],
    successDeleteSnippet:false,
    successCreateSnippet:false,
    isEditing:false,
    editSnippetId:'',
    snippet:{},
    title:'',
    description:'',
    code:'',
    search:'',  
  }

  const AppContext = React.createContext()

const AppProvider = ({children})=>{
  const [state, dispatch] = useReducer(reducer,initialState)

  const displayAlert =() =>{
    dispatch({type:DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 2000)
  }

  const addUserToLocalStorage = ({user, token})=>{
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token',token)
    
  }

  const removeUserFromLocalStorage = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
   
  }
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_REQUEST });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token} = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText , token},
      });
      addUserToLocalStorage({user,token})
    } catch (error) {
      dispatch({
        type: SETUP_USER_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // const registerUser = async(currentUser)=>{
  //   dispatch({type:REGISTER_REQUEST})
  //   try {
  //       const {data} = await axios.post('/api/v1/auth/register',currentUser)
  //       const {user,token} = data
  //       dispatch({
  //       type:REGISTER_SUCCESS,
  //       payload:{user,token}
  //   })
  //   addUserToLocalStorage({user,token})
  //   } catch (error) {
  //       console.log(error.response)
  //       dispatch({
  //           type:REGISTER_FAIL,
  //           payload:{msg:error.response.data.msg}
  //       })
  //   }
  //   clearAlert()
  // }

  // const loginUser = async(currentUser)=>{
  //   dispatch({type:LOGIN_REQUEST})
  //   try {
  //       const {data} = await axios.post('/api/v1/auth/login',currentUser)
  //       const {user,token} = data
  //       dispatch({
  //       type:LOGIN_SUCCESS,
  //       payload:{user,token}
  //   })
  //   addUserToLocalStorage({user,token})
  //   } catch (error) {
  //       console.log(error.response)
  //       dispatch({
  //           type:LOGIN_FAIL,
  //           payload:{msg:error.response.data.msg}
  //       })
  //   }
  //   clearAlert()
  // }

  const logout = ()=>{
    dispatch({
      type:LOGOUT
    })
    removeUserFromLocalStorage()
  }

  const getSnippets = async()=>{
    const{page,search} = state
    let url = `/api/v1/snippets?page=${page}`
    if(search){
        url = url + `&search=${search}`
    }
    dispatch({
        type:GET_SNIPPETS_REQUEST
    })
    try {
        const {data} = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const{snippets,totalSnippets,numPages} = data
        dispatch({
            type:GET_SNIPPETS_SUCCESS,
            payload:{snippets,totalSnippets,numPages}
        })
    } catch (error) {
        console.log(error.response);
      logout()
    }
  }

  const getSnippet = async(id)=>{
    dispatch({type:GET_SNIPPET_REQUEST})
    try {
      const {data} = await axios.get(`/api/v1/snippets/${id}`, {
        headers:{
          Authorization:`Bearer ${token}`
        }
    })
      const {snippet} = data
      dispatch({
        type:GET_SNIPPET_SUCCESS,
        payload:snippet
      })
    } catch (error) {
      dispatch({
        type: GET_SNIPPET_FAIL,
      payload: { msg: error.response.data.msg },
      })
    }
  }

  const createSnippet = async(currentSnippet)=>{
    
    dispatch({type:CREATE_SNIPPET_REQUEST})
      try {
        
        const{data} = await axios.post('/api/v1/snippets', currentSnippet, {
        headers:{
          Authorization:`Bearer ${token}`
        }})
        const {snippet} = data
        dispatch({
          type:CREATE_SNIPPET_SUCCESS,
          payload:snippet
        })
        dispatch({ type: CLEAR_VALUES });
        
      } catch (error) {
        if (error.response.status === 401) return;
        dispatch({
          type: CREATE_SNIPPET_FAIL,
        payload: { msg: error.response.data.msg },
        })
        
      }
  }

  const deleteSnippet = async(id)=>{
    dispatch({type:DELETE_SNIPPET_REQUEST})
    try {
        await axios.delete(`/api/v1/snippets/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        getSnippets()
    } catch (error) {
        dispatch({
            type: DELETE_SNIPPET_FAIL,
          payload: { msg: error.response.data.msg },
          })
    }
  }

  // const setUpdateSnippet = (id) => {
  //   dispatch({ type: SET_UPDATE_SNIPPET, payload: { id } });
  // };

  const updateSnippet = async ({snippetId,title,description,code}) => {
    dispatch({ type: UPDATE_SNIPPET_REQUEST });

    try {
        // const{title,description,code} = state
      const {data} = await axios.patch(`/api/v1/snippets/${snippetId}`,{title,description,code},{
        headers:{
            Authorization:`Bearer ${token}`
        }
      }) 
      const {snippet} = data

      dispatch({ type: UPDATE_SNIPPET_SUCCESS,payload:snippet});
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_SNIPPET_FAIL,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };


  const handleChange = ({name, value})=>{
    dispatch({
      type:HANDLE_CHANGE,
      payload:{name, value}
    })
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const changePage=(page)=>{
    dispatch({
      type:CHANGE_PAGE, payload:{page}
    })
  }

  // const getCurrentUser = async () => {
  //   dispatch({ type: GET_CURRENT_USER_REQUEST});
  //   try {
  //     const { data } = await axios.get('/api/v1/auth/getCurrentUser');
  //     const { user} = data;

  //     dispatch({
  //       type: GET_CURRENT_USER_SUCCESS,
  //       payload: {user,token}
  //     });
  //   } catch (error) {
  //     if (error.response.status === 401) return;
  //     logout();
  //   }
  // };
  // useEffect(() => {
  //   getCurrentUser();
  // }, []);

  return (
    
    <AppContext.Provider value = {{
        ...state,
        displayAlert,
        setupUser,
        logout,
        getSnippets,
        getSnippet,
        createSnippet,
        deleteSnippet,
        handleChange,
        clearFilters,
        clearValues,
        changePage,
        updateSnippet,
        // setUpdateSnippet,
        

    }}>{children}</AppContext.Provider>
  )

}

export const useAppContext = () => {
    return useContext(AppContext)
  }
  
  export  { AppProvider }