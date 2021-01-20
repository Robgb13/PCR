import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import Madera from 'url:./img/madera.jpg';
import Aluminio from 'url:./img/aluminio.jpg';
import Carton from 'url:./img/carton.jpg';
import Vidrio from 'url:./img/vidrio.jpg';
import Metal from 'url:./img/metal.jpg';
import Plastico from 'url:./img/plastico.jpg';
import Tela from 'url:./img/tela.jpg';

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
      estado:'',
      idtransacciones:'',
    }
    this.cargaDatos = this.cargaDatos.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.muestra = this.muestra.bind(this);
    this.getTipoUrl = this.getTipoUrl.bind(this);
    

  }
  muestra(info) {
    console.log("mostrando info: ", info.producto);
    this.setState({
      cantidad: info.tr_cantidad,
      tipo: info.pr_tipo,
      producto: info.pr_producto,
      codigopostal: info.pr_codigopostal,
      descripcion: info.pr_descripcion,
      idproducto: info.idproducto,
      estado: info.tr_estado,
      idtransaccion: info.tr_idtransaccion,
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

    const API_URL = "http://localhost:3000/api/xjoin?_join=tr.transacciones,_j,pr.productos&_on1=(tr.idproducto,eq,pr.idproducto)&_fields=tr.cantidad,tr.idtransacciones,pr.tipo,tr.estado,pr.descripcion,pr.codigopostal,pr.producto&_where=(tr.idusuario,like,"+this.state.idusuario+"~)";

    const HEADERS = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
    });
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
    const input = {width: "20%"}


    const filas = this.state.llista.map((el, i) => (
        <div style={marco} data-toggle="modal">
          <tr key={i}>
            <td><img style={imagen} src={this.getTipoUrl(el.pr_tipo)}/></td>
          </tr>
          <tr>
            <td>Producto: {el.pr_producto}</td>
          </tr>
          <tr>
            <td>Cantidad: {el.tr_cantidad}</td>
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
                  <p>Estado: {this.state.estado}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-success" data-dismiss="modal">Eliminar</button>
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