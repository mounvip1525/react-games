import React, { Component } from 'react'
import axios from 'axios';
import './JokeList.css';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';

export default class JokeList extends Component {
    static defaultProps = {
        numOfJokesToGet: 10
    }
    constructor(props){
        super(props);
        this.state = {
            jokes : []
        }
    }
    async componentDidMount(){
        let jokes = [];
        while(jokes.length < this.props.numOfJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com/",{
                headers:{
                    Accept:"application/json"
                }
            });
            jokes.push({text:res.data.joke,votes:0,id:uuidv4()})
        }
        console.log(jokes);
        this.setState({ jokes : jokes })
    }
    handleVote(id,delta) {
        this.setState(
            st => ({
                jokes:st.jokes.map(j => 
                    j.id === id ? {...j , votes: j.votes + delta } : j)
            })
        )
    }
    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                    <button className="JokeList-getmore">New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(joke=>(
                        <Joke 
                            key={joke.id} 
                            id={joke.id} 
                            text={joke.text} 
                            votes={joke.votes} 
                            upvote={()=> this.handleVote(joke.id,1)} 
                            downvote={()=>this.handleVote(joke.id,-1)} />
                    ))}
                </div>
            </div>
        )
    }
}
