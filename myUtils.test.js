"use strict";
const utils = require("./myUtils");

test("getRandomElementFromArray returns a value from the given array", () => {
  const testArray1 = ["bla", "bli", "blub"];
  const randomElement = utils.getRandomElementFromArray(testArray1);
  expect(testArray1).toContain(randomElement);
});

test("getKingdomByID returns the right kindom", () => {
  const kingdoms = [
    { id: 100, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 101, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 102, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 103, mode: "agressive", money: 0, alive: false, army: 0 },
    { id: 104, mode: "agressive", money: 200, alive: true, army: 0 },
    { id: 105, mode: "agressive", money: 500, alive: true, army: 0 },
    { id: 106, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 107, mode: "peacefull", money: 0, alive: false, army: 0 },
    { id: 108, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 109, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 110, mode: "peacefull", money: 100, alive: true, army: 100 },
    { id: 111, mode: "peacefull", money: 100, alive: true, army: 100 }
  ];
  expect(utils.getKingdomByID(kingdoms, 105)).toEqual({
    id: 105,
    mode: "agressive",
    money: 500,
    alive: true,
    army: 0
  });
});
