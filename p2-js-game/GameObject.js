class GameObjects {
    constructor(config) {
        this.locationX = config.locationX || 0;
        this.locationY = config.locationY || 0;
        this.direction = config.directionMain || 'down';
        this.lastFrame = config.lastFrame;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || 'assets/character/people/DemoRpgCharacter.png',
        });
    }

    // update() {

    // }
}

class Person extends GameObjects {
    constructor(config) {
        super(config);

        this.mainCharacter = config.mainCharacter || false;
        this.npc = config.npc || false;

        //Specify the movement on the canvas
        this.directionMovement = {
            'up': ['locationY', -1],
            'down': ['locationY', 1],
            'left': ['locationX', -1],
            'right': ['locationX', 1]
        }
    }

    update(state) {
        this.updateSpriteDirection(state);

        //Moves Main Character if a movement direction is pressed
        if (this.mainCharacter && state.arrow) {
            this.direction = state.arrow;
            this.isThereWall = state.map.isSpaceTaken(this.locationX, this.locationY, this.direction);
            this.updateSpriteDirection(state);
            
            if(!this.isThereWall) {
                this.updatePosition();
            }
            console.log(this.locationX, this.locationY);


        } else {
            this.direction = null;
        }

        //Randomize NPC movement
        // if (this.npc) {
        //     const randomDirection = Object.keys(this.directionMovement);
        //     this.direction = randomDirection[Math.floor(Math.random() * 4)];
        // }
    }

    //Update Character's Positions
    updatePosition() {
        if(this.direction !== null) {
            let [property, change] = this.directionMovement[this.direction];
            this[property] += change;
        }
        else {
            return;
        }
    }

    updateSpriteDirection(state) {
        //Adds animation and specify the direction the character is facing
        if(this.direction != null) {
            this.sprite.changeAnimation(`walk-${this.direction}`);
            this.lastFrame = this.sprite.currentAnimationFrame;
        }
        
        //Pause at the last frame when the character stops moving
        else {
            this.sprite.currentAnimationFrame = this.lastFrame;
        }
    }
}