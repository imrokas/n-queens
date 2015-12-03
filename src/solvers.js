/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;

  var recurse = function (n, board, row, col) {
    if (n === 0) {
      solution = board;
      return true;
    }
    board.togglePiece(row, col);
    if ( !board.hasAnyRooksConflicts() ) {
      if ( recurse(n-1, board, row+1, col+1) ) return true;
    }
    board.togglePiece(row, col);
    if ( recurse(n, board, row, col+1) ) return true;
    if ( recurse(n, board, row+1, col) ) return true;
    return false;
  };

  if (n === 1) solution = new Board([[1]]);
  else {
    recurse(n, new Board({n: n}), 0, 0);  
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var isOutOfBounds = function (i) { return i >= n; };

  var recurse = function (rookCount, board, c) {
    if (rookCount === 0) {
      // _.each(board.rows(),function(r){console.log(r);});
      solutionCount++;
      return true;
    } 
    if (isOutOfBounds(c)) return false;
    for (var row = 0; row < n; row++) {
      board.togglePiece(row, c);
      if (!board.hasAnyRooksConflicts()) {
       recurse(rookCount-1, board, c+1);
      }         
      board.togglePiece(row, c);
    }
    return true;
  };
  recurse(n, new Board({n:n}), 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
