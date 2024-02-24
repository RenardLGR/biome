import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';

export default class Terrain{
    constructor(context, grid, x, y){
        this.context = context
        this.grid = grid
        this.x = x
        this.y = y
    }


    draw(){
        // Draw grey border
        this.context.strokeStyle = 'grey';
        this.context.lineWidth = 1; // Adjust the border width as needed
        this.context.strokeRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        if(this.twitch){
            this.context.fillStyle = this.color
            this.context.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }else{
            this.context.fillStyle = this.color2
            this.context.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }
        this.twitch = !this.twitch
    }
}