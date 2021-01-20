import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import Madera from 'url:./img/madera.jpg';
import Aluminio from 'url:./img/aluminio.jpg';
import Carton from 'url:./img/carton.jpg';
import Vidrio from 'url:./img/vidrio.jpg';
import Metal from 'url:./img/metal.jpg';
import Plastico from 'url:./img/plastico.jpg';
import Tela from 'url:./img/tela.jpg';

const API_URL = "http://localhost:3000/api/productos/";

const HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});


export default class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaFiltrada: [],
      llista: [],
      producto: '',
      cantidad: '',
      tipo: '',
      descripcion: '',
      codigopostal: '',
      inputNombre: '',
      inputCP: '',
      cantidadpedido: '',
      idusuario : this.props.id,
      idproducto : '',
    }
    this.cargaDatos = this.cargaDatos.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.muestra = this.muestra.bind(this);
    this.getTipoUrl = this.getTipoUrl.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.pedir = this.pedir.bind(this);

  }

  pedir(){
    const API_URL2 = "http://localhost:3000/api/transacciones";

    const pedido = {
      idproducto: this.state.idproducto,
      cantidad: this.state.cantidadpedido,
      estado: "espera",
      idusuario: this.state.idusuario,
  };
  const opcions = {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(pedido)
  };

  fetch(API_URL2, opcions)
      .then(respuesta => respuesta.json())
      .catch(error => console.log("se ha producido un error: ", error));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
        [name]: value
    });
    console.log(this.state.cantidad);
}
  muestra(info) {
    console.log("mostrando info: ", info.producto);
    this.setState({
      cantidad: info.cantidad,
      tipo: info.tipo,
      producto: info.producto,
      codigopostal: info.codigopostal,
      descripcion: info.descripcion,
      cantidadpedido: info.cantidad,
      idproducto: info.idproducto,
    })
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
    const marco = { backgroundColor: "#D8ECC5", borderRadius: "10px", width: "200px", display: "inline-block", marginLeft: "20px" }
    const inline = { display: "inline-block", position: "absolute", marginLeft: "70px" }
    const imagen = { height: "180px", width: "180px" }
    const ver = { width: "200px", backgroundColor: "seagreen" }
    let inputNombre = this.props.guardaNombre;
    let inputCp = this.props.guardaCp;
    const input = {width: "20%"}


    const filas = this.state.llista
      .filter(el => inputNombre === "" || el.producto.toString().toLowerCase().indexOf(inputNombre.toString().toLowerCase()) > -1)
      .filter(el => inputCp === "" || el.codigopostal.toString().toLowerCase().indexOf(inputCp.toString().toLowerCase()) > -1)
      .map((el, i) => (
        <div style={marco} data-toggle="modal">
          <tr key={i}>
            <td><img style={imagen} src={this.getTipoUrl(el.tipo)}/></td>
          </tr>
          <tr>
            <td>Producto: {el.producto}</td>
          </tr>
          <tr>
            <td>Cantidad: {el.cantidad}</td>
          </tr>
          <tr><button type="button" onClick={() => this.muestra(el)} class="btn btn-info" data-toggle="modal" data-target="#myModal" style={ver}>Ver</button></tr>

          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">{this.state.producto}</h4>
                </div>
                <div class="modal-body">
                  <img style={imagen} src={this.getTipoUrl(this.state.tipo)}/>
                  <p>Cantidad: {this.state.cantidad}</p>
                  <p>Tipo: {this.state.tipo}</p>
                  <p>Código postal: {this.state.codigopostal}</p>
                  <p>Descripción: {this.state.descripcion}</p>
                </div>
                <div class="modal-footer">
                  <p>Cantidad</p>
                  <Input style={input} type="number" name="cantidadpedido" value={this.state.cantidadpedido} min="1" max={this.state.cantidad} onChange={this.handleInputChange}></Input>
                  <button type="button" class="btn btn-success" data-dismiss="modal" onClick={this.pedir}>Pedir</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
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