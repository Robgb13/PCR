import React from "react";
import Productos from "./Productos";
import FiltroProducto from "./FiltroProducto";

class MostrarProductos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  render() {
    
    return (
      <>
        <FiltroProducto id={this.props.id}/>
        
      </>
    )
  }
}

export default MostrarProductos;
