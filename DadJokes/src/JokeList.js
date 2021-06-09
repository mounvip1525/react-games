import React, { Component } from 'react'
import axios from 'axios';

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
            jokes.push(res.data.joke)
        }
        console.log(jokes);
        this.setState({ jokes : jokes })
    }
    render() {
        return (
            <div className="JokeList">
                <h1>Jokes App</h1>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(joke=>(
                        <div>{joke}</div>
                    ))}
                </div>
            </div>
        )
    }
}
