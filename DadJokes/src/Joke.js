import React, { Component } from 'react'

export default class Joke extends Component {
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" />
                   <span>{this.props.votes}</span>
                   <i className="fas fa-arrow-down" /> 
                </div>
                <div className="JokeText">
                    {this.props.text}
                </div>
                
            </div>
        )
    }
}
