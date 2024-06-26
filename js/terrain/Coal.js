import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'
import Ashes from './Ashes.js'

export default class Coal extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "coal"
        this.color = "#333333"
    }

    next(){
        //After 5 generations, coal becomes ash
        this.nthGen++

        if(this.nthGen > 5){
            return new Ashes(this.context, this.grid, this.x, this.y)
        }

        return this
    }
}