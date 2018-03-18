"use strict";

let report = {};

function initializeReportObject(
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

module.exports = {
  report: report,
  initializeReportObject: initializeReportObject,
  setReportRound: setReportRound,
  setBattleResults: setBattleResults,
  setChangedKingdoms: setChangedKingdoms,
  copyLastRound: copyLastRound
};
