import React, { Component } from 'react'
import './Die.css'
export default class Die extends Component {
    render() {
        return (
            <button
                className={"Die"}
                style={{backgroundColor:this.props.locked ? "grey" : "black" }} 
                onClick={this.props.handleClick}
            > 
                {this.props.val}
            </button>
        )
    }
}
