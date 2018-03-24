"use strict";

const fs = require("fs");

let report = {};

function initializeReportObject(
  aggressiveKingdoms,
  peacefulKingdoms,
  rounds,
  startMoney,
  startArmy,
  allKingdoms
) {
  let timestamp = new Date();
  let startParams = {
    aggressiveKingdoms: aggressiveKingdoms,
    peacefulKingdoms: peacefulKingdoms,
    rounds: rounds,
    startMoney: startMoney,
    startArmy: startArmy
  };
  let initialValues = {
    date: timestamp,
    startParams: startParams,
    kingdoms: allKingdoms
  };
  return { initialValues: initialValues, rounds: [] };
}

function setReportRound(report, round) {
  report.rounds.push({ round: round });
  return report;
}

function setBattleResults(report, battleResults, round) {
  const i = report.rounds.findIndex(r => r.round === round);
  report.rounds[i].battleResults = battleResults;
  return report;
}

function setChangedKingdoms(report, kingdoms, round) {
  const i = report.rounds.findIndex(r => r.round === round);
  report.rounds[i].kingdoms = kingdoms;
  return report;
}

function copyLastRound(report, currendRound) {
  let lastRoundCopy = JSON.parse(
    JSON.stringify(report.rounds.find(r => r.round === currendRound - 1))
  );
  lastRoundCopy.round = currendRound;
  report.rounds.push(lastRoundCopy);
  return report;
}
function writeReportToFile(report, appendFileFunction) {
  if (typeof appendFileFunction === "undefined") {
    appendFileFunction = fs.appendFile;
  }
  appendFileFunction(
    "experiment-report.json",
    JSON.stringify(report, null, 2),
    err => {
      console.log(err);
    }
  );
}
module.exports = {
  report: report,
  initializeReportObject: initializeReportObject,
  setReportRound: setReportRound,
  setBattleResults: setBattleResults,
  setChangedKingdoms: setChangedKingdoms,
  copyLastRound: copyLastRound,
  writeReportToFile: writeReportToFile
};
