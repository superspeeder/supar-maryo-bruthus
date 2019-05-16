var shit;
var paused = false;
var canvas_s = [600, 400];
var level = {"collidables": [
    new CollisionRect(0,336,220,64),
    new CollisionRect(364,336,436,64)
], "drawElements": [
    {"rect": new CollisionRect(0,336,220,64),"fillcolor":"brown","strokecolor":"black"},
    {"rect": new CollisionRect(364,336,436,64),"fillcolor":"brown","strokecolor":"black"},
    {"rect": new CollisionRect(570,0,10,336),"fillcolor":"green","strokecolor":"black"}
]};

function drawElements(xoffset) {
    level.drawElements.forEach(element => {
      stroke(element.strokecolor);
      fill(element.fillcolor);
      rect(element.rect.x,element.rect.y,element.rect.w,element.rect.h);
    });
}

function setup() {
    createCanvas(canvas_s[0], canvas_s[1]);
    shit = new Shit(canvas_s, level.collidables);
}

function keyInput() {
    if (keyIsDown(DOWN_ARROW)) {
        shit.Crouch()
    }
    if (keyIsDown(RIGHT_ARROW)) {
        shit.still = false;        
        if (shit.speed < 5) {
            shit.speed = shit.speed + 0.5;
        }
    }
    else if (keyIsDown(LEFT_ARROW)) {
        shit.still = false;
        if (shit.speed > -5) {
            shit.speed = shit.speed - 0.5;
        }
    } else {
        shit.still = true;
    }
    if (keyIsDown(UP_ARROW) && (shit.jumptime <= 0.75 || shit.grounded) && !shit.falling && !shit.dead && !shit.canceljump) {
        console.log(shit.jumptime);
        shit.Jump()
    }
}



function draw()
{
    background(100, 200, 255);  // blueish background
    drawElements();
    
    // check if won
    if (shit.x >= 580) {
        shit.w = 400;
        shit.h = 400;
        shit.x = 100;
        shit.y = 0;
        paused = true;
        document.getElementById("wl").innerHTML = "You won!";
    }
    
    //check if paused
    if (!paused)
    {
        shit.update();
    }
    if (!paused) { keyInput(); } // do key input
    shit.show(); // show player
}

/* Custom functions */


function keyPressed()
{

    if (key === 'p')
    {
        paused = !paused;
    }
}
