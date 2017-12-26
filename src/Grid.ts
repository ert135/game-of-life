import Cell from './Cell'

export default class Grid {
    private grid: Array<Array<number>>;
    private resolution: number;
    private cols: number;
    private rows: number;
    private width: number;
    private height: number;

    constructor(width: number, height: number, resolution: number) {
        console.log('Creating grid object');
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.cols = width / resolution;
        this.rows = height / resolution;
        this.grid = this.makeArray(width, height, resolution);
    }

    private makeArray(width: number, height: number, resolution: number): Array<Array<number>> {
        let grid = new Array(this.cols);

        for (var i = 0; i < this.cols; i++) {
            grid[i] = new Array(this.rows)
        }

        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                grid[i][j] = Math.round(Math.random());
            }
        }

        console.table(grid);

        return grid;
    }

    public calculate(): Array<Array<number>> {
        let next = this.makeArray(this.width, this.height, this.resolution);

        //conpute next based on grid;
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {

                let state = this.grid[i][j];

                //check edges
                if (i === 0 || i === this.cols-1 || j === 0 || j === this.rows-1) {
                    next[i][j] = state;
                } else {
                    let sum = 0;
                    let neighbors = this.countNeighbors(this.grid, i, j);

                    if (state === 0 && neighbors === 3) {
                        next[i][j] = 1;
                    } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                        next[i][j] = 0;
                    } else {
                        next[i][j] = this.grid[i][j];
                    }
                }
            }
        }

        return next;
    }

    public draw(): void {
        this.grid.forEach((column: Array<number>, columnIndex: number) => {
            column.forEach((row: number, rowIndex: number) => {
                let x = columnIndex * this.resolution;
                let y = rowIndex * this.resolution;

                if (row === 1) {
                    fill(0);
                    rect(x, y, this.resolution, this.resolution)
                } else {
                    fill(255);
                    rect(x, y, this.resolution, this.resolution)
                }
            })
        });

        this.grid = this.calculate();
    }

    private countNeighbors(grid: any, x: number, y: number): number {
        let sum = 0;

        //janky way to get neighbor cell value count
        for (var i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                sum += grid[x + i][y + j];
            }
        }

        sum -= grid[x][y];
        return sum;
    }
}
