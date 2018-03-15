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
        kingdoms: [{}, {}, {}, {}]
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
    expect(testReport.initialValues.kingdoms).toEqual(
      controlReport.initialValues.kingdoms
    );
    expect(testReport.rounds).toEqual(controlReport.rounds);
  });
});

describe("setReportRound", () => {
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
        kingdoms: []
      },
      rounds: []
    };
    const round = 0;
    report = reportLogs.setReportRound(report, round);
    expect(report.rounds[0].round).toBe(0);
  });
});

describe("setBattleResults", () => {
  // Adds the Battleresults of each round to the report.

  it("adds the battleresults to the given round", () => {
    let testReport = {
      initialValues: {
        date: "2018-03-10T01:01:17.160Z",
        startParams: {
          agressiveKingdoms: 6,
          peacefullKingdoms: 6,
          rounds: 10,
          startMoney: 100,
          startArmy: 100
        },
        kingdoms: [{}, {}]
      },
      rounds: [{ round: 0 }, { round: 1 }]
    };
    const battleResults = [
      [
        { id: 101, isWinner: true, isAttacker: true, lockedMoney: 300 },
        { id: 100, isWinner: false, isAttacker: false, lockedMoney: 300 }
      ]
    ];
    const round = 1;
    const controlReport = {
      initialValues: {
        date: "2018-03-10T01:01:17.160Z",
        startParams: {
          agressiveKingdoms: 6,
          peacefullKingdoms: 6,
          rounds: 10,
          startMoney: 100,
          startArmy: 100
        },
        kingdoms: [{}, {}]
      },
      rounds: [
        { round: 0 },
        {
          round: 1,
          battleResults: [
            [
              { id: 101, isWinner: true, isAttacker: true, lockedMoney: 300 },
              { id: 100, isWinner: false, isAttacker: false, lockedMoney: 300 }
            ]
          ]
        }
      ]
    };
    testReport = reportLogs.setBattleResults(testReport, battleResults, round);
    expect(testReport).toEqual(controlReport);
  });
});

describe("setChangedKingdoms", () => {
  // Logg kingdoms after the round is over and all changes have been applied.
  let testReport = {
    initialValues: {
      date: "2018-03-10T01:01:17.160Z",
      startParams: {
        agressiveKingdoms: 6,
        peacefullKingdoms: 6,
        rounds: 10,
        startMoney: 100,
        startArmy: 100
      },
      kingdoms: [{}, {}]
    },
    rounds: [
      { round: 0 },
      {
        round: 1,
        battleResults: [
          [
            { id: 101, isWinner: true, isAttacker: true, lockedMoney: 300 },
            { id: 100, isWinner: false, isAttacker: false, lockedMoney: 300 }
          ]
        ]
      }
    ]
  };
  const kingdoms = [
    { id: 100, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 101, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 102, mode: "agressive", money: 300, alive: true, army: 100 },
    { id: 103, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 104, mode: "agressive", money: 200, alive: true, army: 0 },
    { id: 105, mode: "agressive", money: 100, alive: true, army: 0 },
    { id: 106, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 107, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 108, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 109, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 110, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 111, mode: "peacefull", money: 100, alive: true, army: 100 }
  ];
  const round = 1;
  const controlReport = {
    initialValues: {
      date: "2018-03-10T01:01:17.160Z",
      startParams: {
        agressiveKingdoms: 6,
        peacefullKingdoms: 6,
        rounds: 10,
        startMoney: 100,
        startArmy: 100
      },
      kingdoms: [{}, {}]
    },
    rounds: [
      { round: 0 },
      {
        round: 1,
        battleResults: [
          [
            { id: 101, isWinner: true, isAttacker: true, lockedMoney: 300 },
            { id: 100, isWinner: false, isAttacker: false, lockedMoney: 300 }
          ]
        ],
        kingdoms: [
          { id: 100, mode: "agressive", money: 0, alive: false, army: 0 },
          { id: 101, mode: "agressive", money: 0, alive: false, army: 0 },
          { id: 102, mode: "agressive", money: 300, alive: true, army: 100 },
          { id: 103, mode: "agressive", money: 0, alive: false, army: 0 },
          { id: 104, mode: "agressive", money: 200, alive: true, army: 0 },
          { id: 105, mode: "agressive", money: 100, alive: true, army: 0 },
          { id: 106, mode: "peacefull", money: 100, alive: true, army: 100 },
          { id: 107, mode: "peacefull", money: 100, alive: true, army: 100 },
          { id: 108, mode: "peacefull", money: 100, alive: true, army: 100 },
          { id: 109, mode: "peacefull", money: 100, alive: true, army: 100 },
          { id: 110, mode: "peacefull", money: 100, alive: true, army: 100 },
          { id: 111, mode: "peacefull", money: 100, alive: true, army: 100 }
        ]
      }
    ]
  };
  testReport = reportLogs.setChangedKingdoms(testReport, kingdoms, round);
  expect(testReport).toEqual(controlReport);
});
