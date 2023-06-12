import { Human } from "../models";

type FullStatisticRef = React.MutableRefObject<{
  susceptibleYoung: number;
  susceptibleOld: number;
  exposedOld: number;
  exposedYoung: number;
  infectedYoung: number;
  infectedOld: number;
  recoveredYoung: number;
  recoveredOld: number;
  deadYoung: number;
  deadOld: number;
}>;

type StatisticRef = React.MutableRefObject<{
  susceptible: number;
  exposed: number;
  infected: number;
  recovered: number;
  dead: number;
}>;

export const updateStats = (
  people: Human[],
  statisticRef: StatisticRef,
  fullStatisticRef: FullStatisticRef,
) => {
  let susceptibleOld = 0;
  let susceptibleYoung = 0;
  let exposedOld = 0;
  let exposedYoung = 0;
  let infectedOld = 0;
  let infectedYoung = 0;
  let deadOld = 0;
  let deadYoung = 0;
  let recoveredOld = 0;
  let recoveredYoung = 0;

  for (let ball of people) {
    if (ball.id === 'S') {
      ball.age ? susceptibleYoung++ : susceptibleOld++;
    }
    if (ball.id === 'E') {
      ball.age ? exposedYoung++ : exposedOld++;
    }
    if (ball.id === 'I') {
      ball.age ? infectedYoung++ : infectedOld++;
    }
    if (ball.id === 'R') {
      ball.age ? recoveredYoung++ : recoveredOld++;
    }
    if (ball.id === 'D') {
      ball.age ? deadYoung++ : deadOld++;
    }
  }

  fullStatisticRef.current = {
    susceptibleYoung,
    susceptibleOld,
    exposedYoung,
    exposedOld,
    infectedYoung,
    infectedOld,
    recoveredYoung,
    recoveredOld,
    deadOld,
    deadYoung,
  }

  statisticRef.current = {
    susceptible: susceptibleYoung + susceptibleOld,
    exposed: exposedYoung + exposedOld,
    infected: infectedYoung + infectedOld,
    recovered: recoveredYoung + recoveredOld,
    dead: deadYoung + deadOld,
  };
};
