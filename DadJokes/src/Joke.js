import React, { Component } from 'react'
import './Joke.css'

export default class Joke extends Component {
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}/>
                   <span>{this.props.votes}</span>
                   <i className="fas fa-arrow-down" onClick={this.props.downvote}/> 
                </div>
                <div className="JokeText">
                    {this.props.text}
                </div>
                
            </div>
        )
    }
}
