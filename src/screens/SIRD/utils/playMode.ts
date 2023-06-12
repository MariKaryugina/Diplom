import p5Types from "p5";

import { Attractor, Community, Human, InfAttractor, Repeller } from "../models";

type ValuesRef = React.MutableRefObject<{
  population: number;
  humanSize: number;
  infectionChance: number;
  infectionRadius: number;
  oldPeoplePercent: number;
  socialDistanceFactor: number;
  infectionPersonToQurantin: number;
}>;

const width = 450;
const height = 450;

export const playMode = (
  people: Human[],
  p5: p5Types,
  mode: {
    market: boolean;
    community: boolean;
    quarantine: boolean;
  },
  valuesRef: ValuesRef,
) => {
  if (mode.market) {
    p5.noFill();
    p5.stroke(255, 0, 0, 150);
    p5.strokeWeight(1.5);
    p5.rect(width / 2, height / 2, 20, 20);
    p5.rectMode(p5.CENTER);

    const ball: Human = p5.random(people);
    const attract = new Attractor(p5);
    const force2 = attract.CalculateAttraction(ball);
    ball.applyForce(force2);
  }

  if (mode.community) {
    p5.noFill();
    p5.stroke(255);
    p5.strokeWeight(1.5);

    p5.rect(width / 4, height / 4, 222, 222);
    p5.rectMode(p5.CENTER);
    p5.rect(width / 4, 3 * (height / 4), 222, 222);
    p5.rectMode(p5.CENTER);
    p5.rect(3 * (width / 4), height / 4, 222, 222);
    p5.rectMode(p5.CENTER);
    p5.rect(3 * (width / 4), 3 * (height / 4), 222, 222);
    p5.rectMode(p5.CENTER);

    for (let ball of people) {
      const travel = new Community(width / 4, height / 4, p5);
      const travel1 = new Community(width / 4, 3 * (height / 4), p5);
      const travel2 = new Community(3 * (width / 4), height / 4, p5);
      const travel3 = new Community(3 * (width / 4), 3 * (height / 4), p5);

      const tra = travel.CalculateAttraction(ball);
      const tra1 = travel1.CalculateAttraction(ball);
      const tra2 = travel2.CalculateAttraction(ball);
      const tra3 = travel3.CalculateAttraction(ball);

      ball.applyForce(tra);
      ball.applyForce(tra1);
      ball.applyForce(tra2);
      ball.applyForce(tra3);
    }

    setTimeout(() => {
      if (p5.frameCount % 10 === 0) {
        const m = p5.random(people);
        var centeratt = new Attractor(p5);
        var tra4 = centeratt.CalculateAttraction(m);
        m.applyForce(tra4);
      };
    }, 8000);
  }

  if (mode.quarantine) {
    p5.noFill();
    p5.stroke(255, 0, 0, 150);
    p5.strokeWeight(1.5);
    p5.ellipse(width / 2, height / 2, 80, 80);
    p5.ellipseMode(p5.CENTER);
    for (let ball of people) {
      var repell = new Repeller(p5);
      var force3 = repell.CalculateRepulsion(ball);
      ball.applyForce(force3);

      const esc = p5.random(0, 1);
      if (ball.id === 'I' && esc < valuesRef.current.infectionPersonToQurantin) {
        var trans = new InfAttractor(p5);
        var shift = trans.CalculateInfAttraction(ball);
        ball.applyForce(shift);
      }
    }
  }
};
