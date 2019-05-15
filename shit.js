// @date 05/01/2019
// @author cool kid

function Shit(canvas_size, collidables) 
{
    this.canvas_w = canvas_size[0];
    this.canvas_h = canvas_size[1];
    this.jumptime = 0;
    this.jumping;
    this.still = true;
    this.grounded = true;
    this.vertVelocity = 0;
    this.starty = 90;
    this.startx = 40;
    this.dead = false;
    this.x = 64;
    this.y = 300;
    this.w = 56;
    this.img = loadImage("https://i.imgur.com/XghszQO.png");  // load image and set to variable
    this.accelGrav = 0.5;
    this.falling = false;
    this.tileCollidingWith = null;
    this.canceljump = false;
    this.collidables = collidables
    
    
    this.dir = 0;
    this.speed = 0;
    
    this.onHitGround = function() {
        this.canceljump = false;
    }

    this.Jump = function () {
        this.grounded = false;
        this.jumptime = this.jumptime + 0.1;
//        this.vertVelocity = - ( this.jumptime ^ 2 ) + 10 * this.jumptime
        this.vertVelocity = -10;
    }
    
    this.stop = function () {
        
    }
    
    this.Crouch = function () {
    
    }

    this.kill = function() {
        this.vertVelocity = -16;
    }

    this.getCollidables = function() {
        return this.collidables
    }

    // place image on screen at given coordinates and size
    this.show = function () 
    {
        image(this.img, this.x, this.y, this.w, this.w);
    }

    // update position of bird
    // change y
    // change direction if edge is hit

    this.isCollidingWithTile = function() {
        var other;
        this.tileCollidingWith = null;
        for (index = 0; index < this.getCollidables().length; index++) {
            other = this.getCollidables()[index];
            if (this.x < other.x + other.w && this.x + this.w > other.x && this.y < other.y + other.h && this.y + this.h > other.y) {
                this.tileCollidingWith = other;
                return true;
            }
        }
    }
    
    this.another_movement_function_to_be_integrated_later = function() {
        this.x += speed;
        
        if (this.isCollidingWithTile()) {
            if (this.speed > 0) {
                this.x = this.getTileCollidingWith().getLeftSide();
            } else {
                this.x = this.getTileCollidingWith().getRightSide();
            }
            this.speed = 0;
            this.still = 0;
        }

//        this.vertVelocity += this.accelerationy;
        this.y += this.vertVelocity;

        if (this.isCollidingWithTile()) {
            if (this.vertVelocity > 0) {
                this.y = this.getTileCollidingWith().getTopSide();
                this.stopy();
                this.grounded = true;
            } else {
                this.y = this.getTileCollidingWith().getRightSide();
                this.accelerationy = this.accelGrav;
            }
        }
    };

    this.collidesWithGroundBelow = function () {

    };
    
    this.restart = function() {
        this.x = this.startx;
        this.y = this.starty;
        this.dead = false;
        this.speed = 0;
        this.vertVelocity = 0;
        this.accelerationy = 0;
        if (this.collidesWithGroundBelow()) {
            this.grounded = true;
            this.falling = false;
        } else {
            this.grounded = false;
            this.falling = true;
        }
        this.jumping = false;
        this.jumptime = false;
        this.canceljump = true;

    }

    this.getTileCollidingWith = function() { return this.tileCollidingWith; }
    this.update = function () 
    {

        // sliding horizontal movement
        if (this.still == true) {
            if (this.speed < 0) {
                this.speed = this.speed + 0.5
            }
            if (this.speed > 0) {
                this.speed = this.speed - 0.5
            }
        }

        // falling
        if (!this.grounded && !this.jumping) {
            this.vertVelocity += this.accelGrav;
        }
        
        // sets this.falling to true when its not on the ground and the vertical velocity is greater than or equal to 0
        if (this.vertVelocity >= 0 && !this.grounded) {
            this.falling = true;
        }

        // check to see if the player has hit the bottom of the screen        
        if (this.y + this.vertVelocity > this.canvas_h) {
            if (this.dead) { 
                this.restart();
                console.log(this.vertVelocity);
            } else {
                // this.falling = false;
                // this.y = this.canvas_h - this.w;
                // this.vertVelocity = 0;
                // this.grounded = true;
                // this.jumping = false;
                // this.jumptime = 0;
                this.speed = 0;
                this.dead = true;
                this.kill();
            }
        } else {
            this.y = this.y + this.vertVelocity
        }
        
        this.x = this.x + this.speed
        
//        console.log((shit.jumping == false || shit.jumptime <= 2));
    }
}