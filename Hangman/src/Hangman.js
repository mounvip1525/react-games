import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words';
import img0 from './assets/img0.png';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import img7 from './assets/img7.png';

export default class Hangman extends Component {
    static defaultProps = {
        maxWrong: 7,
        images: [img0 , img1 , img2 , img3 , img4 , img5 , img6 , img7 ]
    };
    constructor(props){
        super(props);
        this.state = {
            nWrong:0,
            guessed: new Set(),
            answer: randomWord(),
            title:"Let's play a game of Hangman"
        }
        this.handleGuess = this.handleGuess.bind(this);
        this.reset=this.reset.bind(this);
    }
    reset(){
        this.setState({
            nWrong:0,
            guessed:new Set(),
            answer:randomWord(),
            title:"Let's play a game of Hangman"
        })
    }
    guessedWord(){
        return this.state.answer.split("").map(letter=>(
            this.state.guessed.has(letter) ? letter : "_" 
        ));
    }
    handleGuess(e){
        let letter = e.target.value;
        this.setState(st=>({
            guessed: st.guessed.add(letter),
            nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1),
            title:st.nWrong+1 < this.props.maxWrong ? `Wrong Guesses:${st.nWrong+1}` : "You loose",
        }));
    }
    generateBtns(){
        return "qwertyuiopasdfghjklzxcvbnm".split("").map(letter=>(
            <button 
                key = {letter}
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >{letter}
            </button>
        ));
    }
    render() {
        let gameOver = this.state.nWrong >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        let gameState = this.generateBtns();
        if(isWinner) gameState = "You Win!";
        if (gameOver) gameState = "You Loose:(";
        return (
            <div className="Hangman">
                <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}/${this.state.maxWrong} wrong guesses`}/>
                <h1>{this.state.title}</h1>
                <p className='Hangman-word'>{!gameOver ? this.guessedWord() : this.state.answer}</p>
                <p className='Hangman-btns'>{gameState}</p>
                <button onClick={this.reset} id="reset">Restart</button>
            </div>
        )
    }
}
