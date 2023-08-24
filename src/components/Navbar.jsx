import { Link } from "react-router-dom"
import styles from './Navbar.module.css'
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

function Navbar() {

  const {user} = useAuthValue();
  const {logout} = useAuthentication();

  return (
    <>
 <nav className="p-3 bg-dark text-white">
    <div className="container-fluid">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <Link to="/" className="nav-link pe-5 text-white"><img src="./src/img/logo.png" width="50" height="50"/></Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link ps-3 text-white">Home</Link></li>
            <li><Link to="/sobre" className="nav-link px-2 text-white">Sobre</Link></li>
            <li><Link to="/produtos" className="nav-link px-2 text-white">Produtos </Link></li>
            <li><Link to="/contato" className="nav-link px-2 text-white">Contato</Link></li>
        </ul>

        <div className="d-flex">
         {!user && (
          <>
             <button 
                type="button" className="btn btn-outline-light me-2">
                <Link to="/login" className="nav-link px-2 text-white">Login</Link>
            </button>
            <button 
                type="button" className="btn btn-warning">
                <Link to="/cadastrar" className="nav-link px-2 text-white">Cadastrar</Link>
            </button>
          </>
         )}
         {user && (
           <>
           <button 
              type="button" className="btn btn-outline-light me-2">
              <Link to="/postar/criar" className="nav-link px-2 text-white">Nova Postagem</Link>
          </button>
          <button 
              type="button" className="btn btn-warning">
              <Link to="/painel" className="nav-link px-2 text-white">Painel</Link>
          </button>
          {user && (
            <li className="ps-5">
              <button onClick={logout} className="btn btn-primary">Sair</button>
            </li>
          )}
        </>
         )}
        </div>
      </div>
    </div>
  </nav>
  </>
  );
}

export default Navbar
