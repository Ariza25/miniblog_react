import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'

//hooks
import {useState, useEffect} from 'react'
import { useAuthentication } from './hooks/useAuthentication'

//pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Produtos from './pages/Produtos/Produtos'
import Contato from './pages/Contato/Contato'
import Cadastrar from './pages/Cadastrar/Cadastrar'
import Login from './pages/Login/Login'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Search from './pages/Search/Search'

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication()

  useEffect(() =>{
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
  }, [auth])

  const loadingUser = user === undefined;
  if(loadingUser){
    return <p>carregando...</p>
  }

  return (
    <>
    <AuthProvider value={{user}}>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/sobre' element={<About/>}/>
            <Route path='/produtos' element={<Produtos/>}/>
            <Route path='/contato' element={<Contato/>}/>
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path='/cadastrar' element={!user ? <Cadastrar/> : <Navigate to="/"/>}/>
            <Route path='/postar/criar' element={user ? <CreatePost/> : <Navigate to="/login"/>}/>
            <Route path='/painel' element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
