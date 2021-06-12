import React, { Component } from 'react'
import './Joke.css'

export default class Joke extends Component {
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <i className="fas fa-arrow-up" onClick={this.props.upvote}/>
                   <span className="Joke-votes"><div>{this.props.votes}</div></span>
                   <i className="fas fa-arrow-down" onClick={this.props.downvote}/> 
                </div>
                <div className="Joke-text">
                    {this.props.text}
                </div>
                <div className="Joke-smiley">
                    <i class="em em-zany_face" aria-role="presentation" aria-label="GRINNING FACE WITH ONE LARGE AND ONE SMALL EYE"></i>
                </div>
            </div>
        )
    }
}
