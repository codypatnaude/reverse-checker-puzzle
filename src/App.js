import React, { Component } from "react";
import "./App.css";
import { Board } from "./components/board";

class App extends Component {
  render() {
    return <Board boardHeight="8" boardWidth="8" />;
  }
}

export default App;
