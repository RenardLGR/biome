import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'
import Tree from './Tree.js'

export default class Grass extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "grass"
        this.color = "#e9f0c7"
    }

    next(){
        this.nthGen++
        const mooreNbrs = this.getMooreNeighborhood(this.y, this.x)

        //A grass has a random chance to become a tree, this chance increases if there are trees in its nbrs
        let chanceToTree = 2
        for(let [row, col] of mooreNbrs){
            if(this.grid[row][col].id === "tree"){
                chanceToTree += 15
            }
        }
        let rand = Math.floor(Math.random()*100)
        if(rand < chanceToTree){
            return new Tree(this.context, this.grid, this.x, this.y)
        }else{
            return this
        }
    }
}