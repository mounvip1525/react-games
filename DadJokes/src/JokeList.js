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
            jokes : JSON.parse(window.localStorage.getItem("jokes") || "[]" ),
            loading:false
        }
        this.seenJokes = new Set(this.state.jokes.map(joke=>joke.text));
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        if(this.state.jokes.length === 0) this.getJokes();
    }
    async getJokes(){
        try{
            let jokes = [];
            while(jokes.length < this.props.numOfJokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com/",{
                    headers:{
                        Accept:"application/json"
                    }
                });
                let newJoke = res.data.joke;
                if(!this.seenJokes.has(newJoke)){
                    jokes.push({text:newJoke,votes:0,id:uuidv4()})
                } else {
                    console.log("Duplicate joke found",newJoke);
                }
            }
            // console.log(jokes);
            // this.setState({ jokes : jokes })
            this.setState(st => ({
                jokes: [...st.jokes,...jokes],
                loading:false
            }),()=> window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes)));
        } catch(e){
            alert(e);
            this.setState({loading:false})
        }
    }
    handleVote(id,delta) {
        this.setState(
            st => ({
                jokes:st.jokes.map(j => 
                    j.id === id ? {...j , votes: j.votes + delta } : j)
            })
        ,()=> window.localStorage.setItem("jokes",JSON.stringify(this.state.jokes)))
    }
    handleClick(){
        this.setState({loading:true},this.getJokes)
        // this.getJokes();
    }
    render() {
        if(this.state.loading){
            return(
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }

        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes);

        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
                    <button onClick={this.handleClick} className="JokeList-getmore">New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(joke=>(
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
