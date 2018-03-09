"use strict";

function getRandomElementFromArray(array) {
  const n = Math.floor(Math.random() * array.length);
  return array[n];
}
function getKingdomByID(kingdoms, id) {
  return kingdoms.filter(kingdom => kingdom.id === id)[0];
}

module.exports = {
  getRandomElementFromArray: getRandomElementFromArray,
  getKingdomByID: getKingdomByID
};
