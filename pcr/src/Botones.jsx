import React, { Component } from "react";
import ReactDOM from "react-dom";
import Objetivos from "./Objetivos";
import QuienesSomos from "./QuienesSomos";
import {Button} from "reactstrap";
import facebook from 'url:./img/facebook.png';
import twitter from 'url:./img/twitter.png';
import instagram from 'url:./img/instagram.png';
import "./styles.css";

export default class Botones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quienes: false,
            objetivos: false
        };
    }

    toggleObjetivos() {
        this.setState({
            objetivos: !this.state.objetivos
        });
    }
    toggleQuienes(){
        this.setState({
            quienes: !this.state.quienes
        })
    }

    render() {
        const { quienes, objetivos } = this.state;
        let estilo = {
            position: "absolute",
            width: "400px",
            height: "500px",
            top: "145px",
            marginLeft: "180px",
            textAlign: "center"
        }
        let botones = {
            position: "relative",
            marginBottom: "10px"
        }
        let icons = {
            height: "30px",
            width: "30px",
            marginLeft: "15px"
        }
        let container = {
            position: "relative",
            marginLeft: "15px",
            top: "-65px"
        }
        let parrafo = {
            marginLeft: "15px"
        }

        return (
            <><div style={estilo}>
                <section>
                    <Button color="info" style={botones} onClick={() => this.toggleObjetivos()}>Objetivos</Button>
                    <Objetivos objetivos={this.state.objetivos} />
                </section>
                <section>
                    <Button color="info" style={botones} onClick={() => this.toggleQuienes()}>Quiénes somos</Button>
                    <QuienesSomos quienes={this.state.quienes} />
                </section>
                </div>
                <div style={container}>
                    <p style={parrafo}>Síguenos</p>
                    <img style={icons} src={instagram}></img>
                    <img style={icons} src={twitter}></img>
                    <img style={icons} src={facebook}></img>
                </div>
            </>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Botones />, rootElement);
