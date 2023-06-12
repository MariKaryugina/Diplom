import p5Types from "p5";
import { Human } from "./human";

const width = 450;
const height = 450;

//Attractor class used in Central Loaction mode
export class Attractor {
  location: p5Types.Vector;
  mass: number;
  G: number;
  p5: p5Types;

  constructor(p5: p5Types) {
    this.location = p5.createVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 800;
    this.p5 = p5;
  }

  CalculateAttraction(m: Human) {
    var force = window.p5.Vector.sub(this.location, m.location);
    var distance = force.mag();
    distance = this.p5.constrain(distance, 2, 150);
    force.normalize();
    var strength = (this.G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);

    return force;
  }
}

//Attract infected humans to the quarantine zone.
export class InfAttractor {
  location: p5Types.Vector;
  mass: number;
  G: number;
  p5: p5Types;

  constructor(p5: p5Types) {
    this.location = p5.createVector(width / 2, height / 2);
    this.mass = 20;
    this.G = 30;
    this.p5 = p5;
  }

  CalculateInfAttraction(m: Human) {
    var force = window.p5.Vector.sub(this.location, m.location);
    var distance = force.mag();
    distance = this.p5.constrain(distance, 2, 150);
    force.normalize();
    var strength = (this.G * this.mass * m.mass) / (distance * distance);
    if (distance < 15) {
      force.mult(strength / 10);
    } else
      force.mult(strength);
    return force;
  }
}

export class Community extends Attractor {
  constructor(x: number, y: number, p5: p5Types) {
    super(p5);

    this.location = p5.createVector(x, y);
    this.G = 8;
  }

  CalculateAttraction(m: Human) {
    let force = window.p5.Vector.sub(this.location, m.location);
    let distance = force.mag();

    distance = this.p5.constrain(distance, 40, 800);
    force.normalize();

    const strength = (this.G * this.mass * m.mass) / (distance * distance);
    if (distance < 100 && distance > 45) {
      force.mult(strength / 1.2);
    } else if (distance < 45) {
      force.mult(-1 * (strength / 3));
    }
    else {
      force.mult(strength / 2);
    }

    return force;
  }
}

export class Repeller {
  location: p5Types.Vector;
  mass: number;
  G: number;
  p5: p5Types;

  constructor(p5: p5Types) {
    this.location = p5.createVector(width / 2, height / 2);
    this.mass = 5;
    this.G = 20;
    this.p5 = p5;
  }

  CalculateRepulsion(m: Human) {
    const force = window.p5.Vector.sub(this.location, m.location);
    let distance = force.mag();
    distance = this.p5.constrain(distance, 2, 400);
    force.normalize();
    const strength = -(this.G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }
}
