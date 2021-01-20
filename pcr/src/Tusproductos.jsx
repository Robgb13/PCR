import React from "react";
import Productosid from "./Productosid";

export default class Tusproductos extends React.Component {
    
  constructor(props) {
      super(props);
      this.state = {
          id: this.props.idusuario
      }
  }    
  render() {
      return (
          <>
              <Productosid id={this.props.id}/>
          </>
      )
  }
}
