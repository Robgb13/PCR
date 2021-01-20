import React from "react";
import Inicio from "./Inicio";
import RegistroProductos from "./RegistroProductos";
import RegistroUsuarios from "./RegistroUsuarios";
import Productos from "./Productos";
import Menu from "./Menu";
import Botones from "./Botones";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { Button, Input, } from "reactstrap";
import ico from 'url:./img/ico.png';

const HEADERS = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

export default class Contenido extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            llista: [],
            estado: false,
            id: "",
            usuario: "",
            password: ""
        }
        this.guardarInputs = this.guardarInputs.bind(this)
        this.cargaDatos = this.cargaDatos.bind(this)
        this.validacion = this.validacion.bind(this)
        this.logout = this.logout.bind(this)
    }

    guardarInputs(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    cargaDatos() {
        
        const URL = "http://localhost:3000/api/usuarios?_where=(usuario,like," + this.state.usuario + "~)~and(password,like," + this.state.password + "~)&_fields=idusuario,usuario,password";
        const opcions = {
            method: "GET",
            headers: HEADERS,
        };

        fetch(URL, opcions)
            .then(texto => texto.json())
            .then(datos => this.setState({ llista: datos }, this.validacion))
            .catch(error => console.log("se ha producido un error: ", error));
    }

    validacion() {
        if (this.state.llista.length > 0) {
            this.setState({
                estado: true,
                usuario: this.state.llista[0].usuario,
                id: this.state.llista[0].idusuario
            }, () => console.log());
        }
    };

    logout() {
        this.setState({
            estado: false,
            id: "",
            usuario: "",
            password: ""
        })
    };

    render() {

        let header = { height: "90px", width: "100%", backgroundColor: "seagreen", padding: "20px", position: "relative" }
        let titulo = { color: "#D8ECC5", display: "inline-block", marginLeft: "20px", top: "30px", position: "absolute" }
        let input = { display: "inline-block", position: "absolute", right: "50px", top: "30px" }
        let inputs = { display: "inline-block", width: "150px", marginRight: "5px" }
        let logo = { display: "inline-block", marginTop: "-30px", height: "110px", width: "110px" }
        const boton = { width: "160px", border: "green solid 1px", backgroundColor: "#D8ECC5", color: "black" }
        let login = { marginTop: "-6px" }
        let dropdown = { display: "inline-block", position: "absolute", right: "80px", top: "30px", }

        return (
            <>
                <div className="Contenido">
                    <div className="header" style={header}>
                        <div className="logo" /><img style={logo} src={ico} />
                        <div className="Titulo" style={titulo}>
                            <h3>PROYECTO PCR</h3>
                        </div>
                        {(this.state.estado === false) ? (<>
                            <div className="input" style={input}>
                                <Input type="text" name="usuario" placeholder="Usuario" style={inputs} value={this.state.usuario} onChange={this.guardarInputs}></Input>
                                <Input type="password" name="password" placeholder="Contraseña" style={inputs} value={this.state.password} onChange={this.guardarInputs}></Input>
                                <Button color="info" onClick={this.cargaDatos} style={login}>Login</Button>
                            </div>
                        </>
                        ) :
                            <>
                                <div className="dropdown" style={dropdown}>
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" style={boton}>{this.state.usuario}</button>
                                    <div className="dropdown-menu" style={boton}>
                                        <a className="dropdown-item" >Configuración</a>
                                        <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div>
                        {(this.state.estado === false) ? (<>
                            <RegistroUsuarios />
                            <Botones />
                        </>
                        ) : <>
                                <Menu idusuario={this.state.id} />
                            </>
                        }
                    </div>

                </div>
            </>
        )
    }
}
