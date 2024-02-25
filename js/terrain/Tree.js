import { COLS, ROWS, CELL_SIZE, period } from '../constants.js';
import Terrain from './Terrain.js'

export default class Tree extends Terrain{
    constructor(context, grid, x, y){
        super(context, grid, x, y)
        this.id = "tree"
        // The younger the tree, the lighter its shade is
        this.colorLight = "#4c8444"
        this.colorMedium = "#2b5329"
        this.colorDark = "#143018"
        this.colorGrass = "#e9f0c7"
        this.type = Math.floor(Math.random() * 3) // In case I decide to have 3 types of trees with each has a different shape
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
            this.context.fillStyle = this.colorLight; // Set fill color
        }else if(this.nthGen < 10){
            //Medium tree draw
            this.context.arc(this.x * CELL_SIZE + CELL_SIZE/2, this.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/3, 0, 2*Math.PI); // centerX, centerY, radius, startAngle, endAngle
            this.context.fillStyle = this.colorMedium; // Set fill color
        }else{
            //Adult tree draw
            this.context.arc(this.x * CELL_SIZE + CELL_SIZE/2, this.y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE/2, 0, 2*Math.PI); // centerX, centerY, radius, startAngle, endAngle
            this.context.fillStyle = this.colorDark; // Set fill color
        }
        this.context.fill(); // Fill the circle with the specified color
        this.context.closePath(); // Close the path
    }
}