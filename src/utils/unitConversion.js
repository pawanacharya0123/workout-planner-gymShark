export const unitConversion = (weight, unit, globalUnit) => {
  if (!weight || unit === globalUnit) return weight;
  else if (unit == "lbs") return (weight / 2.20462).toFixed(2);
  else return (weight * 2.20462).toFixed(2);
};
