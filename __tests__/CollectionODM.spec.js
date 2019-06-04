/* eslint-disable no-undef */
import { MicroODM, CollectionODM } from "../distribution/index.js";
import { expect } from "chai";

let collectionODM = null;
beforeEach(() => {
  global.Math.random = () => 0.30950533601439867;
  collectionODM = new CollectionODM([new MicroODM({ tempature: -1 })]);
  global.Math.random = () => 0.2839740785097704;
});
describe("CollectionODM", () => {
  describe("Methods:", () => {
    describe("Constructor", () => {
      it("Should the class was created.", () => {
        expect(collectionODM.type).equal("collectionodm");
      });
    });
    describe("size", () => {
      it("should return the number of items.", () => {
        expect(collectionODM.size()).equal(1);
      });
    });
    describe("add", () => {
      it("should 'Item' was added item to class.", () => {
        collectionODM.add(new MicroODM({ tempature: 0 }));
        expect(collectionODM.setOfItems.length).equal(2);
      });
    });
    describe("export", () => {
      it("should return export data of the collection", async () => {
        collectionODM.add(new MicroODM({ tempature: 0 }));
        expect(collectionODM.export()).equal(
          '[{"document":{"tempature":-1,"type":"microodm","name":"MicroODM","_id":"0.30950533601439867"}},{"document":{"tempature":0,"type":"microodm","name":"MicroODM","_id":"0.2839740785097704"}}]'
        );
      });
    });
    describe("delete", () => {
      it("should remove the object from collection", () => {
        collectionODM.delete({ id: 0.30950533601439867 });
        expect(collectionODM.size()).equal(0);
      });
    });
    describe("find", () => {
      beforeEach(() => {
        const newItem = new MicroODM({
          firstName: "Mary",
          lastName: "Stewart"
        });
        collectionODM.add(newItem);
      });
      it("should brings the object from the information", () => {
        const obj = collectionODM.find({
          firstName: "Mary"
        });
        expect(obj.lastName).equal("Stewart");
      });
    });
  });
  describe("Iterator methods:", () => {
    it("should iterate over the object", () => {
      collectionODM.add(new MicroODM({ tempature: 0 }));
      const items = collectionODM.iterator();
      expect(items.next().value.type).equal("microodm");
      expect(items.next().value.type).equal("microodm");
    });
  });
});
