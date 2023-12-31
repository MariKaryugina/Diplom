type Timeline = {
  cases: Record<string, number>;
  recovered: Record<string, number>;
  deaths: Record<string, number>;
};

type CovidInfo = {
  country: string;
  timeline: Timeline;
};

export const convertCountries = (covidInfoByCountries: CovidInfo[], allCountries: any[]) => {
  let countries: {
    timeline: Timeline;
    name: string;
    latitude: number;
    longtitude: number;
  }[] = [];

  covidInfoByCountries.forEach((covidInfo) => {
    allCountries.forEach((country) => {
      if (covidInfo.country === country.country) {
        if (countries.some(({ name }) => name === country.country)) {
          countries = countries.map((changed) => {
            if (changed.name === country.country) {
              for (let key in changed.timeline.cases) {
                changed.timeline.cases[key] += covidInfo.timeline.cases[key];
                changed.timeline.deaths[key] += covidInfo.timeline.deaths[key];
                changed.timeline.recovered[key] += covidInfo.timeline.recovered[key];
              }
              return changed;
            }
            return changed;
          });
        } else {
          countries.push({
            timeline: covidInfo.timeline,
            name: country.country,
            latitude: country.countryInfo.lat,
            longtitude: country.countryInfo.long,
          });
        }
      }
    })
  });

  return countries;
};
