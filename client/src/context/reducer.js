import {

    DISPLAY_ALERT ,
   CLEAR_ALERT ,
    // REGISTER_REQUEST,
    // REGISTER_SUCCESS, 
    // REGISTER_FAIL,
   
    // LOGIN_REQUEST,
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    LOGOUT ,
//     GET_CURRENT_USER_REQUEST,
//  GET_CURRENT_USER_SUCCESS,

    SETUP_USER_REQUEST,
    SETUP_USER_SUCCESS,
    SETUP_USER_FAIL,
   
    GET_SNIPPETS_REQUEST, 
    GET_SNIPPETS_SUCCESS,
   
   
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
    
   
    HANDLE_CHANGE,
    CLEAR_FILTERS,
   CLEAR_VALUES,
    CHANGE_PAGE,
   
   } from './actions'

   import {initialState} from './appContext'

   const reducer = (state, action)=>{
    if (action.type === DISPLAY_ALERT) {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      }
    }
  
    if (action.type === CLEAR_ALERT) {
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }
    }

    // if(action.type === REGISTER_REQUEST){
    //     return{...state, isLoading:true}
    //   }
    
    //   if(action.type === REGISTER_SUCCESS){
    //     return {
    //       ...state,
    //       user:action.payload.user,
    //       token:action.payload.token,
    //       isLoading:false,
    //       showAlert:true,
    //       alertType:'success',
    //       alertText:'User Created! Redirecting...'
    //     }
    //   }
    
    //   if (action.type === REGISTER_FAIL) {
    //     return {
    //       ...state,
    //       isLoading: false,
    //       showAlert: true,
    //       alertType: 'danger',
    //       alertText: action.payload.msg,
    //     }
    //   }

    //   if(action.type === LOGIN_REQUEST){
    //     return{...state, isLoading:true}
    //   }

    //   if(action.type === LOGIN_SUCCESS){
    //     return {
    //       ...state,
    //       user:action.payload.user,
    //       token:action.payload.token,
    //       isLoading:false,
    //       showAlert:true,
    //       alertType:'success',
    //       alertText:'Login Successful! Redirecting...'
    //     }
    //   }
    
    //   if (action.type === LOGIN_FAIL) {
    //     return {
    //       ...state,
    //       isLoading: false,
    //       showAlert: true,
    //       alertType: 'danger',
    //       alertText: action.payload.msg,
    //     }
    //   }


      if (action.type === SETUP_USER_REQUEST) {
        return { ...state, isLoading: true };
      }
      if (action.type === SETUP_USER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          showAlert: true,
          alertType: 'success',
          alertText: action.payload.alertText,
        };
      }
      if (action.type === SETUP_USER_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }
      
      if(action.type === LOGOUT){
        return{
          ...initialState,
          user:null,
          token:null,
        }
      }

      if(action.type === GET_SNIPPETS_REQUEST){
        return {...state, isLoading:true, showAlert:false}
      }
      
      if(action.type === GET_SNIPPETS_SUCCESS){
        return{
          ...state,
          isLoading:false,
          snippets:action.payload.snippets,
          totalSnippets:action.payload.totalSnippets,
          numPages : action.payload.numPages
        }
      }

      if(action.type === GET_SNIPPET_REQUEST){
        return {...state, isLoading:true, showAlert:false}
      }
      
      if(action.type === GET_SNIPPET_SUCCESS){
        return{
          ...state,
          isLoading:false,
          snippet:action.payload
        }
      }
      
      if (action.type === GET_SNIPPET_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      
      if(action.type === CREATE_SNIPPET_REQUEST){
        return {...state, isLoading:true, showAlert:false}
      }

      if(action.type === CREATE_SNIPPET_SUCCESS){
        return {
            ...state, 
            snippets:[...state.snippets,action.payload],
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Snippet created!',
            successCreateSnippet:true
        }
      }
      if(action.type === CREATE_SNIPPET_FAIL){
        return {
          ...state,
          isLoading:false,
          showAlert:true,
          alertType:'danger',
          alertText:action.payload.msg
        }
      }

      if (action.type === DELETE_SNIPPET_REQUEST) {
        return { ...state, isLoading: true };
      }
      if (action.type === DELETE_SNIPPET_FAIL) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        };
      }

      // if(action.type === SET_UPDATE_SNIPPET){
      //   const snippet = state.snippets.find(snippet=>snippet._id === action.payload)
      //   const{_id,title,description,code} = snippet
      //   return{
      //       ...state,
      //       isEditing:true,
      //       editSnippetId:_id,
      //       title,description,code
      //   }
      // }

      if(action.type === UPDATE_SNIPPET_REQUEST){
        return {...state, isLoading:true}
      }

      if(action.type === UPDATE_SNIPPET_SUCCESS){
        const updatedSnippet = action.payload
        return{
            ...state,
            snippets:state.snippets.map(snippet=>{
                if(snippet._id === updatedSnippet._id){
                    return updatedSnippet
                }
                return snippet
            }),
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Snippet Updated'
        }

      }

      if (action.type === HANDLE_CHANGE) {
        return { ...state,page:1,  [action.payload.name]: action.payload.value }
      }

      if (action.type === CLEAR_VALUES) {
        const initialState = {
          isEditing: false,
          editSnippetId:'',
          snippet:{}
        }
        return {
            ...state,
            ...initialState
        }
    }
    

      if (action.type === CLEAR_FILTERS) {
        return {
          ...state,
          search: '',
        }
      }
      
      if (action.type === CHANGE_PAGE) {
        return { ...state, page: action.payload.page }
      }
      
    //   if (action.type === GET_CURRENT_USER_REQUEST) {
    //     return { ...state, userLoading: true, showAlert: false };
    //   }
    //   if (action.type === GET_CURRENT_USER_SUCCESS) {
    //     return {
    //       ...state,
    //       userLoading: false,
    //       user: action.payload.user,
    //       token:action.payload.token
    //   }
    // }
      
        throw new Error(`no such action: ${action.type}`)

}

export default reducer