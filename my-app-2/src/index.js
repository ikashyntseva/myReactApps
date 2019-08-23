import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
  isWinner: false,
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  handleClick(i) {
    const squares = this.state.squares.slice()
    if (this.state.isWinner || squares[i]) {
      return
    } else {
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
        squares,
        xIsNext: !this.state.xIsNext,
      })

      if (this.calculateWinner(squares)) {
        this.setState({ isWinner: true })
      }
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  isDisabled() {
    return this.state.squares.every(square => square === null)
  }

  resetBoard() {
    this.setState(initialState)
  }

  render() {
    const status = this.state.isWinner
      ? `Winner: ${this.state.xIsNext ? 'O' : 'X'}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <Reset disabled={this.isDisabled()} onClick={this.resetBoard} />
      </div>
    )
  }
}

class Reset extends Component {
  render() {
    return (
      <button
        className="btn-reset"
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        Reset
      </button>
    )
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))
