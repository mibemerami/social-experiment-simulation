"use strict";

const reportLogs = require("./reportLogs");

describe("report creation", () => {
  // Creates the basic report-object, and fills it with some initial data.

  it("fills the report object with the given data", () => {
    let testReport = {};
    const controlReport = {
      initialValues: {
        date: "2018-03-10T21:40:11.004Z",
        startParams: {
          agressiveKingdoms: 2,
          peacefullKingdoms: 2,
          rounds: 8,
          startMoney: 300,
          startArmy: 200
        },
        allKingdoms: [{}, {}, {}, {}]
      },
      rounds: []
    };
    testReport = reportLogs.initializeReportObject(2, 2, 8, 300, 200, [
      {},
      {},
      {},
      {}
    ]);
    expect(testReport.initialValues.date).toBeDefined();
    expect(testReport.initialValues.startParams).toEqual(
      controlReport.initialValues.startParams
    );
    expect(testReport.initialValues.allKindoms).toEqual(
      controlReport.initialValues.allKindoms
    );
    expect(testReport.rounds).toEqual(controlReport.rounds);
  });
});

describe("reportRound", () => {
  // Creates a round-object, with the round-number, and adds it to the report-
  // object. The rest of the round data is added by ohter report functions.

  it("adds a new object to the report, adds a property with the round-value to it", () => {
    let report = {
      initialValues: {
        date: "2018-03-10T01:01:17.160Z",
        startParams: {
          agressiveKingdoms: 6,
          peacefullKingdoms: 6,
          rounds: 10,
          startMoney: 100,
          startArmy: 100
        },
        allKingdoms: []
      },
      rounds: []
    };
    const round = 0;
    reportLogs.reportRound(report, round);
    expect(report.rounds[0].round).toBe(0);
  });
});
