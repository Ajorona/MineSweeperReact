import React from 'react';
import classes from './Tile.css';

const tileSym= {
	blank     : '?',
	mine      : '*',
	uncovered : '-',
	flagged   : 'F'
}

const Tile = (props) => {

	let visible = props.tile.visible;
	let displayChar = '?';

	if (visible && !props.tile.mine) {
		displayChar = props.tile.neighbors;
	} else if (visible && props.tile.mine) {
		displayChar = '*';
	}

	return (<td className={classes.Tile}>
				<input
							 id={props.tile.key}
				       onClick={(e) => props.tileClickHandler(e, props.tile.key)}
				       onContextMenu={(e) => props.tileClickHandler(e, props.tile.key)}
				       type='button' value={displayChar}
				/>
			</td>);
}

export default Tile;
