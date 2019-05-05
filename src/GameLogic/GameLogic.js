

export const GameLogic = {

    clickTile: function (board, tileID) {
        if (board[tileID].mine) {
            board = this.revealAll(board, tileID);
        } else {
            this.clearOrCascade(board, tileID);
        }
        return board;
    },

    flagTile: function (board, tileID) {
        if (!board[tileID].visible) {
            board[tileID].flagged = true;
        }
        return board;
    },

    revealAll: function (board, tileID) {
        board = board.map((tile) => {
            tile.visible = true;
            return tile;
        })
        return board;
    },

    initBoard : function (col, row, mines) {
        let board = new Array(row*col).fill();
        for (let i=0; i<(row*col); i++) {
            board[i] = {key: i, display: '?', flagged: false, mine: false, neighbors: 0, visible: false};
        }
        
        board.col = col;
        board.row = row;

        let minePositions = []
        while (minePositions.length < mines) {
            let pos = Math.floor(Math.random()*board.length);
            if (minePositions.indexOf(pos) === -1)
                minePositions.push(pos);
        }

        minePositions.forEach(function(pos) {
            board[pos].mine = true;
        });

        this.calculateNeighbors(board, col, row);
        return board;
    },

    calculateNeighbors: function (board, col, row) {
        for (let i=0; i<board.length; i++) {

            let mineCount = 0;
            let T = i - row;     // if < 0    no top
            let B = i + row;     // if > size no bottom
            let L = i % row;     // if 0      no left
            let R = (i+1) % row; // if 0      no right

            if (T >= 0) {
                if (board[T].mine)
                    mineCount++;
                if (L > 0 && board[T-1].mine)  // upper left diagonal
                    mineCount++;
                if (R > 0 && board[T+1].mine)  // upper right diagonal
                    mineCount++;
            }

            if (B < board.length) {
                if (board[B].mine)
                    mineCount++;
                if (L > 0 && board[B-1].mine)  // lower left diagonal
                    mineCount++;
                if (R > 0 && board[B+1].mine)  // lower right diagonal
                    mineCount++;
            }

            if (L > 0 && board[i-1].mine)
                mineCount++;
            if (R > 0 && board[i+1].mine)
                mineCount++;

            board[i].neighbors = mineCount;
        }
    },

    clearOrCascade: function (board, i) {
        let col = board.col;
        let row = board.row;

        // if clearOrCascade is called on a mine, set it visible
        board[i].visible = true
        if (board[i].neighbors > 0) {
            return;
        }

        let T = i - row;     // if < 0    no top
        let B = i + row;     // if > size no bottom
        let L = i % row;     // if 0      no left
        let R = (i+1) % row; // if 0      no right

        if (T >= 0) {
            if (!board[T].mine && !board[T].visible)
                this.clearOrCascade(board, T);
            if (L > 0 && !board[T-1].mine && !board[T-1].visible)
                this.clearOrCascade(board, T-1);
            if (R > 0 && !board[T+1].mine && !board[T+1].visible)
                this.clearOrCascade(board, T+1);
        }

        if (B < board.length) {
            if (!board[B].mine && !board[B].visible)
                this.clearOrCascade(board, B);
            if (L > 0 && !board[B-1].mine && !board[B-1].visible)
                this.clearOrCascade(board, B-1);
            if (R > 0 && !board[B+1].mine && !board[B+1].visible)
                this.clearOrCascade(board, B+1);
        }

        return;
    },
}

export default GameLogic
