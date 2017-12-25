import Cell from './Cell'

export default class Grid {
    private grid: Array<Array<Cell>>;
    private resolution: number;
    private cols: number;
    private rows: number;

    constructor(width: number, height: number, resolution: number) {
        console.log('Creating grid object');
        this.resolution = resolution;
        this.cols = width / resolution;
        this.rows = height / resolution;
        this.makeArray(width, height, resolution)
    }

    private makeArray(width: number, height: number, resolution: number): void {
        this.grid = new Array(this.cols);

        for (var i = 0; i < this.cols; i++) {
            this.grid[i] = new Array(this.rows)
        }

        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.grid[i][j] = Math.round(Math.random());
            }
        }

        console.table(this.grid);
    }

    private next(): void {
        console.log('next')
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
    }
}
