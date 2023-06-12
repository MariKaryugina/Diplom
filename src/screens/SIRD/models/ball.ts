import p5Types from "p5";

const width = 450;
const height = 450;

export class Ball {
  mass: number;
  maxForce: number;
  maxSpeed: number;
  radius: number;
  acceleration: p5Types.Vector;
  velocity: p5Types.Vector;
  location: p5Types.Vector;

  constructor(r: number, p5: p5Types) {
    this.location = p5.createVector(p5.random(r, width - r), p5.random(r, height - r));
    this.velocity = window.p5.Vector.random2D();
    this.velocity.setMag(p5.random(2, 4));
    this.acceleration = new window.p5.Vector();
    this.mass = 1;
    this.maxForce = 0.3;
    this.maxSpeed = 1.5;
    this.radius = r;
  }

  applyForce(force: p5Types.Vector) {
    var f = window.p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  edges() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    } else if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y *= -1;
    } else if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
  }

  update() {
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }
}
