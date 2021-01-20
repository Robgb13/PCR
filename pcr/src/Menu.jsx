import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import RegistroProductos from './RegistroProductos';
import QuienesSomos from "./QuienesSomos";
import Tusproductos from "./Tusproductos";
import Objetivos from "./Objetivos";
import Productos from "./Productos";
import Pedidos from "./Pedidos";
import MostrarProductos from "./MostrarProductos";
import Gestionartransacciones from "./Gestionartransacciones";
export default class Menu extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.idusuario
        }
    }    
    render() {
        const botones = { width: "20%", border: "green solid 1px", backgroundColor: "beige", color:"black" }
        
        return (
            <>
                <div >
                    <BrowserRouter >  
                            <Row >
                                <Col>
                                    <Link className="btn btn-info" style={botones} to="/">Mostrar Productos</Link>
                                    <Link className="btn btn-info" style={botones} to="/Nuevoproducto">Nuevo producto</Link>
                                    <Link className="btn btn-info" style={botones} to="/Tusproductos">Tus productos</Link>
                                    <Link className="btn btn-info" style={botones} to="/Pedidos">Pedidos</Link>
                                    <Link className="btn btn-info" style={botones} to="/Gestionartransacciones">Gestionar Transacciones</Link>
                                </Col>
                            </Row>
                            <Switch>
                                <Route exact path="/" render={() => <MostrarProductos id={this.state.id} />}/>
                                <Route path="/Nuevoproducto" render={() => <RegistroProductos id={this.state.id} />}/>
                                <Route path="/Tusproductos" render={() => <Tusproductos id={this.state.id} />}/>
                                <Route path="/Pedidos" render={() => <Pedidos id={this.state.id} />}/>
                                <Route path="/Gestionartransacciones" render={() => <Gestionartransacciones id={this.state.id} />} />
                                <Route component={Productos} />
                            </Switch>
                    </BrowserRouter>
                </div>
            </>
        )
    }
}