"use strict";
// const utils = require("./myUtils");
const getRandomElementFromArray = require("./myUtils");

it("self check", () => {});

it("returns a value from the given array", () => {
  const testArray1 = ["bla", "bli", "blub"];
  const randomElement = getRandomElementFromArray(testArray1);
  expect(testArray1).toContain(randomElement);
});
