import styles from "./Login.module.css"
import { useAuthentication } from "../../hooks/useAuthentication";
import {useState, useEffect} from 'react'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const{login, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) =>{
    e.preventDefault();

    setError("")
    const user = {
      email,
      password,
    }
    const res = await login(user)
    console.log(user);
  };

  useEffect(() => {

    if(authError){
      setError(authError);
    }
  }, [authError]);
  return (
          <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" role="dialog" id="modalSignin">
  <div className="modal-dialog" role="document">
    <div className="modal-content rounded-4 shadow">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body p-5 pt-0">
        <form onSubmit={handleSubmit}>

          <div className="form-floating mb-3">
            <input 
              type="email" 
              name="email" 
              className="form-control rounded-3" 
              placeholder="nome@exemplo.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="inputId">E-mail</label>
          </div>
          <div className="form-floating mb-3">
            <input 
              type="password" 
              name="password" 
              className="form-control rounded-3" 
              placeholder="Digite sua senha" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="inputId">Senha</label>
          </div>
        
          {!loading && <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Entrar</button>}
          {loading && <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" disabled type="submit">Aguarde...</button>}
          {error && <p className="error text-danger">{error}</p>}
        </form>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Login
