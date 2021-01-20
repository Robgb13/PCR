import React from "react"

export default class DescripcionInicio extends React.Component{

    render(){
        const paginaLogin = {
            position: "relative"
        }
        const imagen = {
            width: "50%",
            position: "absolute",
            top: "15em",
            marginLeft: "10px",
            border: "3px solid black",
            borderRadius: "5px"
        }
        const descripcion = {
            position: "absolute",
            top: "5em",
            left: "13em",
            margin: "2em",
        }
        const botones = {
            margin: "5px",
            border: "3px solid #19c7dd",
            borderRadius: "18px"
        }
        return(

            <div className="body" style={paginaLogin}>

            <img className="imagen" style={imagen} src="https://www.greenpeace.org/espana/Global/espana/image/other/campa-a-de-greenpeace-para-pro.jpg" alt="Imagen descripción" />

            <div className="botones" style={descripcion}>
                <button className="descripcion" style={botones}>Quiénes<br/> Somos</button>
                <button className="descripcion" style={botones}>Objetivos de <br />Nuestro Proyecto</button>

            </div>

        </div>
        )
    }
}