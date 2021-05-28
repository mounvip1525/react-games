import React, { Component } from 'react'
import './Board.css';

export default class Board extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    createBoard(){
        let board = [];
        return board
    }
    flipCellsAround(coord) {
        let { nCols,nRows } = this.props;
        let board = this.state.board;
        let [ y,x ] = coord.split("-").map(Number); 

        function flipCell(y,x) {
            if(x >= 0 && x < nCols && y >= 0 && y < nRows){
                board[y][x] = !board[y][x];
            }
        }
        this.setState({board,hasWon});
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
