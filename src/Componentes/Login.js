import React, { useEffect, useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import videoFondo from './BackVortice.mp4'; // Ruta relativa al componente
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import GroupIcon from '@mui/icons-material/Group';
import GoogleOAuth from './googleOAuth/GoogleOAuth';
import Cookies from 'universal-cookie';
import Header from './header/Header';
import './Login.css';

const Login = () => {
    const cookies = useMemo(() => new Cookies(), []);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const [values, setValues] = useState({
        rol: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);
    };

    const handleClickPassword = () => {
        setErrorPassword(false);
    };

    const handleClickEmail = () => {
        setErrorEmail(false);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const iniciarSesion = (e) => {
        e.preventDefault();
        let select = document.getElementById("exampleFormControlSelect1");
        values.rol = select.value;

        if (values.password.length === 0 && values.email.length === 0) {
            setErrorEmail(true);
            setErrorPassword(true);
            return;
        }
        if (values.password.length === 0) {
            setErrorPassword(true);
            return;
        }
        if (values.email.length === 0) {
            setErrorEmail(true);
            return;
        }

        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(values),
        })
        .then(response => response.json())
        .then(res => {
            if (res.title === "error") {
                Swal.fire({
                    title: "Las credenciales ingresadas no son correctas",
                    icon: "error",
                });
                window.location.hash = '/login';
                return;
            } else {
                cookies.set('email', res.email, {
                    secure: true,
                    sameSite: 'None',
                    path: '/',
                });
                cookies.set('nombres', res.nombres, {
                    secure: true,
                    sameSite: 'None',
                    path: '/',
                });
                cookies.set('apellidos', res.apellidos, {
                    secure: true,
                    sameSite: 'None',
                    path: '/',
                });

                if (values.rol === "Usuario") {
                    window.location.hash = '/sesion';
                } else {
                    window.location.hash = '/usuarios-registrados';
                }
            }
        })
        .catch(() => Swal.fire({
            title: "No se puede iniciar sesion por un problema en el servidor",
            icon: "error",
        }));
    };

    useEffect(() => {
        if (cookies.get('email')) {
            window.location.hash = '/login';
        }
    }, [cookies]);



    return (
        <div>
            <video autoPlay muted loop className="video-fondo">
                <source src={videoFondo} type="video/mp4" />
            </video>
            <Header />
            <form onSubmit={iniciarSesion} className='videoDiv'>
                <div className='fondo'>
                    <section className="vh-100">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-80">
                                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                    <div className="card shadow-2-strong rounded">
                                        <div className="card-body p-5 text-center">
                                            <h3 className="mb-5">Sign In</h3>

                                            <div className="form-group mb-4">
                                                <div className='text-start'>
                                                    <label htmlFor="exampleFormControlSelect1">Rol</label>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="exampleFormControlSelect1" name='rol'>
                                                        <option>Administrador</option>
                                                        <option>Usuario</option>
                                                    </select>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="basic-addon2"><GroupIcon /></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <div className='text-start'>
                                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" name='email' onChange={handleChange} onClick={handleClickEmail} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="basic-addon2"><AlternateEmailIcon /></span>
                                                    </div>
                                                </div>
                                                {errorEmail && <span className='text-start'><p>Debe ingresar un email</p></span>}
                                            </div>

                                            <div className="form-outline mb-4">
                                                <div className='text-start'>
                                                    <label className="form-label" htmlFor="typeEmailX-2">Password</label>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input type={showPassword ? "password" : "text"} className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" name='password' onChange={handleChange} onClick={handleClickPassword} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="basic-addon2"><PasswordIcon onClick={handleShowPassword} /></span>
                                                    </div>
                                                </div>
                                                {errorPassword && <span className='text-start'><p>Debe ingresar una contraseña</p></span>}
                                            </div>

                                            <div className="d-grid gap-2 col-15 mx-auto">
                                                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                            </div>

                                            <hr className="my-20" />

                                            <div className='row'>
                                                <div className='col-6'>
                                                    <GoogleOAuth>
                                                       
                                                    </GoogleOAuth>
                                                </div>
                                                <div className='col-6'>
                                                    {/* Otra opción de autenticación */}
                                                </div>
                                            </div>
                                            {/*<GitHubOAuth />*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
};

export default Login;


