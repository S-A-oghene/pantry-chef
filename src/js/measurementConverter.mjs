const conversionTable = {
  cupToDerica: (cups) => (cups * 0.8).toFixed(1) + " derica",
  gramToMudu: (grams) => {
    if (grams < 200) return "small handful";
    if (grams < 500) return "approx ½ mudu";
    if (grams < 1000) return "approx 1 mudu";
    return (grams / 1000).toFixed(1) + " mudu";
  },
  tablespoonToCookingSpoon: (tbsp) => Math.ceil(tbsp / 1.5) + " cooking spoons",
};

export function convertMeasurements(measure, _ingredient) {
  const match = measure.match(/^([\d.]+)\s*(\w+)/);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  if (unit.includes("cup")) {
    return conversionTable.cupToDerica(value);
  } else if (unit.includes("g") || unit.includes("gram")) {
    return conversionTable.gramToMudu(value);
  } else if (unit.includes("tbsp") || unit.includes("tablespoon")) {
    return conversionTable.tablespoonToCookingSpoon(value);
  } else if (unit.includes("tsp") || unit.includes("teaspoon")) {
    return Math.ceil(value / 2) + " teaspoons (or small spoon)";
  }
  return null;
}
