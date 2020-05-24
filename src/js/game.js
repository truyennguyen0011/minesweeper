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

        this.board.addEventListener('contextmenu', (e) => {
            var cell = e.target;
            if (cell.className === 'col') return;
            if (cell.classList.contains('flag')) {
                cell.classList.remove('flag');
                cell.classList.add('hidden');
                cell.src = './src/img/hidden.jpg';
            } else {
                cell.classList.remove('hidden');
                cell.classList.add('flag');
                cell.src = './src/img/flag.jpg';
            }
        });
        this.board.addEventListener('click', (e) => {
            var cell = e.target;
            if (cell.classList.contains('flag')) return;
            if (cell.className === 'col') return;
            var row = parseInt(cell.dataset.row);
            var col = parseInt(cell.dataset.col);

            console.log(row, col);

            if (cell.classList.contains("mine")) {
                // gameOver(false);
                console.log('++++++++++++++++');
                console.log('Game over');
            } else {
                this.reveal(row, col);
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

    reveal(row, col) {
        this.helper(row, col);
    }

    helper(i, j) {
        if (i >= this.rows || j >= this.cols || i < 0 || j < 0) return;

        var cell = document.querySelectorAll(`[data-row="${i}"][data-col="${j}"]`);
        var mineCount = this.getMineCount(i, j);
        console.log(mineCount);

        if (!cell[0].classList.contains("hidden") || cell[0].classList.contains("mine")) return;

        cell[0].classList.remove("hidden");

        if (mineCount > 0) {
            cell[0].src = `./src/img/${mineCount}.jpg`;
            return;
        }

        cell[0].src = './src/img/blank.png';

        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                this.helper(i + di, j + dj);
            }
        }
    }

    getMineCount(i, j) {
        let count = 0;

        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                var ni = i + di;
                var nj = j + dj;
                if (ni >= this.rows || nj >= this.cols || nj < 0 || ni < 0) {
                    continue;
                } else {
                    var cells = document.querySelectorAll(`[data-row="${ni}"][data-col="${nj}"]`);
                    if (cells[0].classList.contains("mine")) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}

