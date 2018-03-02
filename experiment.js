var getAllKingdomsAlive = function(kingdoms) {
  return kingdoms
    .map((kingdom, index) => {
      if (kingdom.alife) {
        return index;
      }
    })
    .filter(item => item !== undefined);
};
var excludeAttackerIndex = function(alifesIndices, attackersIndex) {
  const cutIndex = alifesIndices.indexOf(attackersIndex);
  alifesIndices.splice(cutIndex, 1);
  return alifesIndices;
};
var findPotentialVictims = function(attackersIndex, kingdoms) {
  let alifesIndices = getAllKingdomsAlive(kingdoms);
  const potentialVictims = excludeAttackerIndex(alifesIndices, attackersIndex);
  return potentialVictims;
};
var selectVictim = function(attackersIndex, kingdoms) {
  let potentialVictimsIndices = findPotentialVictims(attackersIndex, kingdoms);
  const n = Math.floor(Math.random() * potentialVictimsIndices.length);
  const victimsIndex = potentialVictimsIndices[n];
  return { attacker: attackersIndex, victim: victimsIndex };
};
var isAggressiveAndAlife = function(kingdom) {
  if (kingdom.mode === "agressive" && kingdom.alife) {
    return true;
  }
};
var findBattleFields = function(matchings) {
  let done = [];
  return matchings
    .map((itemA, index, self) => {
      if (done.indexOf(itemA.victim) === -1) {
        done.push(itemA.victim);
        return self.filter(itemB => itemB.victim === itemA.victim);
      }
    })
    .filter(item => item !== undefined);
};
var createWeightedOppnentsArrey = function(kingdoms, opponents) {
  let oppponentsWeights = [];
  opponents.forEach(opponent => {
    for (i = 0; i < kingdoms[opponent].army; i++) {
      oppponentsWeights.push(opponent);
    }
  });
  return oppponentsWeights;
};
var getRandomElementFromArray = function(array) {
  const n = Math.floor(Math.random() * array.length);
  return array[n];
};
var getBattleResults = function(kingdoms, battleField) {
  let opponents = battleField.map(x => x.attacker);
  opponents.push(battleField[0].victim);
  let oppponentsWeights = createWeightedOppnentsArrey(kingdoms, opponents);
  const winner = getRandomElementFromArray(oppponentsWeights);
  return opponents.map(opponent => {
    return {
      index: opponent,
      isWinner: opponent === winner,
      isAttacker: opponent !== battleField[0].victim,
      lockedMoney: kingdoms[opponent].money
    };
  });
};
var setArmyStrength = function(kingdoms, battleResults) {
  battleResults.forEach(resultArray => {
    resultArray.forEach(result => {
      if (
        (!result.isWinner && result.isAttacker) ||
        (!result.isWinner && kingdoms[result.index].mode === "peacefull") // Because peacefull means that the army isn't somewhere else.
      ) {
        kingdoms[result.index].army = 0;
      }
    });
  });
  return kingdoms;
};
var setPrey = function(kingdoms, battleResults) {
  battleResults.forEach(resultArray => {
    console.log(resultArray);
    const winner = resultArray[resultArray.findIndex(x => x.isWinner)];
    const victim = resultArray[resultArray.findIndex(x => !x.isAttacker)];
    if (winner.index !== victim.index) {
      kingdoms[winner.index].money += victim.lockedMoney;
      kingdoms[victim.index].money -= victim.lockedMoney;
    }
  });
  return kingdoms;
};
var setLife = function(kingdoms) {
  kingdoms.forEach(kingdom => {
    if (kingdom.money <= 0) {
      kingdom.alife = false;
    }
  });
  return kingdoms;
};
var applyRulesAfterBattle = function(kingdoms, battleResults) {
  console.log("Kingdoms before applying rules:");
  console.log(kingdoms);
  setArmyStrength(kingdoms, battleResults);
  setPrey(kingdoms, battleResults);
  setLife(kingdoms);
  return kingdoms;
};
var calculateAttacks = function(kingdoms, matchings) {
  const battleFields = findBattleFields(matchings);
  battleResults = battleFields.map(x => getBattleResults(kingdoms, x));
  console.log("Battleresults:");
  console.log(battleResults);
  applyRulesAfterBattle(kingdoms, battleResults);
  return kingdoms;
};
var hasEnoughArmy = function(kingdom) {
  console.log(kingdom);
  const result = kingdom.army > 0;
  console.log(result);
  return result;
};
var findAttackers = function(kingdoms) {
  let attackers = kingdoms.filter(
    kingdom => isAggressiveAndAlife(kingdom) && hasEnoughArmy(kingdom)
  );
  attackers = attackers.map(kingdom => {
    return kingdom.id;
  });
  return attackers;
};
var makeTurn = function(kingdoms) {
  const attackersIndices = findAttackers(kingdoms);
  console.log("attackersIndices: ");
  console.log(attackersIndices);
  const matchings = attackersIndices.map(attacker => {
    return selectVictim(attacker, kingdoms);
  });
  calculateAttacks(kingdoms, matchings);
  return kingdoms;
};
var createKingdoms = function(
  agressiveKingdoms,
  peacefullKingdoms,
  startMoney,
  startArmy
) {
  let kingdoms = [];
  let idCounter = 0;
  for (let i = 0; i < agressiveKingdoms; i++) {
    kingdoms.push({
      id: idCounter,
      mode: "agressive",
      money: startMoney,
      alife: true,
      army: startArmy
    });
    idCounter++;
  }
  for (let i = 0; i < peacefullKingdoms; i++) {
    kingdoms.push({
      id: idCounter,
      mode: "peacefull",
      money: startMoney,
      alife: true,
      army: startArmy
    });
    idCounter++;
  }
  return kingdoms;
};
var startExperiment = function(
  agressiveKingdoms,
  peacefullKingdoms,
  rounds,
  startMoney,
  startArmy
) {
  var kingdoms = createKingdoms(
    agressiveKingdoms,
    peacefullKingdoms,
    startMoney,
    startArmy
  );
  console.log("Start:");
  // console.log(kingdoms);
  for (let round = 0; round < rounds; round++) {
    console.log("Round: " + round);
    makeTurn(kingdoms);
    console.log("All kingdoms after turn: ");
    console.log(kingdoms);
  }
};

startExperiment(12, 12, 10, 100, 100);
