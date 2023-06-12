import {
  allCountriesInfo
} from './all-countries-info';

const serverUrl = 'https://corona.lmao.ninja/v2';

export type TotalInfoRes = {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion:  number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
};

export const getAllInfo = async (): Promise<TotalInfoRes> => {
  try {
    const res = await fetch(`${serverUrl}/all`);

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export type CountriesInfo = {
  updated: number;
  country: string;
  countryInfo: {
      _id: number;
      iso2: string;
      iso3: string;
      lat: number;
      long: number;
      flag: string;
  },
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  critical: number;
  tests: number;
  population: number;
};

export const getCountriesInfo = async (): Promise<CountriesInfo[]> => {
  try {
    if (allCountriesInfo) {
      return allCountriesInfo as any;
    }

    const res = await fetch(`${serverUrl}/countries`);

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
