// [columns/x][rows/y]
function Knight() {
  // moves are relative to current knight position
  this.moves = [
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
  ];
  // array containing all possible coordinates after making a valid move
  this.possiblePositions = [];
}
function Game() {
  this.board = null;
  this.create = () => {
    this.board = new Array(8);
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(8);
    }
    this.fillBoard();
  };
  this.fillBoard = () => {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        this.board[i][j] = "[ ]";
      }
    }
  };
  this.printBoard = () => {
    let boardState = "";
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (j === 7) {
          boardState += `${this.board[i][j]}\n`;
        } else {
          boardState += `${this.board[i][j]}`;
        }
      }
    }
    console.log(boardState);
  };
  this.isMoveValid = (start, move) => {
    if (
      start[0] + move[0] >= 0 &&
      start[0] + move[0] < 8 &&
      start[1] + move[1] >= 0 &&
      start[1] + move[1] < 8
    ) {
      return true;
    }
    return false;
  };
  this.moveKnight = (
    start,
    end,
    queue = [],
    history = [],
    board = this.board
  ) => {
    if (start === end) {
      queue.length = 0;
      history.push(start);
      return history;
    }
    const knight = new Knight();
  };
  return `${this.board}`;
}

const game = new Game();
game.create();
game.printBoard();

/*
board is an array size 8x8. each square is initially empty.
function moveKnight accept his start position, end position, board.
Knight can make 8 different moves if none of them goes outside of board.
Board creates new knight with his position that is also starting position [x,y]
if(knight position === end position) return 'history'   
else{
    -if queue doesn't have this board push it to queue
    -check all 8 moves how many of them are viable.
    move is viable then it doesn't go outside board(or goes to on of the previous positions)
    -for every viable move create new board with knight in new position
    -create new array called 'history' that have cords of previous moves and attach it to new board
    -store all new boards inside array called 'viableMoves'
    -push inside array 'queue' all children from 'viableMoves'
    -queue.splice(0,1)
    -queue for each call this.moveKnight
}
*/
