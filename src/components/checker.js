import React, { Component } from "react";

export class Checker extends Component {
  render() {
    const checkerStyle = {
      borderRadius: "50%",
      position: "absolute",
      height: "26px",
      width: "26px",
      backgroundColor: this.props.isRed ? "red" : "black",
      border: "2px solid lightgray",
      top: "4px",
      left: "4px"
    };
    return <div style={checkerStyle} />;
  }
}
