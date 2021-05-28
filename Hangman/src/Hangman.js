import React, { Component } from 'react';
import './Hangman.css';
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
            answer: "apple"
        }
        this.handleGuess = this.handleGuess.bind(this);
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
            nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1)
        }));
    }
    generateBtns(){
        return "qwertyuiopasdfghjklzxcvbnm".split("").map(letter=>(
            <button 
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}
            >{letter}
            </button>
        ));
    }
    render() {
        return (
            <div className="Hangman">
                <img src={this.props.images[this.state.nWrong]} />
                <h1>Let&#39;s play a game of Hangman</h1>
                <p className='Hangman-word'>{this.guessedWord()}</p>
                <p className='Hangman-btns'>{this.generateBtns()}</p>
            </div>
        )
    }
}
