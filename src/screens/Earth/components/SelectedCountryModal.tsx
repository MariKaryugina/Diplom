import { Box, Card, CardContent, CircularProgress, Modal, Typography } from "@mui/material";

import { useCountryStore } from "../../../store";
import React from "react";
import { CountriesInfo } from "../../../services";

const Info = ({
  label,
  value,
  color,
}: { label: string; value: number, color: string }) => {
  return (
    <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Typography color={color} fontSize={22}>{value}</Typography>

      <Typography fontSize={14}>{label}</Typography>
    </Box>
  )
};

type SelectedCountryModalProps = {
  allCountries: CountriesInfo[];
};

export const SelectedCountryModal: React.FC<SelectedCountryModalProps> = ({
  allCountries,
}) => {
  const country = useCountryStore((state: any) => state.country);
  const selectCountry = useCountryStore((state: any) => state.selectCountry);

  const countryInfo = React.useMemo(() => {
    return allCountries.find(({ country: name }) => name === country);
  }, [allCountries, country]);

  console.log(countryInfo, 'countryInfo');

  return (
    <Modal open={Boolean(country)} onClose={() => selectCountry('')}>
      <Box style={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <Card style={{ background: 'cornsilk' }}>
          {!countryInfo && (
            <CircularProgress />
          )}

          {countryInfo && (
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography align="center" fontSize={24} fontWeight={700}>{country}</Typography>

                <img src={countryInfo.countryInfo.flag} />
              </Box>

              <Typography>Обновлено: {new Date(countryInfo.updated).toLocaleDateString()}</Typography>

              <Info color='#d83a00' label='случаев заражения' value={countryInfo.cases} />

              <Info color='#2ec461' label='выздоровело' value={countryInfo.recovered} />

              <Info color='#a8a7a7' label='умерло' value={countryInfo.deaths} />

              <Info color='#1763a8' label='болеют на данный момент' value={countryInfo.active} />
            </CardContent>
          )}
        </Card>
      </Box>
    </Modal>
  );
};
