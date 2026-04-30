import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { AtmService } from '../../../services/atm.service.js';
import { BankProviderFactory } from '../../../services/providers/BankProviderFactory.js';
import { CustomError } from '../../../error/CustomError.js';

describe('AtmService', () => {
    let atmService;
    let mockAtmRepository;
    let mockGovernorateRepository;

    beforeEach(() => {
        // Mocking the repositories passed via constructor
        mockAtmRepository = {
            findNearbyAtms: jest.fn(),
        };
        mockGovernorateRepository = {
            findByCoordinates: jest.fn(),
        };

        atmService = new AtmService(mockAtmRepository, mockGovernorateRepository);
    });

    describe('findNearbyAtms', () => {
        test('should format distance in meters if less than 1000m', async () => {
            const searchParams = { location: { lng: 30, lat: 31 } };
            
            // Step 1: Mock governorate found
            mockGovernorateRepository.findByCoordinates.mockResolvedValue(5);
            
            // Step 2: Mock repository returning an ATM with 500m distance
            const mockAtms = [{
                atm_id: 'atm_1',
                distance: '500.4'
            }];
            mockAtmRepository.findNearbyAtms.mockResolvedValue(mockAtms);

            const result = await atmService.findNearbyAtms(searchParams);

            expect(result[0].distance).toBe('500 m');
            expect(searchParams.governorate_id).toBe(5);
        });

        test('should format distance in kilometers if 1000m or more', async () => {
            mockGovernorateRepository.findByCoordinates.mockResolvedValue(1);
            mockAtmRepository.findNearbyAtms.mockResolvedValue([
                { atm_id: 'atm_2', distance: '1500' }
            ]);

            const result = await atmService.findNearbyAtms({ location: { lng: 0, lat: 0 } });

            expect(result[0].distance).toBe('1.5 km');
        });

        test('should throw CustomError if no governorate is found for coordinates', async () => {
            mockGovernorateRepository.findByCoordinates.mockResolvedValue(null);

            await expect(atmService.findNearbyAtms({ location: { lng: 0, lat: 0 } }))
                .rejects.toThrow('Service not available in this location');
        });
    });

    describe('checkWithdrawal', () => {
        test('should return availability from the bank provider', async () => {
            const mockProvider = {
                checkCashAvailability: jest.fn().mockResolvedValue({ status: 'available' })
            };

            // Spying on the static Factory method
            const factorySpy = jest.spyOn(BankProviderFactory, 'get').mockReturnValue(mockProvider);

            const result = await atmService.checkWithdrawal({ 
                bank_id: 'bank_A', 
                atm_id: '123', 
                amount: 1000 
            });

            expect(factorySpy).toHaveBeenCalledWith('bank_A');
            expect(mockProvider.checkCashAvailability).toHaveBeenCalledWith('123', 1000);
            expect(result).toEqual({ status: 'available' });

            factorySpy.mockRestore(); // Clean up the spy
        });

        test('should throw error if amount check fails (available is null/false)', async () => {
            const mockProvider = {
                checkCashAvailability: jest.fn().mockResolvedValue(null)
            };
            jest.spyOn(BankProviderFactory, 'get').mockReturnValue(mockProvider);

            await expect(atmService.checkWithdrawal({ bank_id: 'bank_A', amount: 100 }))
                .rejects.toThrow('Failed to check amount from bank');
        });
    });
});