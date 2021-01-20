import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Madera from 'url:./img/madera.jpg';
import Aluminio from 'url:./img/aluminio.jpg';
import Carton from 'url:./img/carton.jpg';
import Vidrio from 'url:./img/vidrio.jpg';
import Metal from 'url:./img/metal.jpg';
import Plastico from 'url:./img/plastico.jpg';
import Tela from 'url:./img/tela.jpg';


const HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});


export default class Productosid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      llista: [],
      producto: '',
      cantidad: '',
      tipo: '',
      id: this.props.id
    }
    this.cargaDatos = this.cargaDatos.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getTipoUrl = this.getTipoUrl.bind(this);
  }

  getTipoUrl(tipo) {
    switch (tipo) {
      case 'Madera':
        return Madera;
        break;
      case 'madera':
        return Madera;
        break;
      case 'Metal':
        return Metal;
        break;
      case 'metal':
        return Metal;
        break;
      case 'Cartón':
        return Carton;
        break;
      case 'cartón':
        return Carton;
        break;
      case 'Plástico':
        return Plastico;
        break;
      case 'plástico':
        return Plastico;
        break;
      case 'Aluminio':
        return Aluminio;
        break;
      case 'aluminio':
        return Aluminio;
        break;
      case 'Tela':
        return Tela;
        break;
      case 'tela':
        return Tela;
        break;
      case 'Vidrio':
        return Vidrio;
        break;
      case 'vidrio':
        return Vidrio;
        break;
    }
  }

  cargaDatos() {

  const API_URL = "http://localhost:3000/api/productos?_where=(idusuario,like," + this.state.id + "~)&_fields=producto,cantidad,tipo,descripcion,codigopostal";
  const opcions = {
      method: "GET",
      headers: HEADERS,
    };
    fetch(API_URL, opcions)
      .then(texto => texto.json())
      .then(datos => this.setState({ llista: datos }, console.log("soy de productos id:" + this.state.llista)))
      .catch(error => console.log("se ha producido un error: ", error));
  }
  componentDidMount() {
    this.cargaDatos();
  }

  render() {
    const marco = { backgroundColor: "#D8ECC5", borderRadius: "10px", width: "200px", display: "inline-block", marginLeft: "20px" }
    const inline = { display: "inline-block", position: "absolute", marginTop: "20px", marginLeft: "70px" }
    const imagen = { height: "180px", width: "180px" }
    const filas = this.state.llista.map((el, i) => (
      <div style={marco}>
        <tr key={i}>
          <td><img style={imagen} src={this.getTipoUrl(el.tipo)} /></td>
        </tr>
        <tr>
          <td>Producto: {el.producto}</td>
        </tr>
        <tr>
          <td>Cantidad: {el.cantidad}</td>
        </tr>
        <tr>
          <td>Tipo: {el.tipo}</td>
        </tr>
      </div>
    ));
    return (
      <div style={inline}>
        <Table>
          {filas}
        </Table>
      </div>
    )
  }
}

