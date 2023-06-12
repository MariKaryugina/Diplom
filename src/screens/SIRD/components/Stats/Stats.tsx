import { Typography } from "@mui/material";
import { useStatisticStore } from "../../../../store";
import React from "react";

const statistics = [
  { key: 'susceptible', label: 'Восприимчивых', color: '#41E515' },
  { key: 'exposed', label: 'Носители', color: 'rgb(255, 115, 15)' },
  { key: 'infected', label: 'Зараженных', color: '#E51515' },
  { key: 'recovered', label: 'Выздоровевших', color: '#0983EA' },
  { key: 'dead', label: 'Умерших', color: '#534F5A' },
];

const Stat = ({
  key, label, value, color,
}: { key: string; label: string; value: number; color: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} key={key}>
    <Typography fontSize={28} color={color}>{label}</Typography>
    <Typography fontSize={24} fontWeight={900} color={color}>{value}</Typography>
  </div>
);

type StatsProps = {
  isDeadAvailable: boolean;
  isLatentPeriodActive: boolean;
};

export const Stats: React.FC<StatsProps> = ({
  isDeadAvailable,
  isLatentPeriodActive,
}) => {
  const statistic = useStatisticStore((state: any) => state.statistic);

  return (
    <div style={{ display: 'flex', gap: '20px', margin: '0 auto' }}>
      {statistics.map((stat) => {
        if (!isLatentPeriodActive && stat.key === 'exposed') return null;

        if (!isDeadAvailable && stat.key === 'dead') return null;

        return (
        <Stat {...stat} value={statistic[stat.key]} />
      )})}
    </div>
  );
};
