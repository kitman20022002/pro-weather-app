function randomRange(min, max, round) {
  round = round === undefined;
  const val = Math.random() * (max - min) + min;
  return round ? Math.floor(val) : val;
}

export default randomRange;
