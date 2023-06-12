import { Ball } from "./ball";

import p5Types from "p5";

export class Human extends Ball {
  id: string;
  age: boolean;
  colour: p5Types.Color;
  timer_on: boolean;
  p5: p5Types

  constructor(r: number, p5: p5Types) {
    super(r, p5);
    this.id = 'S';
    this.age = true;
    this.colour = p5.color(252, 252, 51);
    this.timer_on = false;
    this.p5 = p5;
  }

  //Initialize a certain percent of population as old
  per_age(l: number) {
    var m = this.p5.random(0, 1);
    if (m < (l / 100)) {
      this.age = false;
      this.colour = this.p5.color(42, 188, 57);
    }
  }
  // //Check for intersection
  intersects(other: Human, perceptionRadius: number) {
    let d = this.p5.dist(this.location.x, this.location.y, other.location.x, other.location.y);

    if (d < perceptionRadius) {
      return true;
    } else { return false }
  }
  // //Method to simulate infection spread.
  infect(perceptionRadius: number, people: Human[], probInfection: number, latentPeriod: number) {
    for (let other of people) {
      const cond = this.intersects(other, perceptionRadius);

      if (!cond || other == this) {
        return;
      }

      const m = this.p5.random(0, 1);

      if (m > probInfection) return;

      let person: Human | null = null;

      if (other.id === 'S' && (this.id === 'I' || this.id === 'E')) { person = other; }
      if (this.id === 'S' && (other.id === 'I' || other.id === 'E')) { person = this; }

      if (!person) return;

      person.id = latentPeriod ? 'E' : 'I';
      person.colour = latentPeriod ? this.p5.color(255, 115, 15) : this.p5.color(255, 0, 0);

      if (latentPeriod) {
        setTimeout(() => { person!.id = 'I'; person!.colour = this.p5.color(255, 0, 0); }, latentPeriod * 1000);
      }

      this.ring(this.location.x, this.location.y, perceptionRadius);
    }
  }
  // //Method to simulate recovery of human.
  recover(people: Human[], periodBeforeRecover: number, deathProbabilityY: number, deathProbabilityO: number) {
    for (let other of people) {
      if (other.id === 'I' && other.timer_on == false) {
        setTimeout(function () { other.recovery(other, deathProbabilityY, deathProbabilityO) }, periodBeforeRecover * 1000);
        other.timer_on = true;
      }
    }
  }
  // //Ring animation effect
  ring(x: number, y: number, rad: number) {
    this.p5.stroke(255, 0, 0, 150);
    this.p5.strokeWeight(4);
    this.p5.noFill();
    this.p5.ellipse(x, y, rad * 2, rad * 2);
  }
  // //Sub-method of Recover, checks for chances that an individual recovers or dies based on his/her age group.
  // //Statistical Data of mortality rates acquired from COVID-19 Age data from Worldometer.
  recovery(ball: Human, deathProbabilityY: number, deathProbabilityO: number) {
    const chance = this.p5.random(0, 1);

    const deathProbability = 1 - (ball.age ? deathProbabilityY : deathProbabilityO);

    if (chance <= deathProbability) {
      ball.id = 'R';
      ball.colour = ball.age ? this.p5.color(33, 232, 217) : this.p5.color(0, 0, 255);
    } else {
      ball.id = 'D';
      ball.colour = this.p5.color(0, 0);
    }
  }
  // //Death of Human.
  // death(ball: Human) {
  //   ball.id = 'D';
  //   ball.colour = this.p5.color(0, 0);
  // }
  // //Implementation of Social Distancing among humans
  socialDistance(people: Human[], perceptionRadius: number, socio: number) {
    let steering = this.p5.createVector();
    let counter = 0;

    for (let other of people) {
      let d1 = this.p5.dist(
        this.location.x,
        this.location.y,
        other.location.x,
        other.location.y
      );

      if (other != this && d1 < (perceptionRadius * 1.2)) {
        let diff = window.p5.Vector.sub(this.location, other.location);
        diff.normalize();
        steering.add(diff);
        counter++;
      }
    }

    if (counter > 0) {
      steering.div(counter);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }

    let separation = steering;
    separation.mult(socio);
    this.acceleration.add(separation);
  }

  show() {
    this.p5.fill(this.colour);
    this.p5.noStroke()
    this.p5.ellipse(this.location.x, this.location.y, this.radius, this.radius);
  }
}
