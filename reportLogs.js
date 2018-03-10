"use strict";

let report = {};

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

function reportRound(report, round) {
  report.rounds.push({ round: round });
}

module.exports = {
  report: report,
  initializeReportObject: initializeReportObject,
  reportRound: reportRound
};
