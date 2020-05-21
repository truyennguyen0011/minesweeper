const startGame = document.querySelector('.start-game');
const level = document.getElementById('choose-level');
const startBtn = document.getElementById('start');
startBtn.addEventListener('click', function() {
    startGame.style.display = 'none';
    var g = new Game(level.value);
});

class Game {
    constructor(value) {
        this.rows = 0;
        this.cols = 0;
        this.mineNumber = 0;
        this.posMine = [];
        this.setGameBoard(value);
        this.createGameBoard(this.rows, this.cols)
    }

    createGameBoard(rows, cols) {
        console.log(rows, cols);
    }

    setGameBoard(value) {
        if (value === 'Easy') {
            this.rows = 8;
            this.cols = 8;
            this.mineNumber = 10;
        } else if (value === 'Medium') {
            this.rows = 14;
            this.cols = 18;
            this.mineNumber = 40;
        } else {
            this.rows = 20;
            this.cols = 24;
            this.mineNumber = 99;
        }
    }
}

