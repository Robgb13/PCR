import React from "react";
import { Label, Form, Input} from 'reactstrap';
import InputRange from 'react-input-range';
import Productos from "./Productos";

const API_URL = "http://localhost:3000/api/productos/";

const HEADERS = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});


export default class FiltroProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            llista: [],
            producto: '',
            cantidad: '',
            tipo: '',
            value: { min: 1, max: 40 },
            buscadorNombre: "",
            buscadorCp: "",
        }
        this.cargaDatos = this.cargaDatos.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.guardarInputs = this.guardarInputs.bind(this);
    }

    guardarInputs = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    cargaDatos() {
        const opcions = {
            method: "GET",
            headers: HEADERS,
        };

        fetch(API_URL, opcions)
            .then(texto => texto.json())
            .then(datos => this.setState({ llista: datos }))
            .catch(error => console.log("se ha producido un error: ", error));
    }

    componentDidMount() {
        this.cargaDatos();
    }

    render() {
        const estiloInput = { marginTop: "20px" }
        const formulario = { position: "relative", backgroundColor: "#D8ECC5", height: "100%", width: "200px", padding: "10px", borderRight: "1px solid green", borderBottom: "1px solid green", display: "inline-block", top: "-36px" }
        const h5centrado = { textAlign: "center", }
        const tipo = { marginLeft: "20px", marginBottom: "20px" }
        const boton = { marginLeft: "45px" }
        const bloque = { backgroundColor: "#D8ECC5", width: "140px", height: "30px", marginTop: "6px" }

        console.log("soy buscador de filtros:" + this.state.buscadorNombre)

        return (
            <>
                <div className="bloque" style={bloque}></div>
                <div style={formulario} className="formulario">
                    <Form action="/my-handling-form-page" method="post">
                        <h5 style={h5centrado}>BUSCADOR DE PRODUCTOS</h5><br></br>
                        <Label for="input-nombre"><strong>Nombre</strong></Label><br />
                        <Input type="text" name="buscadorNombre" placeholder="Buscar por nombre" onChange={this.guardarInputs}></Input><br />
                        <Label for="Input-nombre"><strong>Material</strong></Label>
                        <div className="tipo" style={tipo}>
                            <Input type="checkbox" value="Tela"/>Tela<br />
                            <Input type="checkbox" value="Plástico"/>Plástico<br />
                            <Input type="checkbox" value="Madera"/>Madera<br />
                            <Input type="checkbox" value="Vidrio"/>Vidrio<br />
                            <Input type="checkbox" value="Cartón"/>Cartón<br />
                            <Input type="checkbox" value="Aluminio"/>Aluminio<br />
                            <Input type="checkbox" value="Metal"/>Metal<br />
                        </div>
                        <Label for="Input-nombre"><strong>Código Postal</strong></Label><br />
                        <Input type="text" name="buscadorCp" placeholder="Buscar por C.P." onChange={this.guardarInputs}></Input><br />
                        <Label for="Input-nombre"><strong>Cantidad</strong></Label><br /><br />
                        <InputRange style={estiloInput} minValue={1} maxValue={50} value={this.state.value} step={1} onChange={value => this.setState({ value })}>{this.state.value}</InputRange><br />

                    </Form>

                </div >


                <Productos guardaNombre={this.state.buscadorNombre} guardaCp={this.state.buscadorCp} id={this.props.id} />


            </>
        )
    }
}