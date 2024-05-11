import "chai/register-should";
import {config} from "chai";
import {describe, it} from "@jest/globals";

import {Greeter} from "../src";

config.truncateThreshold = 0;

describe("Greeter", () => {
  it("returns Hello World!", () => {
    new Greeter().greet().should.equal("Hello World!");
  });
});

