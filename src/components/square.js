import React, { Component } from "react";
import { Checker } from "./checker";

export class Square extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const squareStyle = {
      position: "relative",
      width: "40px",
      height: "40px",
      border: `1px solid`,
      borderColor: "lightgray",
      backgroundColor: this.props.playable ? "black" : "red",
      color: this.props.playable ? "lightgray" : "black"
    };

    if (this.props.highlight) {
      squareStyle.borderColor = "yellow";
      squareStyle.boxShadow = "0px 0px 39px 6px rgba(240,247,32,1)";
      squareStyle.zIndex = "9999999999999";
    }

    return (
      <div
        className="square"
        style={squareStyle}
        //onMouseEnter={this.onMouseEnterHandler.bind(this)}
        onClick={this.handleOnClick.bind(this)}
      >
        {this.renderChecker()}
      </div>
    );
  }

  handleOnClick() {
    if (this.props.checker) {
      this.props.selectChecker();
    } else if (this.props.highlight) {
      this.props.moveSelectedCheckerHere();
    }
  }

  renderChecker() {
    if (this.props.checker) {
      return (
        <Checker
          isRed={this.props.checker.isRed}
          direction={this.props.checker.direction}
        />
      );
    }
  }

  onMouseEnterHandler() {
    if (this.props.playable) {
      this.props.showAdjacent();
    }
  }
}
