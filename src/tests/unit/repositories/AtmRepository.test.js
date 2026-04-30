import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { AtmRepository } from '../../../repositories/atm.repository.js';
import { sequelize } from '../../../config/db.js';
import { QueryTypes } from "sequelize";

describe('AtmRepository', () => {
  let atmRepository;
  let querySpy;

  beforeEach(() => {
    atmRepository = new AtmRepository();
    querySpy = jest.spyOn(sequelize, 'query').mockImplementation(() => {
        return Promise.resolve([]); 
    });
  });

  afterEach(() => {
    querySpy.mockRestore(); 
  });

  test('should call sequelize.query with correct SQL and replacements', async () => {
    const searchParams = {
      location: { lat: 30.0, lng: 31.0 },
      page: 1,
      limit: 10,
      governorate_id: 5,
      org_id: 1
    };

    const mockDbResult = [{ atm_id: 1, atm_name: 'National Bank ATM' }];
    querySpy.mockResolvedValue(mockDbResult);

    const result = await atmRepository.findNearbyAtms(searchParams);

    expect(querySpy).toHaveBeenCalled();
    
    const executedSql = querySpy.mock.calls[0][0];
    expect(executedSql).toContain('ST_DistanceSphere');

    const options = querySpy.mock.calls[0][1];
    expect(options.replacements).toMatchObject({
      orgId: 1,
      govId: 5,
      lat: 30.0,
      lng: 31.0
    });
    
    expect(result).toEqual(mockDbResult);
  });

  test('should calculate correct offset for page 2', async () => {
    const searchParams = {
      location: { lat: 0, lng: 0 },
      page: 2,
      limit: 10,
      governorate_id: 1,
      org_id: 1
    };

    await atmRepository.findNearbyAtms(searchParams);

    const options = querySpy.mock.calls[0][1];
    expect(options.replacements.offset).toBe(10); 
  });
});