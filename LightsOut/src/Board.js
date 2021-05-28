import React, { Component } from 'react'
import './Board.css';
import Cell from './Cell';

export default class Board extends Component {
    static defaultProps = {
        nRows:5,
        nCols:5,
        chanceLightStartsOn:0.25
    }
    constructor(props){
        super(props)
        this.state = {
            hasWon:false,
            board:this.createBoard()
        }
    }
    createBoard(){
        let board = [];
        for(let y=0; y < this.props.nRows; y++){
            let row = [];
            for(let x=0; x < this.props.nCols ; x++){
                row.push(Math.random() < this.props.chanceLightStartsOn)
            }
            board.push(row);
        }
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
        // this.setState({board,hasWon});
    }
    render() {
        let tableBody = [];
        for(let y=0; y < this.props.nRows; y++){
            let row = [];
            for(let x=0; x < this.props.nCols ; x++){
                let coord = `${y}-${x}`;
                row.push(<Cell key={coord} isLit={this.state.board[y][x]} />);
            }
            tableBody.push(<tr key={y}>{row}</tr>);
        }
        return (
            <div>
                <table className="Board">
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
            </div>
        )
    }
}
