import React from 'react'
import './headerSesion.css'
// import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


function Header() {

    const handleClickCerrarSesion = (e) => {
        e.preventDefault(); // Evitar que el enlace redirija inmediatamente
    
        // Mostrar el SweetAlert al hacer click en el enlace
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Estás a punto de cerrar sesión. ¿Deseas continuar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cerrar sesión',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir a la página de Login si se confirma la acción
            window.location.href = '/login'; // Cambia esto por tu lógica de redirección
          }
        });
      };
    
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
                            
                            <li className="nav-item">
                                <a className="nav-link " aria-disabled="true" href="#" onClick={handleClickCerrarSesion}>Cerrar Sesion </a>
                            </li>
                            
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