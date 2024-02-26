import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'
import Coal from './Coal.js'

export default class Fire extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "fire"
        this.colorRed = "#d64211"
        this.colorOrange = "#ed8f0c"
        this.colorYellow = "#e8b020"
        this.colorGrass = "#e9f0c7"
    }

    next(){
        //After 5 generations, fire becomes coal
        this.nthGen++

        if(this.nthGen > 5){
            return new Coal(this.context, this.grid, this.x, this.y)
        }

        return this
    }

    draw(){
        // Draw grey border
        this.context.strokeStyle = 'grey';
        this.context.lineWidth = 1; // Adjust the border width as needed
        this.context.strokeRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        // Draw cell
        this.context.fillStyle = this.colorOrange
        this.context.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

        //Draw red exterior triangle
        this.context.beginPath();
        let start = [this.x * CELL_SIZE , this.y * CELL_SIZE + 3/4*CELL_SIZE] //0.75*CELL down
        let lineTo1 =  [this.x * CELL_SIZE + CELL_SIZE , this.y * CELL_SIZE + 3/4*CELL_SIZE] //0.75*CELL down + 1CELL right, creating the bottom horizontal line
        let lineTo2 =  [this.x * CELL_SIZE + 1/2*CELL_SIZE , this.y * CELL_SIZE] //0.5*CELL right, creating the right line to the summit
        this.context.moveTo(start[0], start[1])
        this.context.lineTo(lineTo1[0], lineTo1[1])
        this.context.lineTo(lineTo2[0], lineTo2[1])
        this.context.closePath(); //closing the triangle
        this.context.fillStyle = this.colorRed;
        this.context.fill();

        //Draw yellow interior triangle
        this.context.beginPath();
        start = [this.x * CELL_SIZE + 1/10*CELL_SIZE , this.y * CELL_SIZE + 3/4*CELL_SIZE]
        lineTo1 =  [this.x * CELL_SIZE + 9/10*CELL_SIZE , this.y * CELL_SIZE + 3/4*CELL_SIZE]
        lineTo2 =  [this.x * CELL_SIZE + 1/2*CELL_SIZE , this.y * CELL_SIZE + 2/5*CELL_SIZE]
        this.context.moveTo(start[0], start[1])
        this.context.lineTo(lineTo1[0], lineTo1[1])
        this.context.lineTo(lineTo2[0], lineTo2[1])
        this.context.closePath(); //closing the triangle
        this.context.fillStyle = this.colorYellow;
        this.context.fill();
    }
}