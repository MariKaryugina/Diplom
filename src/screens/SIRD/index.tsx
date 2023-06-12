import React from "react";

import Sketch from "react-p5";
import p5Types from "p5";

import { Human } from "./models";
import { Box, Button, IconButton } from "@mui/material";
import { useRef } from "react";
import { Graphs, Sliders, Stats } from "./components";
import { Container } from "./styled";
import { playMode, updateStats } from "./utils";
import { useStatisticStore } from "../../store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router";

let people: Human[] = [];
const mode = {
  market: false,
  quarantine: false,
  community: false,
};

export const Simulator = () => {
  const p5Ref = useRef<p5Types>();

  const [started, setStarted] = React.useState(false);
  const [isLatentPeriodActive, setIsLatentPeriodActive] = React.useState(true);
  const [isDeadAvailable, setIsDeadAvailable] = React.useState(true);

  const updateStatistic = useStatisticStore((state: any) => state.updateStatistic);

  const valuesRef = useRef({
    population: 50,
    humanSize: 6,
    infectionChance: 0.02,
    infectionRadius: 20,
    oldPeoplePercent: 20,
    socialDistanceFactor: 0,
    infectionPersonToQurantin: 0.6,
    latentPeriod: 5,
    deathProbabilityY: 0.02,
    deathProbabilityO: 0.2,
    periodBeforeRecover: 10,
  });

  const statisticsRef = useRef({
    susceptible: 50,
    exposed: 0,
    infected: 0,
    recovered: 0,
    dead: 0,
  });

  const fullStatisticsRef = useRef({
    susceptibleYoung: 0,
    susceptibleOld: 0,
    exposedYoung: 0,
    exposedOld: 0,
    infectedYoung: 0,
    infectedOld: 0,
    recoveredYoung: 0,
    recoveredOld: 0,
    deadYoung: 0,
    deadOld: 0,
  });

  const initNewPopulation = (p5: p5Types) => {
    for (let i = 0; i < valuesRef.current.population; i++) {
      people.push(new Human(valuesRef.current.humanSize, p5));
    }

    for (let ball of people) {
      ball.per_age(valuesRef.current.oldPeoplePercent);
    }

    // infect 1 random human
    const p = p5.random(people);
    p.id = 'I';
    p.colour = p5.color(255, 0, 0);
  }

  const resetSketch = () => {
    setStarted(false);

    people = [];
    mode.market = false;
    mode.community = false;
    mode.quarantine = false;

    initNewPopulation(p5Ref.current!);
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(450, 450).parent(canvasParentRef);

    people = [];
    initNewPopulation(p5);
  }

  const draw = (p5: p5Types) => {
    if (!started) {
      setStarted(true);
    }

    const {
      latentPeriod,
      infectionChance,
      infectionRadius,
      deathProbabilityO,
      deathProbabilityY,
      socialDistanceFactor,
      periodBeforeRecover,
    } = valuesRef.current;

    if (latentPeriod && !isLatentPeriodActive) {
      setIsLatentPeriodActive(true);
    }
    if (latentPeriod === 0 && isLatentPeriodActive) {
      setIsLatentPeriodActive(false);
    }

    if ((deathProbabilityO || deathProbabilityY) && !isDeadAvailable) {
      setIsDeadAvailable(true);
    }
    if (deathProbabilityY === 0 && deathProbabilityO === 0 && isDeadAvailable) {
      setIsDeadAvailable(false);
    }

    p5Ref.current = p5;

    p5.background(0);

    for (let ball of people) {
      ball.edges();
      ball.socialDistance(people, infectionRadius, socialDistanceFactor);
      ball.update();
      ball.infect(infectionRadius, people, infectionChance, latentPeriod);
      ball.recover(people, periodBeforeRecover, deathProbabilityY, deathProbabilityO);
      ball.show();
    }

    updateStats(people, statisticsRef, fullStatisticsRef);

    updateStatistic({
      ...statisticsRef.current,
    });

    playMode(people, p5, mode, valuesRef);
  }

  const navigate = useNavigate();

  return (
    <div style={{ background: 'black', height: '100%' }}>
      <Box style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
        <Box style={{ display: 'flex', gap: '12px' }}>
          <IconButton onClick={() => navigate('/')}>
            <ArrowBackIcon style={{ color: 'cornsilk' }} fontSize='large' />
          </IconButton>
        </Box>
      </Box>

      <Container>
        <Stats isLatentPeriodActive={isLatentPeriodActive} isDeadAvailable={isDeadAvailable} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Sliders valuesRef={valuesRef} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: 'column' }}>
            <div style={{ border: '0.5px solid white' }}>
              <Sketch setup={setup} draw={draw} />
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <Button style={{ background: 'white', color: 'black' }} variant="contained" onClick={() => resetSketch()}>
                Заново
              </Button>

              <Button
                variant="contained"
                style={{ background: 'white', color: 'black' }}
                onClick={() => {
                  mode.community = false;
                  mode.market = true;
                  mode.quarantine = false;
                }}
              >
                Торговый центр
              </Button>

              <Button
                variant="contained"
                style={{ background: 'white', color: 'black' }}
                onClick={() => {
                  mode.community = false;
                  mode.market = false;
                  mode.quarantine = true;
                }}
              >
                Карантин
              </Button>

              <Button
                variant="contained"
                style={{ background: 'white', color: 'black' }}
                onClick={() => {
                  mode.community = true;
                  mode.market = false;
                  mode.quarantine = false;
                }}
              >
                Сообщества
              </Button>
            </div>
          </div>

          <div style={{ width: '800px', display: 'flex', flexDirection: 'column', gap: '100px' }}>
            <Graphs started={started} values={statisticsRef} fullStatisticsRef={fullStatisticsRef} />
          </div>
        </div>

        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Sliders valuesRef={valuesRef} />
          </div>

          <div style={{ width: '800px' }}>
            <Graphs started={started} values={statisticsRef} fullStatisticsRef={fullStatisticsRef} />
          </div>
        </div> */}
      </Container>
    </div>
  );
};
