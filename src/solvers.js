/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.findSolution = function (figureCount, board, c, n, validator, callback) {
  if (figureCount === 0) {
    return callback(board);
  } 
  for (var row = 0; row < n; row++) {
    board.togglePiece(row, c);
    if (!board[validator]()) {
      var result = findSolution(figureCount-1, board, c+1, n, validator, callback);
      if (result) return result;
    }         
    board.togglePiece(row, c);
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution = findSolution(n, new Board({n:n}), 0, n, 'hasAnyRooksConflicts', function(board){
    return _.map(board.rows(), function(row){return row.slice();});    
  }) || (new Board({n:n})).rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  window.findSolution(n, new Board({n:n}), 0, n, 'hasAnyRooksConflicts', function(board){
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = findSolution(n, new Board({n:n}), 0, n, 'hasAnyQueensConflicts', function(board){
    return _.map(board.rows(), function(row){return row.slice();});    
  }) || (new Board({n:n})).rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  window.findSolution(n, new Board({n:n}), 0, n, 'hasAnyQueensConflicts', function(board){
    solutionCount++;
  });
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
