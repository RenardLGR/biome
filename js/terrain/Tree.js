import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'
import Fire from './Fire.js'

export default class Tree extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "tree"
        // The younger the tree, the lighter its shade is
        this.colorLightGreen = "#4c8444"
        this.colorMediumGreen = "#2b5329"
        this.colorDarkGreen = "#143018"
        this.colorGrass = "#e9f0c7"
        this.type = Math.floor(Math.random() * 3) // In case I decide to have 3 types of trees with each has a different shape
    }

    next(){
        this.nthGen++
        const mooreNbrs = this.getMooreNeighboorhood(this.y, this.x)

        //A tree has a random chance to ignite, this chance increases if there is fire in its nbrs
        let chanceToIgnite = 2
        for(let [row, col] of mooreNbrs){
            if(this.grid[row][col].id === "fire"){
                chanceToIgnite += 15
            }
        }
        let rand = Math.floor(Math.random()*100)
        if(rand < chanceToIgnite){
            return new Fire(this.context, this.grid, this.x, this.y)
        }else{
            return this
        }
    }

    draw(){
        // Draw grey border
        this.context.strokeStyle = 'grey';
        this.context.lineWidth = 1; // Adjust the border width as needed
        this.context.strokeRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        // Draw tree - The younger the tree, the lighter its shade is
        this.context.fillStyle = this.colorGrass
        this.context.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        //Draw circle
        this.context.beginPath();
        if(this.nthGen < 5){
            //Young tree draw
            this.context.arc(this.x * CELL_SIZE + CELL_SIZE/2, this.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/4, 0, 2*Math.PI); // centerX, centerY, radius, startAngle, endAngle
            this.context.fillStyle = this.colorLightGreen; // Set fill color
        }else if(this.nthGen < 10){
            //Medium tree draw
            this.context.arc(this.x * CELL_SIZE + CELL_SIZE/2, this.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/3, 0, 2*Math.PI); // centerX, centerY, radius, startAngle, endAngle
            this.context.fillStyle = this.colorMediumGreen; // Set fill color
        }else{
            //Adult tree draw
            this.context.arc(this.x * CELL_SIZE + CELL_SIZE/2, this.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2, 0, 2*Math.PI); // centerX, centerY, radius, startAngle, endAngle
            this.context.fillStyle = this.colorDarkGreen; // Set fill color
        }
        this.context.fill(); // Fill the circle with the specified color
        this.context.closePath(); // Close the path
    }
}