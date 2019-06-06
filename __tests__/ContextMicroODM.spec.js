import {
  ContextMicroODM,
  MicroODM,
  CollectionODM
} from "../distribution/index.js";
import { expect } from "chai";
import { it } from "mocha";

describe("ContextMicroODM", () => {
  describe("Methods", () => {
    describe("Constructor", () => {
      context("with params", () => {
        context("nestedProperties", () => {
          it("should to create properties and start the value when defined.", () => {
            const contextMicroODM = new ContextMicroODM({
              nestedProperties: {
                level: "jedi master",
                gun: "lightsaber",
                firstName: null,
                lastName: null
              }
            });
            expect(contextMicroODM.level).eql("jedi master");
            expect(contextMicroODM.gun).eql("lightsaber");
            expect(contextMicroODM.firstName).not.be.undefined;
            expect(contextMicroODM.lastName).not.be.undefined;
          });
        });
        context("validators", () => {
          it("should define validators with seters and getters to nestedProperties", () => {
            const contextMicroODM = new ContextMicroODM({
              firstName: "Luke",
              lastName: "Skywalker",
              nestedProperties: {
                gun: "no gun",
                level: "no force"
              },
              validators: {
                get: (obj, prop) => {
                  if (prop === "gun") {
                    return obj[prop];
                  }
                  if (prop === "level") return obj[prop];
                },
                set: (obj, prop, value) => {
                  if (prop === "gun") {
                    obj[prop] = "no gun";
                    if (["lightsaber", "lasergun"].indexOf(value) > -1) {
                      obj[prop] = value;
                    }
                  }
                  if (prop === "level") {
                    obj[prop] = "no force";
                    if (
                      ["padawan", "jedi", "jedi master", "sith"].indexOf > -1
                    ) {
                      obj[prop] = value;
                    }
                  }
                  return true;
                }
              }
            });
            contextMicroODM.gun = "revolver";
            contextMicroODM.level = "bounty hunter";
            expect(contextMicroODM.gun).eql("no gun");
            expect(contextMicroODM.level).eql("no force");
          });
        });
        context("any other properties", () => {
          it("should be added to the object", () => {
            const contextMicroODM = new ContextMicroODM({
              bornPlanet: "Tatooine",
              nestedProperties: {
                firstName: "Luke",
                lastName: "Skywalker",
                gun: "lightsaber",
                level: "jedi master"
              },
              validators: {
                get: (obj, prop) => {
                  if (prop === "gun") {
                    return obj[prop];
                  }
                  if (prop === "level") return obj[prop];
                  return obj[prop];
                },
                set: (obj, prop, value) => {
                  if (prop === "gun") {
                    obj[prop] = "no gun";
                    if (["lightsaber", "lasergun"].indexOf(value) > -1) {
                      obj[prop] = value;
                    }
                  }
                  if (prop === "level") {
                    obj[prop] = "no force";
                    if (
                      ["padawan", "jedi", "jedi master", "sith"].indexOf > -1
                    ) {
                      obj[prop] = value;
                    }
                  }
                  obj[prop] = value;
                  return true;
                }
              }
            });
            expect(contextMicroODM.firstName).eql("Luke");
            expect(contextMicroODM.lastName).eql("Skywalker");
            expect(contextMicroODM.bornPlanet).eql("Tatooine");
            expect(contextMicroODM.level).eql("jedi master");
            expect(contextMicroODM.gun).eql("lightsaber");
          });
        });
      });
      context("without params", () => {
        it("should create the object", () => {
          const contextMicroODM = new ContextMicroODM();
          expect(contextMicroODM).not.be.undefined;
        });
      });
    });
  });
});
