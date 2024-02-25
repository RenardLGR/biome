import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'

export default class Grass extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "grass"
        this.color = "#e9f0c7"
    }

    
}