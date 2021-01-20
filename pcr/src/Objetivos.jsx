import React, { Component } from "react";

export default class Objetivos extends Component {
  render() {
    const { objetivos } = this.props.objetivos;

    const isModalOpened = this.props.objetivos
      ? "objetivos-visible"
      : "objetivos-invisible";
      const estilo = {
        textAlign: "justify",
        lineHeight: "2"
      }

    return (
      <section className={isModalOpened} objetivos={objetivos}>
        <div style={estilo} width="400" height="300" effect="fadeIn">
        <p>Proyecto PCR nace con el objetivo de fomentar la reutilización de residuos debido a que las zonas más contaminadas han registrado un mayor número de casos de Covid. Así, evitando el desecho de materiales e incentivando la reutilización, se reduce la quema de residuos y a su vez el impacto que esta tiene en la polución.</p>
        </div>
      </section>
    );
  }
}
