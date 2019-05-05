import React from 'react';
import classes from './Tile.css';

import flag from '../../assets/images/flag.svg';
import mine from '../../assets/images/mine.svg';


const Tile = (props) => {
	let tile = props.tile;
	let tileElem = null;
	let display = '?';

	if (tile.visible) {
		if (tile.mine) {
			display = '*';
		} else if (tile.neighbors > 0) {
			display = tile.neighbors;
		} else {
			display = ' ';
		}
	} else {
		if (tile.flagged) {
			display = 'F';
		}
	}

	if (display === '*' || display === 'F') {
		tileElem =  <input id={props.tile.key}
						   className={tile.flagged ? classes.Flag : classes.Mine}
				           onClick={(e) => props.tileClickHandler(e, props.tile.key)}
				           onContextMenu={(e) => props.tileClickHandler(e, props.tile.key)}
				           type='button' value=' '
				    />
	} else {
		tileElem =  <input id={props.tile.key}
						   className={classes.Input}
				           onClick={(e) => props.tileClickHandler(e, props.tile.key)}
				           onContextMenu={(e) => props.tileClickHandler(e, props.tile.key)}
				           type='button' value={display}
				    />
	}

	return (<td className={`${classes.Tile} ${props.tile.clicked ? classes.Clicked : classes.Unclicked}`}>{tileElem}</td>);
}

export default Tile;