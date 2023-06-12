import { Suspense, useEffect, useState } from 'react';

import { Canvas } from '@react-three/fiber';

import { Earth as EarthComp } from '../../components/earth/Earth';

import styled from 'styled-components';

import { SelectedCountryModal, TotalInfo } from './components';
import { useCountryStore } from '../../store';
import { CountriesInfo, getCountriesInfo } from '../../services';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const Earth = () => {
  const [countries, setCountries] = useState<CountriesInfo[]>([]);

  const country = useCountryStore((state: any) => state.country);
  const selectCountry = useCountryStore((state: any) => state.selectCountry);

  useEffect(() => {
    const load = async () => {
      // const covidInfoByCountries = await getCovidInfo();
      const allCountries = await getCountriesInfo();

      // const countries = convertCountries(covidInfoByCountries, allCountries);

      setCountries(allCountries || []);
    };

    load();
  }, []);

  const onSelectCountry = (name: string) => {
    selectCountry(name);
    console.log(name);
  };

  return (
    <Container>
      <TotalInfo />

      <Canvas>
        <Suspense fallback={null}>
          <EarthComp allCountries={countries} country={country} onSelectCountry={onSelectCountry} />
        </Suspense>
      </Canvas>

      <SelectedCountryModal allCountries={countries} />
    </Container>
  );
};
