import { COLS, ROWS, CELL_SIZE, period } from './constants.js';
import Grass from './terrain/Grass.js'
import Tree from './terrain/Tree.js'

export default class Biome {
    constructor(context){
        this.context = context
        this.grid = Array.from({length : ROWS}, _ => Array(COLS))
        this.nextGrid = Array.from({length : ROWS}, _ => Array(COLS))
        this.initialize()
    }

    initialize(){
        for(let col = 0 ; col<COLS ; col++){
            for(let row=0 ; row<ROWS ; row++){
                this.grid[row][col] = new Tree(this.context, this.grid, col, row)
            }
        }
        // this.grid[0][0] = new Tree(this.context, this.grid, 0, 0)
    }

    //From the existing environment, this function generates the next generation
    next(){
        console.log("Regen !");
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.nextGrid = this.grid[row][col].next()
            }
        }
    }

    draw(){
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col].draw()
            }
        }
    }

        // (number, number) : Array <Array<number> >
        getMooreNeighboorhood(row, col){
            const neighborhood = [];
        
            const neighborsRelativeCoords = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1],           [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
        
            for (const [dr, dc] of neighborsRelativeCoords) {
                const newRow = row + dr;
                const newCol = col + dc;
        
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    neighborhood.push([newRow, newCol]);
                }
            }
        
            return neighborhood;
        }
    
        // (number, number) : Array <Array<number> >
        getVonNeumannNeighborhood(row, col) {
            const neighborhood = [];
        
            const neighborsRelativeCoords = [
                         [-1, 0],
                [0, -1],           [0, 1],
                         [1, 0]
            ];
        
            for (const [dr, dc] of neighborsRelativeCoords) {
                const newRow = row + dr;
                const newCol = col + dc;
        
                if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    neighborhood.push([newRow, newCol]);
                }
            }
        
            return neighborhood;
        }
    
        // (number, number, number) : Array <Array<number> >
        getChebyshevNeighborhood(row, col, distance) {
            const neighborhood = [];
        
            // Iterate through all cells within the specified Chebyshev distance
            for (let i = row - distance; i <= row + distance; i++) {
                for (let j = col - distance; j <= col + distance; j++) {
                    // Calculate Chebyshev distance
                    const chebyshevDist = Math.max(Math.abs(row - i), Math.abs(col - j));
        
                    // Check if the cell is within the Chebyshev distance and within the bounds of the grid
                    if (chebyshevDist <= distance && i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                        neighborhood.push([i, j]);
                    }
                }
            }
        
            return neighborhood;
        }
}