const startGame = document.querySelector('.start-game');
const level = document.getElementById('choose-level');
const startBtn = document.getElementById('start');

startBtn.addEventListener('click', function () {
    startGame.style.display = 'none';
    var g = new Game(level.value);
});

class Game {
    constructor(value) {
        this.rows = 0;
        this.cols = 0;
        this.rowWidth = 0;
        this.rowHeight = 0;
        this.mineNumbers = 0;

        this.setBoard(value);
        this.createBoard(this.rows, this.cols, this.rowWidth, this.rowHeight);
        this.randomPosMine(this.mineNumbers, this.rows, this.cols);
        this.board.addEventListener('click', (e) => {
            var cell = e.target;

            var row = parseInt(cell.dataset.row);
            var col = parseInt(cell.dataset.col);

            console.log(row, col);

            if (cell.classList.contains("mine")) {
                // gameOver(false);
                console.log('Game over');
            } 
        })
    }

    setBoard(value) {
        if (value === 'Easy') {
            this.setValue(8, 8, 400, 50, 10);
        } else if (value === 'Medium') {
            this.setValue(14, 18, 40 * 18, 40, 40);
        } else {
            this.setValue(20, 24, 30 * 24, 30, 99);
        }
    }

    setValue(rows, cols, rowWidth, rowHeight, mineNumbers) {
        this.rows = rows;
        this.cols = cols;
        this.rowWidth = rowWidth;
        this.rowHeight = rowHeight;
        this.mineNumbers = mineNumbers;
    }

    createBoard(rows, cols, rowWidth, rowHeight) {
        this.board = document.createElement('div');
        this.board.setAttribute('class', 'board');

        for (let i = 0; i < rows; i++) {
            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.style.width = rowWidth + 'px';
            row.style.height = rowHeight + 'px';
            for (let j = 0; j < cols; j++) {
                var col = document.createElement('img');
                col.setAttribute('class', 'col hidden');
                col.setAttribute('data-row', i);
                col.setAttribute('data-col', j);
                col.src = './src/img/hidden.jpg';
                col.style.width = rowWidth / cols + 'px';
                col.style.height = rowHeight + 'px';

                row.appendChild(col);
            }
            this.board.appendChild(row);
        }
        document.body.appendChild(this.board);
    }

    randomPosMine(numbers, rows, cols) {
        var x, y;
        var cells;
        for (let i = 0; i < numbers; i++) {
            x = Math.floor(Math.random() * rows);
            y = Math.floor(Math.random() * cols);
            cells = document.querySelectorAll(`[data-row="${x}"][data-col="${y}"]`);
            if (!cells[0].classList.contains('mine')) {
                cells[0].classList.add('mine');
            } else {
                i--;
            }
            console.log(x, y);
        }
    }
}

