import { COLS, ROWS, CELL_SIZE, period } from './constants.js';
import Grass from './terrain/Grass.js'
import Tree from './terrain/Tree.js'
import Fire from './terrain/Fire.js'
import Coal from './terrain/Coal.js'
import Ashes from './terrain/Ashes.js'

export default class Biome {
    constructor(context){
        this.context = context
        this.grid = Array.from({length : ROWS}, _ => Array(COLS))
        this.nextGrid = Array.from({length : ROWS}, _ => Array(COLS))
        // this.initialize()
        this.generateVolcanicIsland(10, 18)
    }

    initialize(){
        for(let col = 0 ; col<COLS ; col++){
            for(let row=0 ; row<ROWS ; row++){
                //0.02 chance to spawn a tree, otherwise grass
                let rand = Math.floor(Math.random()*100)
                if(rand < 2){
                    this.grid[row][col] = new Tree(this.context, this.grid, col, row)
                    this.grid[row][col].nthGen = Math.floor(Math.random()*30) // chance to spawn a young, med or adult tree
                }else{
                    this.grid[row][col] = new Grass(this.context, this.grid, col, row)
                }
            }
        }
    }

    //From the existing environment, this function generates the next generation
    //Update grid for Biome
    next(){
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.nextGrid[row][col] = this.grid[row][col].next()
            }
        }
        this.grid = this.nextGrid
        this.nextGrid = Array.from({length : ROWS}, _ => Array(COLS))
        //Update grid for each cells
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col].grid = this.grid
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

    //Playground : generate body of water
    generateSea(row, col){
        //clean sweep
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col] = 0
            }
        }

        let seaCoords = []
        //generate 10 sources close to the original source
        for(let i=0 ; i<10 ; i++){
            let radius = this.randomNumberBetween(5, 10)
            let shiftedRow = row + this.randomNumberBetween(-5, 5)
            let shiftedCol = col + this.randomNumberBetween(-5, 5)
            seaCoords = seaCoords.concat(this.getCircularNeighborhood(shiftedRow, shiftedCol, radius))
        }
        
        seaCoords.forEach(([row, col]) => {
            this.grid[row][col] = 1
        })

        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                // Draw grey border
                this.context.strokeStyle = 'grey';
                this.context.lineWidth = 1; // Adjust the border width as needed
                this.context.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

                // Draw black or white cell
                this.context.fillStyle = this.grid[row][col] === 0 ? 'green' : 'blue'
                this.context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    //Playground : generate mountain
    generateMountain(row, col){
        //clean sweep
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col] = 0
            }
        }

        let mountainCoords = []
        let icyTopsCoords = []
        //generate 10 sources close to the original source
        for(let i=0 ; i<10 ; i++){
            let radius = this.randomNumberBetween(5, 10)
            let shiftedRow = row + this.randomNumberBetween(-5, 5)
            let shiftedCol = col + this.randomNumberBetween(-5, 5)
            mountainCoords = mountainCoords.concat(this.getCircularNeighborhood(shiftedRow, shiftedCol, radius))
            icyTopsCoords = icyTopsCoords.concat(this.getTaxicabNeighborhood(shiftedRow, shiftedCol, this.randomNumberBetween(1, 2)))
        }
        
        mountainCoords.forEach(([row, col]) => {
            this.grid[row][col] = 1
        })

        icyTopsCoords.forEach(([row, col]) => {
            this.grid[row][col] = 2
        })

        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                // Draw grey border
                this.context.strokeStyle = 'grey';
                this.context.lineWidth = 1; // Adjust the border width as needed
                this.context.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

                // Draw default cell green, icy tops white and mountain dark grey
                this.context.fillStyle = this.grid[row][col] === 0 ? 'green' : (this.grid[row][col] === 1 ? '#3b3b3b' : "white")
                this.context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    //Playground : generate river
    generateRiver(){
        //clean sweep
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col] = 0
            }
        }

        //Top to bottom
        let startX = Math.floor(COLS / 2)
        let startY = 0

        let riverCells = [[startX, startY]]
        for(let i=1 ; i<ROWS ; i++){
            //How much the river "wiggles"
            let shift = this.randomNumberBetween(-2, 2)
            let newX = riverCells[riverCells.length-1][0] + shift
            riverCells.push([newX, startY + i])
        }

        //Get width of the river
        let riverNeighbors = riverCells.map(([col, row]) => this.getChebyshevNeighborhood(row, col, 2))

        riverNeighbors.forEach(subarr => {
            subarr.forEach(([row, col]) => this.grid[row][col] = 1)
        })

        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                // Draw grey border
                this.context.strokeStyle = 'grey';
                this.context.lineWidth = 1; // Adjust the border width as needed
                this.context.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

                // Draw default green or blue cells
                this.context.fillStyle = this.grid[row][col] === 0 ? 'green' : "blue"
                this.context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    //Playground : generate volcanic island
    generateVolcanicIsland(row, col){
        //clean sweep
        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                this.grid[row][col] = 0
            }
        }

        let volcanoCoords = []
        let lavaCoords = []
        //generate 10 sources close to the original source
        for(let i=0 ; i<10 ; i++){
            let radius = this.randomNumberBetween(6, 12)
            let shiftedRow = row + this.randomNumberBetween(-5, 5)
            let shiftedCol = col + this.randomNumberBetween(-5, 5)
            volcanoCoords = volcanoCoords.concat(this.getCircularNeighborhood(shiftedRow, shiftedCol, radius))
            lavaCoords = lavaCoords.concat(this.getCircularNeighborhood(shiftedRow, shiftedCol, this.randomNumberBetween(1, 5)))

            //Generate lava flow from the sources found above
            let length = this.randomNumberBetween(8, 15)
            let direction = this.randomNumberBetween(0, 3) // 0 North, 1 East, 2 South, 3 West
            for(let i=0 ; i<length ; i++){
                switch(direction){
                    case 0 :  // North
                        shiftedRow--
                        shiftedCol += this.randomNumberBetween(-1,1)
                        break;
                    
                    case 1 :  // East
                        shiftedRow += this.randomNumberBetween(-1,1)
                        shiftedCol++
                        break;

                    case 2 :  // South
                        shiftedRow++
                        shiftedCol += this.randomNumberBetween(-1,1)
                        break;

                    case 3 :  // West
                        shiftedRow += this.randomNumberBetween(-1,1)
                        shiftedCol--
                        break;

                    default:
                        console.log("Error : direction is not between 0 and 3")
                }
                if(shiftedRow>=0 && shiftedRow<ROWS && shiftedCol>=0 && shiftedCol<COLS){
                    lavaCoords.push([shiftedRow, shiftedCol])
                }
            }
        }
        
        //0 is default : water, volcano is 1 (mountain/brown color), 2 is lava (red color)
        volcanoCoords.forEach(([row, col]) => {
            this.grid[row][col] = 1
        })

        lavaCoords.forEach(([row, col]) => {
            this.grid[row][col] = 2
        })

        for(let row=0 ; row<ROWS ; row++){
            for(let col=0 ; col<COLS ; col++){
                // Draw grey border
                this.context.strokeStyle = 'grey';
                this.context.lineWidth = 1; // Adjust the border width as needed
                this.context.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);

                // Draw default blue, brown, and red cells
                this.context.fillStyle = this.grid[row][col] === 0 ? 'blue' : (this.grid[row][col] === 1 ? "#371e1f" : "red")
                this.context.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            }
        }
    }

    // (number, number) : number
    randomNumberBetween(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    // (number, number) : Array <Array<number> >
    getMooreNeighborhood(row, col){
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
        //Square shape
        //Note : the original center point in INCLUDED in the neighbors
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

    // (number, number, number) : Array <Array<number> >
    getTaxicabNeighborhood(row, col, distance) {
        //Diamond shape
        //Note : the original center point in INCLUDED in the neighbors
        const neighborhood = [];
    
        // Iterate through all cells within the specified taxicab distance
        for (let i = row - distance; i <= row + distance; i++) {
            for (let j = col - distance; j <= col + distance; j++) {
                // Calculate Manhattan distance
                const manhattanDist = Math.abs(row - i) + Math.abs(col - j);
    
                // Check if the cell is within the Manhattan distance and within the bounds of the grid
                if (manhattanDist <= distance && i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                    neighborhood.push([i, j]);
                }
            }
        }
    
        return neighborhood;
    }

    // (number, number, number) : Array <Array<number> >
    getCircularNeighborhood(row, col, radius) {
        //Note : the original center point in INCLUDED in the neighbors
        const neighborhood = [];
    
        // Iterate through all cells within the circular radius
        for (let i = row - radius; i <= row + radius; i++) {
            for (let j = col - radius; j <= col + radius; j++) {
                // Calculate Euclidean distance from central cell (row, col)
                const distance = Math.sqrt(Math.pow(row - i, 2) + Math.pow(col - j, 2));
    
                // Check if the cell is within the circular radius and within the bounds of the grid
                if (distance < radius && i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                    neighborhood.push([i, j]);
                }
            }
        }
    
        return neighborhood;
    }
}