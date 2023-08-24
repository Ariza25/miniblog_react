import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto é um blog feito com React no Frontend e Firebase no backend</p>
      <Link to="/postar/criar" className="btn btn-primary">Criar Post</Link>
    </div>
  )
}

export default About
