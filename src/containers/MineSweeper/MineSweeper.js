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
            // Determine what has been clicked
            this.setState({ board: GameLogic.clickTile(this.state.board, tileID)});
        } else if (e.type === "contextmenu") {
            this.setState({ board: GameLogic.flagTile(this.state.board, tileID)});
        }
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
                            <h1 className="blog-header-logo text-dark text-center font-weight-bold">MineSweeper</h1>
                        </div>
                        <hr className="mx-auto m-0" style={{maxWidth: '500px'}}/>
                        <div className="row justify-content-center">
                            <h4>ScoreBoard
                            </h4>
                        </div>
                    </div>

                    <div className="card" style={{border: 'none'}}>
                        <div className="card-body mx-auto">
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
