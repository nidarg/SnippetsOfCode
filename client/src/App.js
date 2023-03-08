
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Landing,Error,ProtectedRoute,SharedLayout, AllSnippetsPage,SnippetPage,RegisterPage,SnippetEditPage } from './pages';


function App() {
  return (
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <SharedLayout/>
        </ProtectedRoute>
        
      }>
        
        <Route index element={<AllSnippetsPage/>}/>
        <Route path='snippets/:id' element={<SnippetPage/>}/>
        <Route path='snippets/edit/:id' element={<SnippetEditPage/>}/>
      </Route>
      {/* <Route path='/snippets' element={<AllSnippetsPage/>}/> */}
      
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='*' element={<Error/>}/>

    </Routes>
   </BrowserRouter>
 
  );
}

export default App;
