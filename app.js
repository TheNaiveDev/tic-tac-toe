const gameBoard = document.querySelector('#gameboard');
const info = document.querySelector('#info');
const cells = ['', '', '', '', '', '', '', '', ''];

let playerCircle = 'circle';
info.textContent = 'CIRCLE STARTS FIRST';

function generateBoard () {
    cells.forEach((_cell, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = index;
        square.addEventListener('click', addCircle);
        gameBoard.appendChild(square);
    })
}

function addCircle(e) {
    circle = document.createElement('div');
    circle.classList.add(playerCircle);
    e.target.appendChild(circle);
    playerCircle = playerCircle === 'circle' ? 'cross' : 'circle';
    info.textContent = `it is now ${playerCircle}'s turn`;
    e.target.removeEventListener('click', addCircle);
    declareWinner();
}

function declareWinner() {
    const allSquares = document.querySelectorAll('.square');
    const winningStreams = [
        [0,1,2], [3,4,5], [6,7,8],
         [0,3,6],[1,4,7], [2,5,8,],
        [0,4,8], [2,4,6]
    ];
    winningStreams.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle')
            )

        if (circleWins) {
            info.textContent = 'CIRCLE WINS THE GAME';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
        }
    })

    winningStreams.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross')
            )

        if (crossWins) {
            info.textContent = 'CROSS WINS THE GAME';
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
        }
    })
}

generateBoard();