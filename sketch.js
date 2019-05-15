var shit;
var paused = false;
var canvas_s = [600, 400];
var level = {"collidables": [
    new CollisionRect(0,336,300,64),
    new CollisionRect(364,336,436,64)
], "drawElements": [
    {"rect": new CollisionRect(0,336,300,64),"fillcolor":"brown","strokecolor":"black"},
    {"rect": new CollisionRect(364,336,436,64),"fillcolor":"brown","strokecolor":"black"}
]}

function drawElements(xoffset) {
    level.drawElements.forEach(element => {
        rect(element.rect)
    });
}

function setup() {
    createCanvas(canvas_s[0], canvas_s[1]);
    shit = new Shit(canvas_s);
}

function keyInput() {
    if (keyIsDown(DOWN_ARROW)) {
        shit.Crouch()
    }
    if (keyIsDown(RIGHT_ARROW)) {
        shit.still = false;
        if (keyIsDown(SHIFT)) {
            if (shit.speed < 14) {
                shit.speed = shit.speed + 0.5;
            }
        } else {
            if (shit.speed < 8) {
                shit.speed = shit.speed + 0.5;
            }
        }
    }
    else if (keyIsDown(LEFT_ARROW)) {
        shit.still = false;
        if (keyIsDown(SHIFT)) {
            if (shit.speed > -14) {
                shit.speed = shit.speed - 0.5;
            }
        } else {
            if (shit.speed > -8) {
                shit.speed = shit.speed - 0.5;
            }
        }
    } else {
        shit.still = true;
    }
    if (keyIsDown(UP_ARROW) && (shit.jumptime <= 0.75 || shit.grounded) && !shit.falling && !shit.dead && !shit.canceljump) {
        console.log(shit.jumptime);   
        shit.Jump()
    }
}

//function keyReleased() {
//    if (key == UP_ARROW) {
//        
//    }
//}


function draw() 
{
    background(100, 200, 255);  // blueish background
    rect(545, 0, 55, 55);
    if (!paused) 
    {
        shit.update();
    }
    if (!paused) { keyInput(); }
    shit.show();
    fill(0, 102, 153);  // blueish color
    textSize(24);
}

/* Custom functions */

function keyReleased() {
    
}    

function keyPressed() 
{
//    if (!paused && keyCode === UP_ARROW) 
//    {
//        shit.Jump();
//    } 
    
    if (key === 'p') 
    {
        paused = !paused;
    }
}