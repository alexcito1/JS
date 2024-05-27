import React from 'react'
import './header.css'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className="contenedor border">

            <nav className="navbar navbar-expand-lg bg-dark-subtle border">
                <div className="container-fluid">
                    <img src='S.png' className='logo' alt='logo'/>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#">Tutoriales</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  " aria-disabled="true" href="#">Referencias</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-disabled="true" href="#">Recursos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " aria-disabled="true" href="#">Contacto</a>
                            </li>
                            <Link to='/registro'>
                            <li className="nav-item">
                                <a className="nav-link " aria-disabled="true" href="#">Registrarse</a>
                            </li>
                            </Link>

                            <Link to='/Login'>
                            <li className="nav-item">
                                <a className="nav-link " aria-disabled="true" href="#">Iniciar Sesion</a>
                            </li>
                            </Link>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header 