function getRandomElementFromArray(array) {
  const n = Math.floor(Math.random() * array.length);
  return array[n];
}

module.exports = {
  getRandomElementFromArray: getRandomElementFromArray
};
