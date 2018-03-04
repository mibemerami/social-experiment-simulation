"use strict";
const utils = require("./myUtils");

it("returns a value from the given array", () => {
  const testArray1 = ["bla", "bli", "blub"];
  const randomElement = utils.getRandomElementFromArray(testArray1);
  expect(testArray1).toContain(randomElement);
});
