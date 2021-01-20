import React from "react";
import { Form, Input, FormGroup, Col, Row, Button } from 'reactstrap';

const API_URL_USUARIOS = "http://localhost:3000/api/usuarios";

const HEADERS = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

export default class RegistroUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            usuario: '',
            password: '',
            correo: '',
            nombreEmpresa: '',
            codigoPostal: '',
            direccion: '',
        }
        this.guardarInputs = this.guardarInputs.bind(this);
        this.desarEmpresas = this.desarEmpresas.bind(this);
    }

    guardarInputs = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    desarUsuarios() {
        const usuario = {
            id: this.state.id,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            usuario: this.state.usuario,
            password: this.state.password,
            correo: this.state.correo
        };
        const opcions = {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(usuario)
        };

        const desarURL = API_URL_USUARIOS;

        fetch(desarURL, opcions)
            .then(respuesta => respuesta.json())
            .then(ddd => console.log(ddd))
            .then(() => this.setState({
                nombre: '',
                apellido: '',
                usuario: '',
                password: '',
                correo: '',
            }))
            .catch(error => console.log("se ha producido un error: ", error));
    }

     desarEmpresas() {
         const usuario = {
             idusuario: this.state.id,
             nombreEmpresa: this.state.nombreEmpresa,
             codigoPostal: this.state.codigoPostal,
             direccion: this.state.direccion
         };
         console.log(this.state.nombreEmpresa);
         const opcions = {
             method: "POST",
             headers: HEADERS,
             body: JSON.stringify(usuario)
         };

         const desarURL = API_URL_EMPRESAS;

         fetch(desarURL, opcions)
             .then(respuesta => respuesta.json())
             .then(ddd => console.log(ddd))
             .then(() => this.setState({
                 nombreEmpresa: '',
                 codigoPostal: '',
                 direccion: '',
             }))
             .catch(error => console.log("se ha producido un error: ", error));
     }


    render() {
        const marco = {
            top: "15px",
            backgroundColor: "#D8ECC5",
            position: "relative",
            height: "550px",
            width: "440px",
            left: "800px",
            display: "inline-block",
        }
        const estiloUsuario = {
            position: "absolute",
            width: "400px",
            marginTop: "80px",
            left: "20px",

        }
        const registrate = {
            position: "absolute",
            left: "125px",
        }
        const inputEmpresa = {
            width: "200px"
        }
        const estiloEmpresa = {
            position: "absolute",
            top: "390px",
            left: "20px",
            width: "400px",
        }
        const boton = {
            position: "absolute",
            bottom: "15px",
            marginLeft: "10px",
            zIndex: "1"
        }
        return (
            <>
                <div className="marco" style={marco}>
                    <div className="registrate" style={registrate}><h1>Regístrate</h1></div>
                    <Form className="registroUsuario" style={estiloUsuario}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input type="text" placeholder="Nombre" name="nombre" value={this.state.nombre} onChange={this.guardarInputs} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Input type="text" placeholder="Apellidos" name="apellido" value={this.state.apellido} onChange={this.guardarInputs} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Input type="text" placeholder="Usuario" name="usuario" value={this.state.usuario} onChange={this.guardarInputs} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="email" placeholder="Correo electrónico" name="correo" value={this.state.correo} onChange={this.guardarInputs} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.guardarInputs} />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" placeholder="Repita la contraseña" />
                        </FormGroup>
                        <FormGroup check>
                            <Input type="checkbox"/>¿Eres una empresa?
                        </FormGroup>
                    </Form>
                    <Form className="registroEmpresa" style={estiloEmpresa}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Input style={inputEmpresa} type="text" placeholder="Nombre de la empresa" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Input type="text" placeholder="Código Postal" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Input type="text" placeholder="Introduzca la dirección de la empresa" />
                        </FormGroup>
                    </Form>

                    <Button style={boton} onClick={this.desarUsuarios, this.desarEmpresas}>Enviar</Button>


                </div>

            </>

        )
    }
}