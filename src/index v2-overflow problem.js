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
}
function Game() {
  this.board = null;
  this.viableMoves = [];

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
  this.moveKnight = (start, end, queue = [], history = [], paths = []) => {
    if (start[0] === end[0] && start[1] === end[1]) {
      paths.push(history);
    }
    if (!queue.includes(this)) {
      queue.push(this);
      history.push([start[0], start[1]]);
    }
    this.board[start[0]][start[1]] = 999;
    this.printBoard();
    const knight = new Knight();
    knight.moves.forEach((move) => {
      const x = start[0] + move[0];
      const y = start[1] + move[1];
      if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (typeof this.board[x][y] !== "number") {
          const newGame = new Game();
          newGame.create();
          for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
              newGame.board[i][j] = this.board[i][j];
            }
          }
          newGame.board[x][y] = 999;
          newGame.newHistory = [...history];
          newGame.newHistory.push([x, y]);
          this.viableMoves.push(newGame);
          queue.push(newGame);
        }
      }
    });
    queue.splice(0, 1);
    queue.forEach((game) =>
      game.moveKnight(
        game.newHistory[game.newHistory.length - 1],
        end,
        queue,
        game.newHistory,
        paths
      )
    );
    return paths;
  };
  return `${this.board}`;
}

const game = new Game();
game.create();
console.log(game.moveKnight([0, 0], [3, 3]));
console.log(game.viableMoves);
game.viableMoves[0].printBoard();
game.viableMoves[1].printBoard();
game.printBoard();
