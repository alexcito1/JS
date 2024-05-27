import React from 'react';
import Swal from 'sweetalert2';
import './registro.css';
import { useState } from 'react';
import { useRef } from 'react';


export default function Registro() {
  //const [deptos Index, setDeptos Index] = useState(1);

  const [identificacionError, setIdentificacionError] = useState(false);
  const [nomError, setNomError] = useState(false);
  const [apellidoError, setApellidoError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorVacio, setErrorEmailVacio] = useState(false);
  const [direccionError, setDireccionError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);
  const [fechaNacimientoError, setFechaNacimientoError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorRepeat, setPasswordErrorRepeat] = useState(false);
  const [passComparacion, setPassComparacion] = useState(false);

  const form = useRef();

  function idError() {
    //Esta función setea a false la variable "identificacionError" para que el mensaje de error desaparezca cuando hacen click en el campo de la identificación. 
    setIdentificacionError(false);
  }

  function nombreError() {
    //Esta función setea a false la variable "nomError" para que el mensaje de error desaparezca cuando hacen click en el campo del nombre.
    setNomError(false);
  }
  function apelliError() {
    setApellidoError(false);
  }
  function errorEmail() {
    setEmailError(false); //Para cuando no escriban una dirección de correo válida en su estructura.
    setErrorEmailVacio(false); //Para cuan do dejen vacío el campo email
  }

  function dirError() {
    setDireccionError(false);
  }
  function telError() {
    setTelefonoError(false);
  }
  function fechaNacimientoErrorFuncion() {
    setFechaNacimientoError(false);
  }

  function passError() {
    setPasswordError(false);
  }
  function passRepeat() {
    //setPasswordErrorRepeat (false)
    setPassComparacion(false); 
    setPasswordErrorRepeat(false);
  }
  const [values, setValues] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    direccion: "",
    telefono: "",
    fechaNacimiento: "",
    password: "",
    passRepeat: "",
  });

  const handleChange = (e) => {
    //cuando se cambie de Input entonces se guarda la información en la variables.

    const { name, value } = e.target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  };
  const handleSubmit = (e) => {

    e.preventDefault();

    let validPassword = /^(?=.*[A-Z])(?=.*\d.*\d).{8,}$/; //Expersión regular para: Mínimo 8 caracteres de longitud. Almenos una letra mayúscula. Almenos una letra minúscula. Almenos un número. Almenos un caracter especial. https://uibakery.io/regex-library/password 
    let validEmail = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/; //Expresión regular para validar email, es decir, que el email ingresado tenga el formato correcto de una dirección de correo electrónico

    if (
      values.identificacion.length < 5 || values.identificacion.length > 10 || values.identificacion.length === 0
    ) {
      setIdentificacionError(true);
      return;
    } else if (values.nombres.length < 3 || values.nombres.length === 0) {
      //El método trim( ) elimina los espacios en blanco en ambos extremos del string
      setNomError(true);
      return;
    } else if (values.apellidos.length < 3 || values.apellidos.length === 0) {
      setApellidoError(true);
      return;
    } else if (values.email.length === 0) {
      setErrorEmailVacio(true);
      return;

    } else if (!validEmail.test(values.email)) {
      setEmailError(true);
      return;
    } else if (values.direccion.length < 15) {
      setDireccionError(true);
      return;
    } else if (values.telefono.length < 10 || values.telefono.length > 10) {
      setTelefonoError(true);
      return;
    } else if (values.fechaNacimiento === "") {
      setFechaNacimientoError(true);
      return;

    } else if (!validPassword.test(values.password)) {
      setPasswordError(true);
      return;
    } else if (values.passRepeat.length === 0) {
      setPasswordErrorRepeat(true);
      return;

    } else if (values.password !== values.passRepeat) {
      setPassComparacion(true);
      return;
    }

    fetch("http://localhost:3001/registro-usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          //alert("Usuario creado con exito")
          Swal.fire({
            title: "Ususario creado con exito",
            icon: "success",
          });
          form.current.reset();
          window.location.hash = "/login";
        }
        if (response.status === 400) {
          //alert(" +reponse.status")
          Swal.fire({
            title:
              "No fue posible crear el usuario ya existe el correo ingresado " +
              values.email,
            icon: "warning",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "No fue posible finalizar el proceso de registro por un error interno del servidor",
          icon: "error",
        })
      });
    }
    ///hmtl
    return (

      <div className='contenedorP'>
        <h1 className='center'>
          REGISTRO DE USUARIO
        </h1 >
        <form onSubmit={handleSubmit} ref={form} >
          <div class="form-group">
            <label for="numeroID">Numero de Identificacion</label>
            <input name='identificacion' type="number" class="form-control" id="numeroID" aria-describedby="emailHelp" placeholder="identificacion" onChange={handleChange} onClick={idError} />
            {identificacionError ? <small className="text-danger"> Numero de Identificacion </small>:""}

          </div>
          <div class="form-group">
            <label for="Nombres">Nombre</label>
            <input name='nombres' type="text" class="form-control" id="Nombres" placeholder="Nombre" onChange={handleChange} onClick={nombreError} />
            {nomError?<small className="text-danger"> Nombre </small>:""}
          </div>

          <div class="form-group">
            <label for="Apellidos">Apellido</label>
            <input name='apellidos' type="text" class="form-control" id="Apellidos" aria-describedby="emailHelp" placeholder="Apellido" onChange={handleChange} onClick={apelliError} />
            {apellidoError ? <small className="text-danger"> Apellido </small>:""}

          </div>
          <div class="form-group"> 
            <label for="Correo">Correo</label>
            <input name='email' type="email" class="form-control" id="Correo" placeholder="Correo" onChange={handleChange} onClick={errorEmail} />
            {emailError ? <small className="text-danger"> Correo </small> :""}
            {emailErrorVacio ? <small className="text-danger"> Error Vacio </small>:""}

            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div class="form-group">
            <label for="adress">Direccion</label>
            <input name='direccion' type="text" class="form-control" id="adress" aria-describedby="emailHelp" placeholder="Direccion" onChange={handleChange} onClick={dirError} />
            {direccionError ? <small className="text-danger"> Direccion incorrecta </small>:""}

          </div>
          <div class="form-group">
            <label for="NumberPhone">Telefono</label> 
            <input name='telefono' type="number" class="form-control" id="NumberPhone" placeholder="Telefono" onChange={handleChange} onClick={telError} />
            {telefonoError ? <small className="text-danger"> Telefono incorrecto </small>:""}
          </div>

          <div class="form-group">
            <label for="birthday">Fecha de Nacimiento</label>
            <input name='fechaNacimiento' type="date" class="form-control" id="birthday" aria-describedby="emailHelp" placeholder="DD/MM/AA" onChange={handleChange} onClick={fechaNacimientoErrorFuncion} />
            {fechaNacimientoError ? <small className="text-danger"> Fecha incorrecta </small>:""}

          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input name='password' type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange} onClick={passError} />
            {passwordError ? <small className="text-danger"> Contraseña incorrecta </small>:""}
            

          </div>

          <div class="form-group">
            <label for="exampleInputEmail2">Pass Repeat</label>
            <input name='passRepeat' type="password" class="form-control" id="exampleInputPassword2" aria-describedby="emailHelp" placeholder="Pass Repeat" onChange={handleChange} onClick={passRepeat} />
            {passwordErrorRepeat ? <small className="text-danger"> Incorrecto </small>:""}
            {passComparacion ? <small className="text-danger"> Mamaguevo </small>:""}
          </div>

          <div className="center">
            <button type="submit" class="btn btn-primary center">Submit</button>
          </div>
        </form>
      </div>
    )
  }
