export const numberFormat = (count) => {
  const number = parseInt(count);
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 10000) {
    return (number / 1000).toFixed(2) + " k";
  } else if (number >= 10000 && number < 100000) {
    return (number / 1000).toFixed(2) + " k";
  } else if (number >= 100000 && number < 1000000) {
    return (number / 100000).toFixed(2) + " L";
  } else if (number >= 100000 && number < 10000000) {
    return (number / 100000).toFixed(2) + " L";
  } else if (number >= 10000000 && number < 100000000) {
    return (number / 10000000).toFixed(2) + " Cr";
  }
};
