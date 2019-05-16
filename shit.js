function Shit(canvas_size, collidables)
{
    this.canvasw_ = canvas_size[0];
    this.canvas_h = canvas_size[1];
    this.jumptime = 0;
    this.jumping = false;
    this.still = true;
    this.grounded = false;
    this.vertVelocity = 0;
    this.starty = 90;
    this.startx = 40;
    this.dead = false;
    this.x = 64;
    this.y = 64;
    this.w = 32;
    this.h = 32;
    this.img = loadImage("https://i.imgur.com/XghszQO.png");  // load image and set to variable
    this.accelGrav = 0.5;
    this.falling = true;
    this.tileCollidingWith = null;
    this.canceljump = false;
    this.collidables = collidables;
    this.accelerationy = 0;


    this.dir = 0;
    this.speed = 0;

    // jumps
    this.Jump = function () {
        this.grounded = false;
        this.falling = false;
        this.jumping = true;
        this.jumptime = this.jumptime + 0.1;
        this.vertVelocity = -10;
    };

    // place image on screen at given coordinates and size
    this.show = function ()
    {
        image(this.img, this.x, this.y, this.w,this.h);
    };
    
    
    //check collisions
    this.isCollidingWithTile = function() {
        var r2;
	    var index;
        this.tileCollidingWith = null;
        for (index=0;index < this.collidables.length ; index++) {
            r2 = this.collidables[index];
            if (this.x <= r2.x + r2.w && this.x >= r2.x && this.y + this.h >= r2.y && this.y <= r2.y + r2.h) { // condition to check rectangle intersection
                this.tileCollidingWith = r2; //set tile colliding with
                return true;
            }
        }
        return false; // no tile collided with; return false
    };


    //reset values
    this.restart = function() {
        this.jumptime = 0;
        this.jumping = false;
        this.still = true;
        this.grounded = false;
        this.vertVelocity = 0;
        this.starty = 90;
        this.startx = 40;
        this.dead = false;
        this.x = 64;
        this.y = 64;
        this.w = 32;
        this.h = 32;
        this.accelGrav = 0.5;
        // this.accelGrav = 0;
        this.falling = true;
        this.tileCollidingWith = null;
        this.canceljump = false;
        this.accelerationy = 0;
        this.speed = 0;
    };
    
    
    

    this.update = function ()
    {
        // sliding horizontal movement
        if (this.still == true) {
            if (this.speed < 0) {
                this.speed = this.speed + 0.5;
            }
            if (this.speed > 0) {
                this.speed = this.speed - 0.5;
            }
        }
        
        //x movement
        this.x += this.speed;
        
        // decide whether to do gravity or not
        if (!this.grounded || this.jumping) {
            this.accelerationy = this.accelGrav;
        } else {
            this.accelerationy = 0;
            this.vertVelocity = 0;
        }

        // y movement
        this.vertVelocity += this.accelerationy;
        this.y += this.vertVelocity;
        
        // y collisions
        if (this.isCollidingWithTile()) {
            this.falling = false;
            this.jumping = false;
            this.y = this.tileCollidingWith.y - this.h
            this.grounded = true;
        } else {
            this.falling = true;
            this.grounded = false;
        }
        
        //check if player has fallen off the screen
        if (this.y >= 400) {
            this.restart();
        }
        
    };
}
