const request = require("supertest");
const { app } = require("../..");
const persist = require("../../src/data/persist");

describe("fetch User reward", () => {
  beforeAll(() => {
    persist.sync = jest.fn();
  })
  test("It should return 400 when at ", done => {
    request(app)
      .get("/users/1/rewards")
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

    test("It should return 400 when id is not a number ", done => {
        request(app)
            .get("/users/lelele/rewards")
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });

    test("It should return 200 when data have been created", done => {
        request(app)
            .get("/users/1/rewards?at=2020-03-19T12:00:00Z")
            .then(response => {
                expect(response.statusCode).toBe(201);
                expect(persist.sync).toHaveBeenCalled();
                done();
            });
    });

    test("It should return 200 when data have been created but should not add new data for the same dates", done => {
        request(app)
            .get("/users/1/rewards?at=2020-03-19T12:00:00Z")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test("It should return 200 when data have been created but should add new data for different dates", done => {
        request(app)
            .get("/users/1/rewards?at=2023-03-19T12:00:00Z")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });

    test('It should return 400 when at is not a date', done => {
        request(app)
            .patch("/users/1/rewards/eeee/redeem")
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });

    test('It should return 400 when id is not a number', done => {
        request(app)
            .patch("/users/lelele/rewards/lll/redeem")
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
    });

    test('It should return 200 when data have been updated', done => {
        request(app)
            .patch("/users/1/rewards/2023-03-19T12:00:00Z/redeem")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(persist.sync).toHaveBeenCalled();
                done();
            });
    }); 

    test('It should return 403 when reward is expired', done => {
        request(app)
            .patch("/users/1/rewards/2020-03-19T12:00:00Z/redeem")
            .then(response => {
                expect(response.statusCode).toBe(403);
                expect(persist.sync).toHaveBeenCalled();
                done();
            });
    });
});
