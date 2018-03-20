"use strict";

const rules = require("./rules");

describe("setArmyStrength", () => {
  // After the battle-results for all battles have been calculated,
  // setArmyStrength is used to adapt the army-value for each of the oppnents.

  it("sets the army of the attackers to 0, if the defender winns, the army of the defender remains.", () => {
    const kingdoms = [
      { id: 100, mode: "aggressive", money: 200, alive: true, army: 0 },
      { id: 101, mode: "aggressive", money: 300, alive: true, army: 100 },
      { id: 102, mode: "aggressive", money: 0, alive: false, army: 0 },
      { id: 103, mode: "aggressive", money: 200, alive: true, army: 100 },
      { id: 104, mode: "aggressive", money: 0, alive: false, army: 0 },
      { id: 105, mode: "aggressive", money: 100, alive: true, army: 0 },
      { id: 106, mode: "peaceful", money: 100, alive: true, army: 100 },
      { id: 107, mode: "peaceful", money: 0, alive: false, army: 0 },
      { id: 108, mode: "peaceful", money: 100, alive: true, army: 100 },
      { id: 109, mode: "peaceful", money: 0, alive: false, army: 0 },
      { id: 110, mode: "peaceful", money: 100, alive: true, army: 100 },
      { id: 111, mode: "peaceful", money: 100, alive: true, army: 100 }
    ];
    const battleResults = [
      [
        { id: 101, isWinner: false, isAttacker: true, lockedMoney: 300 },
        { id: 103, isWinner: false, isAttacker: true, lockedMoney: 200 },
        { id: 110, isWinner: true, isAttacker: false, lockedMoney: 100 }
      ]
    ];
    expect(rules.setArmyStrength(kingdoms, battleResults)[1].army).toEqual(0);
    expect(rules.setArmyStrength(kingdoms, battleResults)[3].army).toEqual(0);
  });
  it("returns an unchanged object, if the loser has already 0 army", () => {
    // TODO
  });
});
