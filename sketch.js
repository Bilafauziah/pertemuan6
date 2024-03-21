let judul;
let nama;
let tombol;
let hello;
let objek;
let jalan = false;
let gravForce;
let windForce;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tombol = createButton('run/stop')
  tombol.position(30,110)
  
  objekPos = createVector(width/4,height/5);
  objekVel = createVector(0,0);
  objekAcc = createVector(0,0);
  objekMass = 10;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  
  gravForce = createVector(0, objek.mass*0.1);
  windForce = createVector(0.5, 0);
}


function draw() {
  background(240,255,240);
  nama = createElement('h2', 'Fauziah Ana Nabila, 122160027')
  nama.position(30, 50)
  judul = createElement('h2', 'Simulasi Hk Newton')
  judul.position(30, 15)
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/2;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**2) *A1*Cd)

  
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  
  tombol.mousePressed(run);
  
  if (jalan){
    objek.update();
  }
  
}

function sayHello() {
  hello = createElement('h2', 'Selamat datang ' + nama.value())
  hello.position(30, 150)
}

function run(){
  // objek.update();
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    //badan
    stroke(139,69,19);
    fill('yellow')
    rect(this.location.x-100, this.location.y+57, 5*this.mass, 5*this.mass);
    //mata
    stroke(0,0,0);
    fill('white')
    ellipse(this.location.x-86, this.location.y+76, 8/7*this.mass, 8/5*this.mass);
      ellipse(this.location.x-66, this.location.y+76, 8/7*this.mass, 8/5*this.mass);
    //dalam mata
    fill('black')
    ellipse(this.location.x-86, this.location.y+76, 1*this.mass, 1*this.mass);
      ellipse(this.location.x-66, this.location.y+76, 1*this.mass, 1*this.mass);
    stroke(0,0,0);
    //mulut
    stroke(0,0,0);
    fill('red')
    ellipse(this.location.x-76, this.location.y+89, 4/2*this.mass, 2/2*this.mass);
    //bolongan
    fill('brown')
    ellipse(this.location.x-89, this.location.y+98, 3/5*this.mass, 3/5*this.mass);
    ellipse(this.location.x-60, this.location.y+98, 3/5*this.mass, 3/5*this.mass);
    ellipse(this.location.x-90, this.location.y+63, 3/5*this.mass, 3/5*this.mass);
    ellipse(this.location.x-60, this.location.y+63, 3/5*this.mass, 3/5*this.mass);
  }  
  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }
}
