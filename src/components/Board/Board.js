import React from 'react';
import classes from './Board.css';

import Tile from '../Tile/Tile';


const Board = (props) => {
		const tiles = props.board.map((rawTile) => {
			return <Tile tileClickHandler={props.tileClickHandler} tile={rawTile}/>;
		})

		let rows = [];
		for (let i=0; i < props.row; i++) {
			let rowHeader = props.row * i;
			rows.push(
				<tr>
					{tiles.slice(rowHeader, rowHeader+props.col)}
				</tr>
			);
		}

		return (
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
}

export default Board;
