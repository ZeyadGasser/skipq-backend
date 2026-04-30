import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import request from "supertest";
import { validateAtmParams } from "../../../middlewares/validateAtmParams.middleware.js";

describe("validateAtmParams Middleware", () => {
  let req, res, next;
  beforeEach(() => {
    ((req = {
      params: {},
      query: {},
    }),
      (res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      }),
      (next = jest.fn()));
  });
  //Happy Path

  // We pass an anonymous function because Jest needs a function reference to execute later during test run
  // If we call it directly, it will run immediately instead of being executed by Jest
  test("should call next() and attach searchParams if all inputs are valid", () => {
    req.params = { orgId: "1", bankId: "2", atmId: "3" };
    req.query = { amount: "100" };

    // Act: Invoke the middleware
    validateAtmParams()(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.searchParams).toEqual({ org_id: 1, bank_id: 2, atm_id: 3 });
    expect(req.query.amount).toBe(100);
  });

  // --- Edge Cases / Failure Scenarios ---
  test("should return 400 error if amount is negative or zero", () => {
    // Arrange: Provide an invalid amount
    req.params = { orgId: "1", bankId: "2", atmId: "3" };
    req.query = { amount: "-50" };

    // Act
    validateAtmParams()(req, res, next);

    // Assert: Ensure next() is NOT called and res.status is called with 400
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 400 error if orgId is missing in params", () => {
    // Arrange: Missing orgId
    req.params = { bankId: "2", atmId: "3" };

    // Act
    validateAtmParams()(req, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should return 400 error if atmId is not a numeric string", () => {
    // Arrange: atmId is a string that cannot be parsed to an integer
    req.params = { orgId: "1", bankId: "2", atmId: "abc" };

    // Act
    validateAtmParams()(req, res, next);

    // Assert
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should proceed normally if amount is not provided (optional field)", () => {
    // Arrange: Valid params but no amount query
    req.params = { orgId: "1", bankId: "2", atmId: "3" };
    req.query = {};

    // Act
    validateAtmParams()(req, res, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(req.query.amount).toBeUndefined();
  });
});
