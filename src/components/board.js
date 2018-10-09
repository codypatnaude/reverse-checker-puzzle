import React, { Component } from "react";
import { Square } from "./square";
import { cloneDeep } from "lodash";

export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.constructBoard(props.boardHeight, props.boardWidth),
      won: false
    };
  }

  render() {
    const boardStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${this.props.boardWidth}, 40px)`
    };
    return (
      <div>
        <h4>Won? {this.state.won.toString()}</h4>
        <div className="board" style={boardStyle}>
          {this.state.board.map((pos, index) => (
            <Square
              key={index}
              x={pos.x}
              y={pos.y}
              playable={pos.playable}
              highlight={pos.highlight}
              showAdjacent={this.highlighAdjacent(pos.x, pos.y)}
              selectChecker={this.selectCheckerFactory(pos.x, pos.y)}
              moveSelectedCheckerHere={this.moveSelectedCheckerFactory(
                pos.x,
                pos.y
              )}
              checker={pos.checker}
            />
          ))}
        </div>
      </div>
    );
  }

  constructBoard(height, width) {
    console.log("creating board");

    const board = [];
    let colorSelector = 0;
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const boardPosition = {
          x: col,
          y: row,
          playable: !!colorSelector,
          highlight: false
        };

        if (row < 2 && boardPosition.playable) {
          console.log("down");
          boardPosition.checker = {
            isRed: true,
            isKing: false,
            direction: "down"
          };
        } else if (row > 5 && boardPosition.playable) {
          boardPosition.checker = {
            isRed: false,
            isKing: false,
            direction: "up"
          };
        }
        board.push(boardPosition);
        colorSelector = Math.abs(colorSelector) - 1;
      }
      colorSelector = Math.abs(colorSelector) - 1;
    }

    return board;
  }

  checkWinState() {
    let won = true;
    this.state.board.map(square => {
      if (square.checker && square.checker.isRed && square.y < 6) {
        won = false;
      }

      if (square.checker && !square.checker.isRed && square.y > 1) {
        won = false;
      }
    });

    this.setState({ won });
  }

  highlighAdjacent(x, y) {
    return () => {
      //copy the board
      const newBoard = this.state.board.map(elem => {
        const pos = Object.assign(elem);
        let highlight = false;
        if (
          (pos.x === x - 1 || pos.x === x + 1) &&
          (pos.y === y - 1 || pos.y === y + 1)
        ) {
          highlight = true;
        }
        pos.highlight = highlight;
        return pos;
      });

      this.setState({ board: newBoard });
    };
  }

  moveSelectedCheckerFactory(x, y) {
    return () => {
      if (!this.state.selectedBoardPosition) {
        return;
      }

      const board = cloneDeep(this.state.board);

      const target = board.find(pos => pos.y === y && pos.x === x);
      target.checker = this.state.selectedBoardPosition.checker;
      const source = board.find(
        pos =>
          pos.y === this.state.selectedBoardPosition.y &&
          pos.x === this.state.selectedBoardPosition.x
      );
      delete source.checker;

      board.map(square => (square.highlight = false));

      this.setState({ board, selectedBoardPosition: null });
      this.checkWinState();
    };
  }

  selectCheckerFactory(x, y) {
    return () => {
      const board = cloneDeep(this.state.board);

      const selected = board.find(pos => pos.x === x && pos.y === y);

      console.log(selected);
      if (!selected.checker) {
        console.error("There's no checker there");
        return;
      }

      board.map(pos => {
        pos.highlight = false;
        if (selected.checker.direction === "up") {
          if (
            pos.y === selected.y - 1 &&
            (pos.x === selected.x - 1 || pos.x === selected.x + 1)
          ) {
            pos.highlight = true;
          }
        } else if (selected.checker.direction === "down") {
          if (
            pos.y === selected.y + 1 &&
            (pos.x === selected.x - 1 || pos.x === selected.x + 1)
          ) {
            pos.highlight = true;
          }
        }
      });

      this.setState({ board, selectedBoardPosition: selected });
    };
  }
}
