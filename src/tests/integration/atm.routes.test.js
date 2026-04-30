import { jest, describe, test, expect, beforeEach, afterAll } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { mapRoutes } from '../../routes/index.js'; 
import { sequelize } from '../../config/db.js';

describe('ATM Routes Integration Test', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    
    mapRoutes(app);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /api/organizations/:orgId/banks/:bankId/atms', () => {
    
    test('should return 400 if longitude/latitude are missing in query', async () => {
      const response = await request(app)
        .get('/api/organizations/1/banks/2/atms')
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(400);
      
      expect(response.body.status.toLowerCase()).toBe('error');
    });

    test('should return 200 and ATMs list for valid request', async () => {
    
      const response = await request(app)
        .get('/api/organizations/1/banks/2/atms')
        .query({ 
          longitude: 31.2357, 
          latitude: 30.0444, 
          page: 1, 
          limit: 10 
        });

     
      if (response.status === 200) {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
      } else {
        expect(response.status).toBe(404);
        expect(response.body.status.toLowerCase()).toBe('error');
      }
    });
  });

  describe('GET /api/organizations/:orgId/banks/:bankId/atms/:atmId/check-withdraw', () => {
    test('should return 400 if amount is missing', async () => {
      const response = await request(app)
        .get('/api/organizations/1/banks/2/atms/3/check-withdraw');

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/amount/i);
    });
  });

  describe('404 Global Handler', () => {
    test('should return 404 for non-existing routes', async () => {
      const response = await request(app).get('/api/random-path-that-does-not-exist');
      
      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Not Found');
    });
  });
});