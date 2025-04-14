export const groupWeightByDate = (datesWithWeights) => {
  const grouped = {};

  datesWithWeights.forEach(({ date, weight }) => {
    const newDate = new Date(date).toISOString().split("T")[0];
    if (!grouped[newDate]) {
      grouped[newDate] = weight;
    } else {
      grouped[newDate] = Math.max(grouped[newDate], weight);
    }
  });

  const result = Object.entries(grouped).map(([date, weight]) => ({
    date,
    weight,
  }));

  return result;
};
