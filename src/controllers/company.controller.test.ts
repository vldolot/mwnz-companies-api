
import { describe, it, expect, spyOn, afterEach } from 'bun:test';
import { companyController } from './company.controller';
import { companyService, CompanyNotFoundError } from '../services/company.service';
import type { Context } from 'elysia';

describe('CompanyController', () => {
  afterEach(() => {
    spyOn(companyService, 'getCompanyById').mockRestore();
  });

  it('should return a company when found', async () => {
    const mockCompany = { id: '1', name: 'Test', description: 'Test desc' };
    spyOn(companyService, 'getCompanyById').mockResolvedValue(mockCompany);

    const ctx = { params: { id: 1 }, set: {} } as unknown as Context<{ params: { id: number }, set: any }>;
    const result = await companyController.getCompany(ctx);

    expect(result).toEqual(mockCompany);
    expect(companyService.getCompanyById).toHaveBeenCalledWith('1');
  });

  it('should return 404 when company not found', async () => {
    spyOn(companyService, 'getCompanyById').mockRejectedValue(new CompanyNotFoundError('2'));

    const ctx = { params: { id: 2 }, set: { status: 0 } } as unknown as Context<{ params: { id: number }, set: any }>;
    const result = await companyController.getCompany(ctx);

    expect(ctx.set.status).toBe(404);
    expect(result).toEqual({
      error: 'Not Found',
      error_description: 'The requested company could not be found.',
    });
  });

  it('should return 500 for other errors', async () => {
    spyOn(companyService, 'getCompanyById').mockRejectedValue(new Error('Some error'));

    const ctx = { params: { id: 3 }, set: { status: 0 } } as unknown as Context<{ params: { id: number }, set: any }>;
    const result = await companyController.getCompany(ctx);

    expect(ctx.set.status).toBe(500);
    expect(result).toEqual({
      error: 'Internal Server Error',
      error_description: 'An unexpected error occurred while processing your request.',
    });
  });
});
