import React from "react"
import { Button, Label, Input, Alert } from 'reactstrap';

const API_URL = "http://localhost:3000/api/productos";

const HEADERS = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

export default class RegistroProductos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            producto: '',
            tipo: '',
            cantidad: '',
            descripcion: '',
            codigoPostal: '',
            id: this.props.id,
            enviado: false
        }
        this.desar = this.desar.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    desar() {
        this.setState({
            enviado: true
        })

        const producto = {
            producto: this.state.producto,
            tipo: this.state.tipo,
            cantidad: this.state.cantidad,
            descripcion: this.state.descripcion,
            codigoPostal: this.state.codigoPostal,
            idusuario: this.state.id,
        };
        const opcions = {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(producto)
        };

        const desarURL = API_URL;

        fetch(desarURL, opcions)
            .then(respuesta => respuesta.json())
            .then(ddd => console.log(ddd))
            .then(() => this.setState({
                producto: '',
                tipo: '',
                cantidad: '',
                descripcion: '',
                codigoPostal: '',
            }))
            .catch(error => console.log("se ha producido un error: ", error));
    }


    render() {
        const marco = { backgroundColor: "#D8ECC5", height: "475px", width: "440px", margin: "auto", marginTop: "50px" }
        const registro = { width: "400px", top: "30px", margin: "auto" }
        const butt = { marginTop: "20px" }
        const feedback = {position: "absolute", marginTop: "250px", margin: "auto"}



        return (
            <div className="marco" style={marco}>
                <div className="registro" style={registro}>
                    <h1>Registra el producto</h1>
                    <Label>Nombre del producto:</Label>
                    <Input type="text" placeholder="Producto" name="producto" value={this.state.producto} onChange={this.handleInputChange}></Input>
                    <Label>Tipo</Label>
                    <Input type="select" name="select" id="tipo" name="tipo" value={this.state.tipo} onChange={this.handleInputChange}>
                        <option >Tela</option>
                        <option >Vidrio</option>
                        <option >Plástico</option>
                        <option >Cartón</option>
                        <option >Madera</option> 
                        <option >Aluminio</option>
                        <option >Metal</option>
                    </Input>
                    <Label>Cantidad</Label>
                    <Input type="number" placeholder="0" name="cantidad" value={this.state.cantidad} onChange={this.handleInputChange}></Input>
                    <Label>Descripción</Label>
                    <Input type="text" placeholder="Descripción" name="descripcion" value={this.state.descripcion} onChange={this.handleInputChange}></Input>
                    <Label>Código postal</Label>
                    <Input type="number" placeholder="C.P." name="codigoPostal" value={this.state.codigoPostal} onChange={this.handleInputChange}></Input>
                    <Button style={butt} onClick={this.desar}>Enviar</Button>
                    {(this.state.enviado === true) ? (<>
                        <Alert>Tu producto se ha registrado correctamente</Alert>
                        </>
                        ) : <>
                                
                            </>
                        }
               
                </div>
            </div>

        )
    }
}
