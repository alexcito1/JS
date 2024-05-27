import React from 'react';
import CardList from './body/CardList';
import Carrusel from './carrusel/Carrusel';
import HeaderSesion from './headerSesion/HeaderSesion';
import Cookies from 'universal-cookie';
import SesionExpired from './sesionExpired/SesionExpired';

function Sesion() {
    const cookies = new Cookies()
  return (
    <div>
      <p>Bienvenido {cookies.get("nombres")} {cookies.get("apellidos")}</p>
      <p>{cookies.get("email")}</p>

  <HeaderSesion/>
  <Carrusel/>
  <CardList/>
  <SesionExpired/>

    </div>
  );
}

export default Sesion;