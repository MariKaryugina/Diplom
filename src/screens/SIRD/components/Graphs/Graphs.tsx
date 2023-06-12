import React, { useEffect } from 'react';

import Plot from 'react-plotly.js';
import { layout1, layout2 } from './constants';

const textByKey = {
  susceptible: { name: 'Восприимчивых', color: '#41E515' },
  exposed: { name: 'Носители', color: 'rgb(255, 115, 15)' },
  infected: { name: 'Зараженных', color: '#E51515' },
  recovered: { name: 'Выздоровевших', color: '#0983EA' },
  dead: { name: 'Умерших', color: '#534F5A' },
};

const transformToTrace = (
  prevData?: { y: number[], x: number[] },
  value: number,
  name: string,
  color: string,
  day: number,
) => ({
  x: prevData ? [...prevData.x, day] : [day],
  y: prevData ? [...prevData.y, value] : [value],
  name,
  type: 'line',
  marker: {
    color,
  },
});

type GraphsProps = {
  started: boolean;
  values: any;
  fullStatisticsRef: React.MutableRefObject<{
    susceptibleYoung: number;
    susceptibleOld: number;
    exposedYoung: number;
    exposedOld: number;
    infectedYoung: number;
    infectedOld: number;
    recoveredYoung: number;
    recoveredOld: number;
    deadYoung: number;
    deadOld: number;
  }>;
};

export const Graphs: React.FC<GraphsProps> = ({
  started,
  values,
  fullStatisticsRef,
}) => {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const [ended, setEnded] = React.useState(false);
  const [day, setDay] = React.useState(0);
  const [data, setData] = React.useState<any[]>([]);

  const reset = () => {
    setDay(0);
    setData([]);
    setEnded(false);
  };

  useEffect(() => {
    if (!started) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      reset();
    }
  }, [started]);

  useEffect(() => {
    if (ended) {
      return;
    }

    // END
    if (!values.current.infected && day && !ended) {
      const newData = Object.keys(values.current).map((key) => {
        const { name, color } = (textByKey as any)[key];
        const prevData = data?.find(({ name: alrName }) => name === alrName);

        return transformToTrace(prevData, values.current[key], name, color, day);
      });

      setDay(day + 1);
      setData(newData);
      setEnded(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const newData = Object.keys(values.current).map((key) => {
        const { name, color } = (textByKey as any)[key];
        const prevData = data?.find(({ name: alrName }) => name === alrName);

        return transformToTrace(prevData, values.current[key], name, color, day);
      });

      setDay(day + 1);
      setData(newData);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, ended]);

  if (!data) {
    return null;
  }

  const {
    susceptibleOld,
    susceptibleYoung,
    exposedYoung,
    exposedOld,
    infectedOld,
    infectedYoung,
    recoveredOld,
    recoveredYoung,
    deadOld,
    deadYoung,
  } = fullStatisticsRef.current;

  return (
    <>
      <Plot
        key={`${started}`}
        data={data}
        layout={layout1 as any}
      />

      <Plot
        data={[
          {
            x: ['Старые', 'Молодые'],
            y: [susceptibleOld, susceptibleYoung],
            width: [0.6, 0.6],
            name: 'Восприимчивых',
            type: 'bar',
            marker: {
              color: '#41E515'
            }
          }, {
            x: ['Старые', 'Молодые'],
            y: [exposedOld, exposedYoung],
            width: [0.6, 0.6],
            name: 'Носители',
            type: 'bar',
            marker: {
              color: 'rgb(255, 115, 15)'
            }
          },{
            x: ['Старые', 'Молодые'],
            y: [infectedOld, infectedYoung],
            width: [0.6, 0.6],
            name: 'Зараженных',
            type: 'bar',
            marker: {
              color: '#E51515'
            }
          }, {
            x: ['Старые', 'Молодые'],
            y: [recoveredOld, recoveredYoung],
            width: [0.6, 0.6],
            name: 'Выздоровевших',
            type: 'bar',
            marker: {
              color: '#0983EA'
            }
          }, {
            x: ['Старые', 'Молодые'],
            y: [deadOld, deadYoung],
            width: [0.6, 0.6],
            name: 'Умерших',
            type: 'bar',
            marker: {
              color: '#534F5A'
            }
          }
        ]}
        layout={layout2 as any}
      />
    </>
  );
};
