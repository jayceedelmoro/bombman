class WorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.canvas = document.querySelector('.game-canvas');
        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;
        this.availableMapSlots = config.availableMapSlots || [];
        this.totalMapSlots = [];
        this.breakableWallsPosition = [];
        this.walls = [];
        this.doorCoordinates = [];

        this.mapImage = new Image();
        this.mapImage.src = config.mapSrc;
    }

    drawMap(ctx, canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        utils.drawWholeMap(ctx, this.canvasWidth, this.canvasHeight, this.mapImage);
        

        for (let countX = 0; countX < this.canvasWidth; countX += 16) {
            for (let countY = 0; countY < this.canvasHeight; countY += 16) {
                this.availableMapSlots.push([countX, countY]);
                this.totalMapSlots.push([countX, countY]);
            }
        }

    };

    permaWalls() {

        for (let countX = 0; countX < this.canvasWidth; countX += 32) {
            for (let countY = 0; countY < this.canvasHeight; countY += 32) {
                this.addWall(countX, countY)
            }
        }
    }

    addWall(wallX, wallY, breakable) {
        this.walls.push([wallX, wallY]);
        
        this.canBreak = breakable || false;

        for (let index = 0; index < this.availableMapSlots.length; index++) {
            for (let indexTwo = 0; indexTwo < this.walls.length; indexTwo++) {
                if (JSON.stringify(this.availableMapSlots[index]) == JSON.stringify(this.walls[indexTwo])) {
                    this.availableMapSlots.splice(index, 1);
                    this.totalMapSlots.splice(index, 1);
                }
            } 
        }

        if (this.canBreak) {
            this.breakableWallsPosition.push([wallX, wallY]);
        }
    }

    isSpaceTaken(currentX, currentY, direction) {

        let isWall = false;

        if(direction === 'up' ) {
            for(let count = 0; count < this.walls.length; count++){
                if(currentY-1 >= this.walls[count][1] - 15 &&
                    currentY <= this.walls[count][1] + 16 &&
                    currentX-1 >= this.walls[count][0] - 14 &&
                    currentX+1 <= this.walls[count][0] + 14 ||
                    currentY < 0) {
                    isWall = true;
                }
            }
        } else if(direction === 'down') {
            for(let count = 0; count < this.walls.length; count++){
                if(currentY >= this.walls[count][1] - 15 &&
                    currentY+1 <= this.walls[count][1] + 16 &&
                    currentX-1 >= this.walls[count][0] - 14 &&
                    currentX+1 <= this.walls[count][0] + 14 ||
                    currentY > this.canvasHeight - 18) {
                    isWall = true;
                }
            }
        } else if(direction === 'left') {
            for(let count = 0; count < this.walls.length; count++){
                if(currentY-1 >= this.walls[count][1] - 15 &&
                    currentY+1 <= this.walls[count][1] + 16 &&
                    currentX-1 >= this.walls[count][0] - 14 &&
                    currentX <= this.walls[count][0] + 14 ||
                    currentX < 0) {
                    isWall = true;
                }
            }
        } else if(direction === 'right') {
            for(let count = 0; count < this.walls.length; count++){
                if(currentY-1 >= this.walls[count][1] - 15 &&
                    currentY+1 <= this.walls[count][1] + 16 &&
                    currentX >= this.walls[count][0] - 14 &&
                    currentX+1 <= this.walls[count][0] + 14 ||
                    currentX > this.canvasWidth - 15) {
                    isWall = true;
                }
            }
        }
        return isWall;
    }
}

window.worldMaps = {
    Demo: {
        mapSrc: 'assets/maps/Blocks.png',
        gameObjects: {

        },
        
    }
}