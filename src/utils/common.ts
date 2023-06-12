export const formatDate = (date: Date) => {
  let newDate = date.toLocaleDateString('en-US');

  const [month, day, year] = newDate.split('/');

  return `${month}/${day}/${year.slice(-2)}`;
};

export const numberToShortString = (number: number) => {
  let resultString = '';

  if (number > 1000000) {
      resultString = `${`${number}`.slice(0, -6)}M+`;
  } else if (number > 1000) {
      resultString = `${`${number}`.slice(0, -3)}K+`;
  } else {
      resultString = `${number}`;
  }

  return resultString;
};
