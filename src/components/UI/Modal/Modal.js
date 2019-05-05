import React from 'react';
import classes from './Modal.css';

import Aux from '../../../hoc/Aux/Aux';

const Modal = (props) => {
    let closeButton = <div></div>;
    let modalClasses = `${classes.Modal}`;
    if (props.show) {
        modalClasses =  `${classes.Modal} ${classes.Open}`;
    }

    if (props.ignorable) {
        closeButton = <button className={classes.CloseButton} type="button" onClick={props.close}>&times;</button>;
    }

    return (
        <Aux>
            <div className={modalClasses}>
                <div className="pb-4">
                    <h1 className={classes.Title}>Mine Sweeper</h1>
                    {closeButton}
                </div>
                <div className="row">
                    {props.children}
                </div>
            </div>
        </Aux>
    );
};

export default Modal;
