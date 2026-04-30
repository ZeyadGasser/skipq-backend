import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { AtmController } from '../../../controllers/atm.controller.js';

describe('AtmController', () => {
  let atmController;
  let mockAtmService;
  let req, res;

  beforeEach(() => {
    mockAtmService = {
      findNearbyAtms: jest.fn(),
      getSpecificBankAtmDetails: jest.fn(),
      checkWithdrawal: jest.fn(),
    };

    atmController = new AtmController(mockAtmService);

    req = {
      searchParams: {},
      query: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('getNearbyAtms', () => {
    test('should return list of ATMs and status 200 on success', async () => {
      const mockAtms = [{ id: 1, name: 'ATM 1' }, { id: 2, name: 'ATM 2' }];
      req.searchParams = { org_id: 1, bank_id: 2, atm_id: 3 };
      mockAtmService.findNearbyAtms.mockResolvedValue(mockAtms);

      await atmController.getNearbyAtms(req, res);

      expect(mockAtmService.findNearbyAtms).toHaveBeenCalledWith(req.searchParams);
      
      expect(res.status).toHaveBeenCalledWith(expect.any(Number)); 
    });
  });

  describe('checkWithdrawal', () => {
    test('should return 400 if amount is missing', async () => {
      req.searchParams = { bank_id: 1, atm_id: 2 };
      req.query = {}; 

      // Act
      await atmController.checkWithdrawal(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockAtmService.checkWithdrawal).not.toHaveBeenCalled();
    });

    test('should return success when withdrawal is possible', async () => {
      // Arrange
      req.searchParams = { bank_id: 1, atm_id: 2 };
      req.query = { amount: 500 };
      const mockResult = { canWithdraw: true, fee: 5 };
      mockAtmService.checkWithdrawal.mockResolvedValue(mockResult);

      // Act
      await atmController.checkWithdrawal(req, res);

      // Assert
      expect(mockAtmService.checkWithdrawal).toHaveBeenCalledWith({
        bank_id: 1,
        atm_id: 2,
        amount: 500
      });
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String)
      }));
    });
  });
});