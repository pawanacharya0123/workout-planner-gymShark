export const groupWeightByDate = (datesWithWeights) => {
  //   console.log(datesWithWeights);
  // /1. Group by date and track max weight
  const grouped = {};

  datesWithWeights.forEach(({ date, weight }) => {
    const newDate = new Date(date).toISOString().split("T")[0];
    if (!grouped[newDate]) {
      grouped[newDate] = weight;
    } else {
      grouped[newDate] = Math.max(grouped[newDate], weight);
    }
  });
  //   console.log(grouped);

  // 2. Convert back to array
  const result = Object.entries(grouped).map(([date, weight]) => ({
    date,
    weight,
  }));
  //   console.log(result);
  // 3. Optional: Sort by date or by weight
  // .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date ascending
  // .sort((a, b) => b.weight - a.weight); // sort by max weight descending

  // 4. Format for display
  //   const formatted = result.map(({ date, weight }) => {
  // const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });
  // return `${formattedDate} - ${weight} KGs`;
  //   });

  //   console.log(result);
  return result;
};
