import './app.css';
import Inicio from './Componentes/Inicio';
import { Routes, Route, HashRouter } from "react-router-dom";
import NotFound from './Componentes/NotFound';
import Registro from './Componentes/Registro';
import Login from './Componentes/Login';
import Sesion from './Componentes/Sesion';

function App(){
    return (
        <HashRouter>
            <Routes>
                <Route exact path='/'         element={<Inicio/>}/>
                <Route exact path='/Registro' element={<Registro/>}/>
                <Route exact path='/Login' element={<Login/>}/>
                <Route exact path='/sesion' element={<Sesion/>}/>
       

                <Route path="*"            element={<NotFound/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
