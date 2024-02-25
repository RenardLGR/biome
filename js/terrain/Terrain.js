import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';

export default class Terrain{
    constructor(context, grid, x, y){
        this.context = context
        this.grid = grid
        this.x = x
        this.y = y
        this.nthGen = 0 // Each generation adds one, keeps track "how old" a Terrain is
    }

    next(){
        this.nthGen++
        // TODO update the status according to its neighbors
        return this
    }

    draw(){
        // Draw grey border
        this.context.strokeStyle = 'grey';
        this.context.lineWidth = 1; // Adjust the border width as needed
        this.context.strokeRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        // Draw cell
        this.context.fillStyle = this.color
        this.context.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }
}