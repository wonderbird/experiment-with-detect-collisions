import {config} from "chai";
import {describe, it} from "@jest/globals";
import {Box, PotentialVector, System, Vector} from "detect-collisions";

config.truncateThreshold = 0;

describe("Feature: Ray casting", () => {
  it("Scenario: Ray hits box", () => {
    const system = new System();

    // GIVEN a box at (10, 10) with size 100x100
    const pos: PotentialVector = {x: 10, y: 10};
    const box = system.createBox(pos, 100, 100);

    // WHEN a ray is cast from (0, 0) to (200, 200)
    const start: Vector = {x: 0, y: 0};
    const end: Vector = {x: 200, y: 200};
    const hit = system.raycast(start, end);

    // THEN the hit should be at (10, 10)
    expect(hit).not.toBeFalsy()
    const { point, body } = hit!;
    expect(point).toEqual({x: 10, y: 10});

    // AND the hit body should be the box
    expect(body).toBe(box);

    system.remove(box);
  });

  it("Scenario: Two boxes intersect", () => {
    const system = new System();

    // GIVEN two boxes at (10, 10) and (50, 50) with size 100x100
    const pos1: PotentialVector = {x: 10, y: 10};
    const box1 = system.createBox(pos1, 100, 100);
    const pos2: PotentialVector = {x: 50, y: 50};
    const box2 = system.createBox(pos2, 100, 100);

    // WHEN collision is checked
    let isCollisionDetected = false;
    let collidingBodies: Box[] = [];
    system.checkAll((param) => {
      isCollisionDetected = true;
      collidingBodies.push(param.a, param.b);
    });

    // THEN the collision should be detected
    expect(isCollisionDetected).toBe(true);
    expect(collidingBodies[0]).toBe(box1);
    expect(collidingBodies[1]).toBe(box2);

    system.remove(box1);
    system.remove(box2);
  });
});

