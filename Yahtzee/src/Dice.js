import React, { Component } from 'react'
import './Dice.css'
import Die from './Die';

export default class Dice extends Component {
    render() {
        return (
            <div className='Dice'>
                {this.props.dice.map((id,idx) =>
                    <Die 
                        handleClick={this.props.handleClick}
                        val={id}
                        locked={this.props.locked[idx]}
                        idx={idx}
                        key={idx} 
                        disabled={this.props.disabled} />
                )}
            </div>
        )
    }
}
