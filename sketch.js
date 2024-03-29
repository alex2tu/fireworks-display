let particles;
let creditText, githubLink;

// function preload() { 
    //in case needed to add fonts
// }

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke(); //no outlines

    // let opacity = 10
    background(70,30,45);

    particles = []

    creditText = 'Built using p5.js by @alex2tu'
    // githubLink = createA('https://github.com/alex2tu/fireworks-display', 'GitHub')

    makeFirework(width/2,height/2);
}

// function windowResized() { //unnecessary for now
//     resizeCanvas(windowWidth,windowHeight, false);
// }

function draw() {
    let opacity = 25
    background(70,30,45,opacity);

    drawText();

    for (let i = 0; i < particles.length; i++) {
        fill(particles[i].r,particles[i].g,particles[i].b, particles[i].opacity)

        circle(particles[i].x,particles[i].y,8)
        particles[i].x += particles[i].velX;
        particles[i].y += particles[i].velY;

        particles[i].velY += 0.012;
        particles[i].lifespan -= 1;
        particles[i].opacity -= 1;
    }

    killParticles();
}

// function drawButton() {
//     fill
// }

function drawText() {
    textSize(14);
    fill(0);
    textFont('Verdana')
    fill('white')
    // githubLink.position(227,windowHeight-24);
    text(creditText, 5, windowHeight-9);
}

function makeFirework(x,y) {
    shape = randomShape();
    switch(shape) {
    case "standard":
        standardFirework(x,y);
        break
    case "star":
        starFirework(x,y);
        break
    case "circle":
        circleFirework(x,y);
        break
    case "spiral":
        archimedesSpiral(x,y);
        break
    case "rose":
        roseCurve(x,y)
        break
    }


}

function mousePressed() {
    makeFirework(mouseX,mouseY)
}

function killParticles() {
    let aliveParticles = []
    for (let i = 0; i < particles.length; i++) {
        if ((particles[i].lifespan > 0) && (particles[i].y <= height)) {
            aliveParticles.push(particles[i])
        }
    }
    particles = aliveParticles;
}

function randomShape() {
    choices = ["standard","star","circle","spiral","rose"]
    return random(choices)
}

function standardFirework(x,y) {
    for (let i = 0; i < 50; i++) {
        let p = new Particle(x,y);

        // p.velX = random(-1,1); //cartesian velocities
        // p.velY = random(-1,1);

        let angle = random(0,2*PI);
        let vel = random(0.2,1.5);

        p.velX = vel * cos(angle);
        p.velY = vel * sin(angle);

        p.r = random(0,255)
        p.g = random(0,255)
        p.b = random(0,255)

        particles.push(p)
    }
}

function starFirework(x,y) {
    r = random(0,255)
    g = random(0,255)
    b = random(0,255)
    let starAngleOffset = random(PI/2, -PI/2);
    for (let i = 0; i < 75; i++) {
        let p = new Particle(x,y);

        let m = 3
        let n = 5
        let k = 1
        let angle = random(0,2*PI);
        // let t = angle / 180 * PI;
        let t = angle + starAngleOffset;
        let numerator = cos((2 * asin(k) + PI*m) / (2*n)) 
        let denominator = cos((2*asin(k*cos(n*t))+PI*m)/(2*n))
        let radius = numerator / denominator;

        // let radius = sin(angle)
        let vel = radius

        p.velX = cos(angle) * vel;
        p.velY = sin(angle) * vel;

        p.r = r
        p.g = g
        p.b = b

        particles.push(p)
    }
}
  
function circleFirework(x,y) {
    r = random(5,250)
    g = random(5,250)
    b = random(5,250)
    for (let i = 0; i < 50; i++) {
        let p = new Particle(x,y)
        let angle = random(0,2*PI)

        // let radius = (cos(angle))**2 + (sin(angle))**2
        let radius = 1
        // let vel = radius

        p.velX = cos(angle) * radius;
        p.velY = sin(angle) * radius;

        dR = random(-15,15)
        dG = random(-15,15)
        dB = random(-15,15)
        p.r = r + dR
        p.g = g + dG
        p.b = b + dB

        particles.push(p)
    }
}

function archimedesSpiral(x,y) {
    let r = random(65,125)
    let g = random(40,90)
    let b = random(65,125)
    let dColor = random(15,70)
    // print(dColor)
    let angle = random(0,2*PI)
    for (let i = 0; i < 60; i++) {
        let p = new Particle(x,y)
        
        let radius = angle 
        //r = theta archimedes spiral equation
        angle += PI/12
        
        let vel = radius/17
        
        p.velX = vel * cos(angle);
        p.velY = vel * sin(angle);
        
        // print(r,g,b)
        p.r = r + dColor
        p.g = g + dColor
        p.b = b + dColor
        
        dColor *= -1
        particles.push(p)
    }
}

function roseCurve(x,y) {
    r = random(5,250)
    g = random(5,250)
    b = random(5,250)
    let coefficient = int(random(2,7))
    // print(coefficient)
    let extraParticles = coefficient*17
    for (let i = 0; i < 60+extraParticles; i++) {
        let p = new Particle(x,y)
        let angle = random(0,2*PI)
        choices = ["sin","cos"]
        let radius = 0;

        switch(random(choices)) {
            case "sin":
                radius = (9/7)*sin(coefficient*angle)
                break
            case "cos":
                radius = (9/7)*cos(coefficient*angle)
                break
        }
        //r = a * cos(n*theta) or a* sin(n*theta)
        
        let vel = radius
        
        p.velX = vel * cos(angle);
        p.velY = vel * sin(angle);
        
        // print(r,g,b)
        p.r = r
        p.g = g
        p.b = b
        
        particles.push(p)
    }
}