import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'
import Grass from './Grass.js'

export default class Ashes extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "ashes"
        this.color = "#999999"
    }

    next(){
        //After 5 generations, ashes become grass
        this.nthGen++

        if(this.nthGen > 5){
            return new Grass(this.context, this.grid, this.x, this.y)
        }

        return this
    }
}