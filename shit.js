function Shit(canvas_size, collidables)
{
    this.canvasw_ = canvas_size[0];
    this.canvas_h = canvas_size[1];
    this.jumptime = 0;
    this.jumping = false;
    this.still = true;
    this.grounded = true;
    this.vertVelocity = 0;
    this.starty = 90;
    this.startx = 40;
    this.dead = false;
    this.x = 64;
    this.y = 64;
    this.w_ = 32;
    this.h_ = 32;
    this.img = loadImage("https://i.imgur.com/XghszQO.png");  // load image and set to variable
    this.accelGrav = 0.5;
    // this.accelGrav = 0;
    this.falling = false;
    this.tileCollidingWith = null;
    this.canceljump = false;
    this.collidables = collidables;
    this.accelerationy = 0;


    this.dir = 0;
    this.speed = 0;

    this.onHitGround = function() {
        this.canceljump = false;
    };

    this.Jump = function () {
        this.grounded = false;
        this.jumptime = this.jumptime + 0.1;
//        this.vertVelocity = - ( this.jumptime ^ 2 ) + 10 * this.jumptime
        this.vertVelocity = -10;
    };

    this.stop = function () {

    };

    this.Crouch = function () {

    };

    this.kill = function() {
        this.vertVelocity = -16;
    };

    this.getCollidables = function() {
        return this.collidables;
    };

    // place image on screen at given coordinates and size
    this.show = function ()
    {
        image(this.img, this.x, this.y, 32,32);
    };

    // update position of bird
    // change y
    // change direction if edge is hit

    this.isCollidingWithTile = function() {
        // console.log("collide check")
        var r2;
	      var index;
        this.tileCollidingWith = null;
        for (index = 0; index < this.getCollidables().length; index++) {
            r2 = this.getCollidables()[index].rect;
            console.log(!(r2.x > this.x+this.w_ || r2.x + r2.w_ < this.x || r2.y > this.y + this._h || r2.y + r2._h < this.y));
            if ((this.left <= r2.right &&
          r2.left <= this.right &&
          this.top <= r2.bottom &&
          r2.top <= this.bottom)) {
              this.tileCollidingWith = r2;
              return true;
            }
        }
        return false;
    };

    this.stopy = function() {
      this.accelerationy = 0;
      this.vertVelocity = 0;
    };

    this.restart = function() {
        this.x = this.startx;
        this.y = this.starty;
        this.dead = false;
        this.speed = 0;
        this.vertVelocity = 0;
        this.accelerationy = 0;
        this.grounded = false;
        this.falling = true;

        this.jumping = false;
        this.jumptime = false;
        this.canceljump = true;

    };

    this.getTileCollidingWith = function() { return this.tileCollidingWith; };
    this.update = function ()
    {
        // sliding horizontal movement
        console.log("update");
        if (this.still == true) {
            if (this.speed < 0) {
                this.speed = this.speed + 0.5;
            }
            if (this.speed > 0) {
                this.speed = this.speed - 0.5;
            }
        }

        console.log("update fall");
        // falling
        if (!this.grounded && !this.jumping) {
            this.vertVelocity += this.accelGrav;
        }

        // sets this.falling to true when its not on the ground and the vertical velocity is greater than or equal to 0
        if (this.vertVelocity >= 0 && !this.grounded) {
            this.falling = true;
        }


//        console.log((shit.jumping == false || shit.jumptime <= 2));

        console.log("update x");
        this.x += this.speed;

        if (this.isCollidingWithTile()) {
          if (this.speed > 0) {
            this.x = this.getTileCollidingWith().x + this.getTileCollidingWith().w;
          } else if (this.speed < 0) {
            this.x = this.getTileCollidingWith().x + this.w_;
          }
          this.speed = 0;
          this.still = 0;
        }

        console.log("update y");
        this.vertVelocity += this.accelerationy;
        this.y += this.vertVelocity;

        if (this.isCollidingWithTile() && this.vertVelocity != 0) {
          if (this.vertVelocity > 0) {
            this.y = this.getTileCollidingWith().y-this.getTileCollidingWith().h;
            this.stopy();
            this.grounded = true;
          } else if (this.vertVelocity < 0){
            this.y = this.getTileCollidingWith().y - this.h_;
            this.accelerationy = this.accelGrav;
          }
        }


        console.log("update hit ground");
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
        }
        console.log("done_update");
    };
}
