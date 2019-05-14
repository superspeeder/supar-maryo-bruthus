// @date 05/01/2019
// @author cool kid

function Shit(canvas_size) 
{
    this.canvas_w = canvas_size[0];
    this.canvas_h = canvas_size[1];
    this.jumptime = 0;
    this.jumping;
    this.still = true;
    this.grounded = true;
    this.vertVelocity = 0;
    this.x = 64;
    this.y = 300;
    this.w = 56;
    this.img = loadImage("https://i.imgur.com/XghszQO.png");  // load image and set to variable
    this.accelGrav = 0.5;
    this.falling = false;
    this.tileCollidingWith = null;
    
    
    this.dir = 0;
    this.speed = 0;
    
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
            if (this.x < other.x + other.width && this.x + this.width > other.x && this.y < other.y + other.height && this.y + this.height > other.y) {
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
    }
    
    this.getTileCollidingWith = function() { return this.tileCollidingWith; }
    this.update = function () 
    {
        if (this.still == true) {
            if (this.speed < 0) {
                this.speed = this.speed + 0.5
            }
            if (this.speed > 0) {
                this.speed = this.speed - 0.5
            }
        }
        if (!this.grounded && !this.jumping) {
            this.vertVelocity += this.accelGrav;
        }
        
        if (this.vertVelocity >= 0 && !this.grounded) {
            this.falling = true;
        }
        
        if (this.y + this.vertVelocity > this.canvas_h) {
            this.falling = false;
            this.y = this.canvas_h - this.w;
            this.vertVelocity = 0;
            this.grounded = true;
            this.jumping = false;
            this.jumptime = 0;
            
        } else {
            this.y = this.y + this.vertVelocity
        }
        
        this.x = this.x + this.speed
//        console.log((shit.jumping == false || shit.jumptime <= 2));
    }
}