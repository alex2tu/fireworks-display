// let particle;
let particles;

function setup() {
  createCanvas(400, 400);
  noStroke(); //no outlines
  
  particles = []
  
  makeFirework(width/2,height/2);
}

function draw() {
  let opacity = 10
  background(70,30,45,opacity);
  
  let transparency = 150
  
  for (let i = 0; i < particles.length; i++) {
    fill(particles[i].r,particles[i].g,particles[i].b, transparency)

    circle(particles[i].x,particles[i].y,8)
    particles[i].x += particles[i].velX;
    particles[i].y += particles[i].velY;
    
    particles[i].velY += 0.01;
  }
  
  killParticles();
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
  }
  // circleFirework(x,y);


}

function mousePressed() {
  makeFirework(mouseX,mouseY)
}

function killParticles() {
  let aliveParticles = []
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].y <= height) {
      aliveParticles.push(particles[i])
    }
  }
  particles = aliveParticles;
}

function randomShape() {
  choices = ["standard","star","circle"]
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
    
    let radius = (cos(angle))**2 + (sin(angle))**2
    let vel = radius
    
    p.velX = cos(angle) * vel;
    p.velY = sin(angle) * vel;
    
    dR = random(-15,15)
    dG = random(-15,15)
    dB = random(-15,15)
    p.r = r + dR
    p.g = g + dG
    p.b = b + dB
    
    particles.push(p)
  }
}