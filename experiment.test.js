"use strict";
const experiment = require("./experiment");

it("self check", () => {});

describe("Experiment", () => {
  it("returns an object", () => {
    expect(experiment.startExperiment(6, 6, 10, 100, 100)).toBeInstanceOf(
      Object
    );
  });
  test("No kingdom can have more money than the sum of all kingdoms start-money.", () => {
    const sumOfAllStartMoney = (6 + 6) * 100;
    experiment.startExperiment(6, 6, 10, 100, 100).rounds.forEach(round => {
      round.kingdoms.forEach(kingdom => {
        expect(kingdom.money).toBeLessThanOrEqual(sumOfAllStartMoney);
      });
    });
  });
  test("At least one kindom is alive.", () => {
    experiment.startExperiment(6, 6, 10, 100, 100).rounds.forEach(round => {
      expect(
        round.kingdoms.filter(kingdom => kingdom.alive).length
      ).toBeGreaterThanOrEqual(1);
    });
  });
  test("At least one kindom has its army.", () => {
    experiment.startExperiment(6, 6, 10, 100, 100).rounds.forEach(round => {
      expect(
        round.kingdoms.filter(kingdom => kingdom.army >= 100).length
      ).toBeGreaterThanOrEqual(1);
    });
  });
  test("No kingdom has an army bigger than the start-value.", () => {
    const armyStartValue = 100;
    experiment
      .startExperiment(6, 6, 10, 100, armyStartValue)
      .rounds.forEach(round => {
        expect(
          round.kingdoms.filter(kingdom => kingdom.army > 100).length
        ).toBe(0);
      });
  });
});
