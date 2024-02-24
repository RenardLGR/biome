import { COLS, ROWS, CELL_SIZE, period } from './constants.js';
import Grass from './terrain/Grass.js'

export default class Biome {
    constructor(context){
        this.context = context
        this.grid = Array.from({length : ROWS}, _ => Array(COLS))
        this.initialize()
    }

    initialize(){
        for(let col = 0 ; col<COLS ; col++){
            for(let row=0 ; row<ROWS ; row++){
                this.grid[row][col] = new Grass(this.context, this.grid, col, row)
            }
        }
    }

    //From the existing environment, this function generates the next generation
    regenerate(){
        console.log("Regen !");
    }

    draw(){
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col].draw()
            }
        }
    }
}