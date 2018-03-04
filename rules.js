"use strict";

function setArmyStrength(kingdoms, battleResults) {
  battleResults.forEach(resultArray => {
    resultArray.forEach(result => {
      let resultKingdom = getKingdomByID(kingdoms, result.id);
      if (
        (!result.isWinner && result.isAttacker) ||
        (!result.isWinner && resultKingdom.mode === "peacefull") // Because peacefull means that the army isn't somewhere else.
      ) {
        resultKingdom.army = 0;
      }
    });
  });
  return kingdoms;
}
function setPrey(kingdoms, battleResults) {
  battleResults.forEach(resultArray => {
    console.log(resultArray);
    const winner = resultArray[resultArray.findIndex(x => x.isWinner)];
    const victim = resultArray[resultArray.findIndex(x => !x.isAttacker)];
    if (winner.id !== victim.id) {
      getKingdomByID(kingdoms, winner.id).money += victim.lockedMoney;
      getKingdomByID(kingdoms, victim.id).money -= victim.lockedMoney;
    }
  });
  return kingdoms;
}
function setLife(kingdoms) {
  kingdoms.forEach(kingdom => {
    if (kingdom.money <= 0) {
      kingdom.alife = false;
    }
  });
  return kingdoms;
}

module.exports = {
  setArmyStrength: setArmyStrength,
  setPrey: setPrey,
  setLife: setLife
};
