import { Slider } from "@mui/material";
import React from "react";

const items = [
  { label: 'Размер популяции', key: 'population', sliderProps: { min: 10, max: 200, step: 10, marks: [{ value: 10, label: '10', }, { value: 100, label: '100' }, { value: 200, label: '200' }] } },
  { label: 'Размер человека(точки)', key: 'humanSize', sliderProps: { min: 4, max: 8, step: 1, marks: [{ value: 4, label: '4', }, { value: 6, label: '6' }, { value: 8, label: '8' }] } },
  { label: 'Вероятность заражения', key: 'infectionChance', sliderProps: { min: 0.01, max: 0.1, step: 0.01, marks: [{ value: 0.01, label: '1%', }, { value: 0.05, label: '5%' }, { value: 0.1, label: '10%' }] }  },
  { label: 'Инкубационный период', key: 'latentPeriod', sliderProps: { min: 0, max: 14, step: 1, marks: [{ value: 0, label: '0', }, { value: 7, label: '7' }, { value: 14, label: '14' }] }  },
  { label: 'Радиус заражения', key: 'infectionRadius', sliderProps: { min: 10, max: 30, step: 2, marks: [{ value: 10, label: '10', }, { value: 20, label: '20' }, { value: 30, label: '30' }] } },
  { label: 'Процент старых людей', key: 'oldPeoplePercent', sliderProps: { min: 20, max: 80, step: 10, marks: [{ value: 20, label: '20%', }, { value: 50, label: '50%' }, { value: 80, label: '80%' }] } },
  { label: 'Смертность молодых людей', key: 'deathProbabilityY', sliderProps: { min: 0, max: 0.05, step: 0.01, marks: [{ value: 0.01, label: '1%', }, { value: 0.05, label: '5%' }] } },
  { label: 'Смертность пожилых людей', key: 'deathProbabilityO', sliderProps: { min: 0, max: 0.3, step: 0.01, marks: [{ value: 0, label: '0%', }, { value: 0.15, label: '15%' }, { value: 0.3, label: '30%' }] } },
  { label: 'Период болезни', key: 'periodBeforeRecover', sliderProps: { min: 0, max: 20, step: 1, marks: [{ value: 0, label: '0', }, { value: 10, label: 10 }, { value: 20, label: '20' }] } },
  { label: 'Фактор соц. дистанции', key: 'socialDistanceFactor', sliderProps: { min: 0, max: 0.5, step: 0.1, marks: [{ value: 0, label: '0', }, { value: 0.5, label: '0.5' }] } },
  { label: 'Вероятность того, что зараженный человек находится на карантине', key: 'infectionPersonToQurantin', sliderProps: { min: 0.3, max: 0.9, step: 0.1, marks: [{ value: 0.3, label: '0.3', }, { value: 0.6, label: '0.6' }, { value: 0.9, label: '0.9' }] } },
];

type SlidersProps = {
  valuesRef: React.MutableRefObject<{
    population: number;
    humanSize: number;
    infectionChance: number;
    infectionRadius: number;
    oldPeoplePercent: number;
    socialDistanceFactor: number;
    infectionPersonToQurantin: number;
  }>;
};

export const Sliders: React.FC<SlidersProps> = ({
  valuesRef,
}) => {
  const [values, setValues] = React.useState(valuesRef.current);

  const onSliderValueChange = (key: string, value: number) => {
    setValues({
      ...values,
      [key]: value,
    });
    (valuesRef.current as any)[key] = value;
  };

  return (
    <>
      {items.map(({ label, key, sliderProps }) => (
        <div>
          <div style={{ color: 'white' }}>{label}: {(values as any)[key]}</div>

          <Slider style={{ color: 'white' }} value={(values as any)[key]} onChange={(_, val) => onSliderValueChange(key, val as number)} {...sliderProps} />
        </div>
      ))}
    </>
  );
};
