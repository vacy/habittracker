// --- app.test.js ---
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
// import {} from "./api.js";

// Top level test suite
describe("REST API", () => {
  // Before any tests run, setup our Express app
  before(async () => {});

  // Test the GET request
  test("GET request", async () => {
    // Supertest has built-in tests/assertions for response codes
    const { text } = await request("http://localhost:4300/comments")
      .get("/")
      .expect(200);
    console.log(JSON.parse(text).length);
    assert.equal(JSON.parse(text).length, 15);
  });

  // A sub test suite so we can batch related tests
  // describe("POST request", () => {
  //   // Test the POST request
  //   test("success", async () => {
  //     const { text } = await request(app).post("/").expect(200);
  //     assert.equal(text, "Post Received");
  //   });

  //   // We'll come back to this later. The Node Test Runner will print out that we have a test TODO later.
  //   test.todo("error");
  // });
});
