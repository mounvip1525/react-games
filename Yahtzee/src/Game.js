import React, { Component } from 'react'
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

export default class Game extends Component {
    constructor(props){
    super(props);
    this.state = {
        dice: Array.from({ length:NUM_DICE }),
        locked: Array(NUM_DICE).fill(false),
        rollsLeft: NUM_ROLLS,
        scores: {
            ones: undefined,
            twos: undefined,
            threes: undefined,
            fours: undefined,
            fives: undefined,
            sixes: undefined,
            threeOfKind: undefined,
            fourOfKind: undefined,
            fullHouse: undefined,
            smallStraight: undefined,
            largeStraight: undefined,
            yahtzee: undefined,
            chance: undefined
        }
    };
        this.roll = this.roll.bind(this);
        this.doScore = this.doScore.bind(this);
    }
    render() {
        return (
            <div className='Game'>
                <header className='Game-header'>
                    <h1 className='App-title'>Yahtzee!</h1>

                    <section className='Game-dice-section'>
                        <Dice
                            dice = {this.state.dice}
                            locked = {this.state.locked}
                            handleClick = {this.toggleLocked}
                        />
                    </section>
                </header>  
            </div>
        )
    }
}
