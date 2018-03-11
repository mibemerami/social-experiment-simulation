"use strict";

let reportLogs = require("./reportLogs");

var getAllKingdomsAlive = function(kingdoms) {
  return kingdoms.filter(kingdom => kingdom.alive).map(kingdom => kingdom.id);
};
var excludeAttackerID = function(alivesIDs, attackersID) {
  const cutIndex = alivesIDs.indexOf(attackersID);
  alivesIDs.splice(cutIndex, 1);
  return alivesIDs;
};
var findPotentialVictims = function(attackersID, kingdoms) {
  let alivesIDs = getAllKingdomsAlive(kingdoms);
  const potentialVictims = excludeAttackerID(alivesIDs, attackersID);
  return potentialVictims;
};
var selectVictim = function(attackersID, kingdoms) {
  let potentialVictimsIDs = findPotentialVictims(attackersID, kingdoms);
  const n = Math.floor(Math.random() * potentialVictimsIDs.length);
  const victimsID = potentialVictimsIDs[n];
  return { attacker: attackersID, victim: victimsID };
};
var isAggressiveAndAlife = function(kingdom) {
  if (kingdom.mode === "agressive" && kingdom.alive) {
    return true;
  }
};
var findBattleFields = function(matchings) {
  console.log("Matchings in findBattleFilss(): ");
  console.log(matchings);
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
  console.log("opponents in createWeightedOppnentsArrey()");
  console.log(opponents);
  let oppponentsWeights = [];
  opponents.forEach(opponent => {
    const opponentsArmy = getKingdomByID(kingdoms, opponent).army;
    for (let i = 0; i < opponentsArmy; i++) {
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
  const oppponentsWeights = createWeightedOppnentsArrey(kingdoms, opponents);
  const winner = getRandomElementFromArray(oppponentsWeights);
  return opponents.map(opponent => {
    const opponentsMoney = getKingdomByID(kingdoms, opponent).money;
    return {
      id: opponent,
      isWinner: opponent === winner,
      isAttacker: opponent !== battleField[0].victim,
      lockedMoney: opponentsMoney
    };
  });
};
var getKingdomByID = function(kingdoms, id) {
  return kingdoms.filter(kingdom => kingdom.id === id)[0];
};
var setArmyStrength = function(kingdoms, battleResults) {
  console.log("setArmyStrength Battleresults:");
  console.log(battleResults);
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
};
var setPrey = function(kingdoms, battleResults) {
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
};
var setLife = function(kingdoms) {
  kingdoms.forEach(kingdom => {
    if (kingdom.money <= 0) {
      kingdom.alive = false;
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
var calculateWarResults = function(kingdoms, matchings) {
  const battleFields = findBattleFields(matchings);
  const battleResults = battleFields.map(battleField =>
    getBattleResults(kingdoms, battleField)
  );
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
var findWarMatchings = function(kingdoms) {
  const attackersIDs = findAttackers(kingdoms);
  console.log("attackersIDs: ");
  console.log(attackersIDs);
  const matchings = attackersIDs.map(attacker => {
    return selectVictim(attacker, kingdoms);
  });
  return matchings;
};
var makeTurn = function(kingdoms, round) {
  const matchings = findWarMatchings(kingdoms);
  calculateWarResults(kingdoms, matchings);
  reportLogs.report = reportLogs.reportRound(reportLogs.report, round);
  return kingdoms;
};
var createKingdoms = function(
  agressiveKingdoms,
  peacefullKingdoms,
  startMoney,
  startArmy
) {
  let kingdoms = [];
  let idCounter = 100;
  for (let i = 0; i < agressiveKingdoms; i++) {
    kingdoms.push({
      id: idCounter,
      mode: "agressive",
      money: startMoney,
      alive: true,
      army: startArmy
    });
    idCounter++;
  }
  for (let i = 0; i < peacefullKingdoms; i++) {
    kingdoms.push({
      id: idCounter,
      mode: "peacefull",
      money: startMoney,
      alive: true,
      army: startArmy
    });
    idCounter++;
  }
  return kingdoms;
};
var initializeReportObject = function(
  agressiveKingdoms,
  peacefullKingdoms,
  rounds,
  startMoney,
  startArmy,
  allKingdoms
) {
  let timestamp = new Date();
  let startParams = {
    agressiveKingdoms: agressiveKingdoms,
    peacefullKingdoms: peacefullKingdoms,
    rounds: rounds,
    startMoney: startMoney,
    startArmy: startArmy
  };
  let initialValues = {
    date: timestamp,
    startParams: startParams,
    allKingdoms: allKingdoms
  };
  console.log("report init:");
  console.log({ initialValues: initialValues, rounds: [] });
  return { initialValues: initialValues, rounds: [] };
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
  reportLogs.report = reportLogs.initializeReportObject(
    agressiveKingdoms,
    peacefullKingdoms,
    rounds,
    startMoney,
    startArmy,
    kingdoms
  );
  console.log("Start:");
  for (let round = 0; round < rounds; round++) {
    console.log("Round: " + round);
    makeTurn(kingdoms, round);
    console.log("All kingdoms after turn: ");
    console.log(kingdoms);
  }
  console.log("Report:");
  console.log(reportLogs.report);
};

startExperiment(6, 6, 10, 100, 100);
