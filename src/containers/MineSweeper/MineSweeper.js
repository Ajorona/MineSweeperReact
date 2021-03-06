import React, { Component } from 'react';
import classes from './MineSweeper.css';
import { GameLogic } from '../../GameLogic/GameLogic';

import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Welcome from '../../components/UI/Modal/Welcome';
import Instructions from '../../components/UI/Modal/Instructions';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Board from '../../components/Board/Board';


class MineSweeper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            gameActive: false,
            col: 0,
            row: 0,
            mines: 0,
            board: null,
            initialized: false,
            gameState: 0,

            timerActive: false,
            time: 0,
            start: 0
        }
    }

    initializeGame = (event) => {
        let col, row, mines = 0;

        if (event.target.value === "Beginner") {
            col = 10;
            row = 10;
            mines = 12;
        } else if (event.target.value === "Intermediate") {
            col = 16;
            row = 16;
            mines = 40;
        } else {
            col = 16;
            row = 30;
            mines = 100;
        }

        this.setState({col: col, row: row, mines: mines, board: GameLogic.initBoard(col, row, mines)});
        this.setState({initialized: true});
    }

    tileClickHandler = (e, tileID) => {
        e.preventDefault();

        if (e.type === "click") {
            let boardAndState = GameLogic.clickTile(this.state.board, tileID);
            this.setState({board: boardAndState.board, gameState: boardAndState.gameState});
        } else if (e.type === "contextmenu") {
            this.setState({ board: GameLogic.flagTile(this.state.board, tileID)});
        }

        if (this.state.gameState === -1) {
            this.setState({timerActive: false});
        }
    }

    startTimer = () => {
        if (!this.state.timerActive) {
            this.setState({
                timerActive: true,
                time: this.state.time,
                start: Date.now()
            })

            this.timer = setInterval(() => this.setState({
                time: Math.floor((Date.now() - this.state.start)/1000)
            }), 1)    
        }
    }

    stopTimer = () => {
        clearInterval(this.timer);
    }

    resetTimer = () => {
        this.setState({time: 0, timerActive: false});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({gameActive: true, showModal: false});
    }

    openModalHandler = () => {
        this.setState({showModal: true});
    }

    closeModalHandler = () => {
        this.setState({showModal: false});
    }

    backdropHandler = () => {
        this.setState({modalOpen: false });
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.gameState === -1) {
            this.stopTimer();
        }
    }

    resetGame = () => {
        this.setState({
            showModal: false,
            gameActive: false,
            col: 0,
            row: 0,
            mines: 0,
            board: null,
            initialized: false,
            gameState: 0,

            timerActive: false,
            time: 0,
            start: 0
        })

    }

    render() {
        let backdrop;
        let modalChild;
        let showModal;
        let grid;

        if (!this.state.gameActive) {
            showModal = true;
            backdrop = <Backdrop click={null} />
            modalChild = <Welcome
                                    activate = {this.onActivate}
                                    initializeGame = {this.initializeGame}
                                    handleSubmit = {this.handleSubmit}
                                    ignorable={false}
                                  />
        } else {
            backdrop = <Backdrop click={this.backdropClickHandler} />
            modalChild = <Instructions ignorable={true} />
        }

        if (!showModal) {
            backdrop = null;
        }

        return (
            <Aux>
                <div>
                    { backdrop }
                    <Modal show={showModal} close={this.closeModalHandler}>
                        { modalChild }
                    </Modal>
                </div>

                <div className="container">
                    <div>
                        <div className="row justify-content-center mt-2 mb-0">
                            <h1 className="blog-header-logo text-dark text-center font-weigth-bold">MineSweeper</h1>
                        </div>
                        <hr className="mx-auto m-0" style={{maxWidth: '500px'}}/>

                        <div className={`row justify-content-center ${classes.Bar}`}>

                            <div className={classes.TimeBox}>
                                <h6 className={classes.TimeLabel}>timer</h6>
                                <span className={classes.Timer}>{this.state.time}</span>
                            </div>
                        
                        
                            <button className={classes.ResetBtn} onClick={this.resetGame}>reset</button>
                        </div>
                    </div>

                    <div className="card" style={{border: 'none'}}>
                        <div className="card-body mx-auto" onClick={this.startTimer}>
                            {(this.state.initialized) && <Board board={this.state.board}
                                                               tileClickHandler={this.tileClickHandler}
                                                               row={this.state.row} col={this.state.col} /> }
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default MineSweeper;
