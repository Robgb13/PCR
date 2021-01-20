import React, { Component } from "react";

export default class QuienesSomos extends Component {
    render() {
        const quienes  = this.props.quienes;

        const isModalOpened = this.props.quienes
            ? "quienes-visible"
            : "quienes-invisible";

        let estilo = {
            fontSize: "15px",
        }

        return (
            <section className={isModalOpened} quienes={quienes} style={estilo}>
                <h5>Edwin</h5>
                <p>Presta ayuda y soporte personal. Aprovecha y apoya las ideas de los demás. Comunica y escucha claramente y fomenta el espíritu de equipo.</p>
                <h5>Edu</h5>
                <p>Establece los papeles, obligaciones y tareas de los otros, expresando el veredicto del equipo. Busca y encuentra modelos en las discusiones.</p>
                <h5>Roberto</h5>
                <p>Analiza y valora problemas. Ve las complicaciones y los inconvenientes de las distintas propuestas. Evalúa las ideas y sugerencias de los demás.</p>
                <h5>Sandra</h5>
                <p>Protege al equipo de los principales errores. Subraya la terminación de las tareas, atendiendo a todos los aspectos del trabajo.</p>
            </section>
        );
    }
}
