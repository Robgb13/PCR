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
      correo:'',
    }
    this.cargaDatos = this.cargaDatos.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.muestra = this.muestra.bind(this);
    this.getTipoUrl = this.getTipoUrl.bind(this);
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
  muestra(info) {
    console.log("mostrando info: ", info.producto);
    this.setState({
      cantidad: info.tr_cantidad,
      tipo: info.pr_tipo,
      producto: info.pr_producto,     
      descripcion: info.pr_descripcion,
      idproducto: info.idproducto,
      estado: info.tr_estado,
      idtransacciones: info.tr_idtransacciones,
      correo: info.us_correo,
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

    const API_URL = "http://localhost:3000/api/xjoin?_join=tr.transacciones,_j,pr.productos,_j,us.usuarios&_on1=(pr.idusuario,eq,tr.idusuario)&_on2=(pr.idusuario,eq,us.idusuario)&_fields=us.correo,pr.producto,pr.tipo,pr.cantidad,pr.descripcion,tr.cantidad,tr.estado&_where=(tr.idusuario,like,"+this.state.idusuario+"~)";

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
    const marco = { backgroundColor: "#D8ECC5", borderRadius: "10px", width: "34%", display: "inline-block", marginLeft: "20px" ,marginTop:"15px"}
    const inline = { display: "inline-block", position: "absolute", marginLeft: "70px" }
    const imagen = { height: "180px", width: "180px" }
    const verpedido = { float: "right" }
    const input = {width: "20%"}


    const filas = this.state.llista.map((el, i) => (
        <div style={marco} >
          <tr key={i}>
            <td><p>Producto: {el.pr_producto}</p></td><td><p>Cantidad total: {el.pr_cantidad}</p></td><td><p>Pedido: {el.tr_cantidad}</p></td><td><p>Estado: {el.tr_estado}</p></td>
            <td><button style={verpedido} type="button" onClick={() => this.muestra(el)} class="btn btn-info" data-toggle="modal" data-target="#myModal">Ver pedido</button></td>
          </tr>

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
                  <p>Descripción: {this.state.descripcion}</p>
                  <p>Estado: {this.state.estado}</p>
                  <p>Correo: {this.state.correo}</p>
                </div>
                <div class="modal-footer">
                    <Input type="select" name="select" id="estado" name="estado" value={this.state.estado} onChange={this.handleInputChange}>
                        <option >Aceptar</option>
                        <option >Espera</option>
                        <option >Rechazar</option>
                    </Input>
                    <button type="button" class="btn btn-success" data-dismiss="modal">Aplicar</button>
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