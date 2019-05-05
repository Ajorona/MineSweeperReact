import React from 'react';

import classes from './Modal.css';

const Instructions = () => (
    <div>
        <h2 className="text-center">Instructions</h2>
        <hr className="display 4"/>
        <h6 className="text-center">NOTE: Google limits the active number of map layers to 5.</h6>
        <p className={classes.Instructions}>
            Minesweeper Instructions
        </p>
    </div>
)

export default Instructions;
