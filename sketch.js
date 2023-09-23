// let particle;
let particles;

function setup() {
  createCanvas(400, 400);
  noStroke(); //no outlines
  
  particles = []
  
  makeFirework(width/2,height/2);
  
//   for (let i = 0; i < 250; i++) {
//     let p = new Particle();
//     p.x = width/2;
//     p.y = height/2;
    
//     // p.velX = random(-1,1); //cartesian velocities
//     // p.velY = random(-1,1);
    
//     let angle = random(0,2*PI);
//     let vel = random(0,1);
    
//     p.velX = vel * cos(angle);
//     p.velY = vel * sin(angle);
    
//     p.r = random(0,255)
//     p.g = random(0,255)
//     p.b = random(0,255)
    
//     particles.push(p)
  // }
  
  // particle = new Particle();
  //particle.x = 0
  //partifle.y = 0
}

function draw() {
  let opacity = 10
  background(70,30,45,opacity);
  
  let transparency = 150
  
  for (let i = 0; i < particles.length; i++) {
    fill(particles[i].r,particles[i].g,particles[i].b, transparency)

    circle(particles[i].x,particles[i].y,10)
    particles[i].x += particles[i].velX;
    particles[i].y += particles[i].velY;
    
    particles[i].velY += 0.0098;
  }
  
  killParticles();
  
  // circle(variable,height/2, 100);
  // circle(width/3,height/1.5,50);
  
  // variable++;
  
}

function makeFirework(x,y) {
  // particles = []
  
  for (let i = 0; i < 50; i++) {
    let p = new Particle();
    p.x = x;
    p.y = y;
    
    // p.velX = random(-1,1); //cartesian velocities
    // p.velY = random(-1,1);
    
    let angle = random(0,2*PI);
    let vel = random(0,1);
    
    p.velX = vel * cos(angle);
    p.velY = vel * sin(angle);
    
    p.r = random(0,255)
    p.g = random(0,255)
    p.b = random(0,255)
    
    particles.push(p)
  }
  

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