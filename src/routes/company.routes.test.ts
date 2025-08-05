
import { describe, it, expect, mock } from 'bun:test';
import { createApp } from '../app';
import { companyService } from '../services/company.service';

describe('Company Routes', () => {
  const app = createApp();

  it('should return company data for a valid ID', async () => {
    const response = await app.handle(new Request('http://localhost/v1/companies/1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      id: '1',
      name: 'MWNZ',
      description: '..is awesome',
    });
  });

  it('should return 404 for a non-existent company ID', async () => {
    const response = await app.handle(new Request('http://localhost/v1/companies/404'));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect((body as unknown as any).error).toBe('Not Found');
  });

  it('should return 500 for an internal server error', async () => {
    // save the original method
    const originalGetCompanyById = companyService.getCompanyById;

    // mock the service to throw an error
    companyService.getCompanyById = mock(async () => {
      throw new Error('Simulated internal error');
    });

    // create a new app instance to ensure it uses the mocked service
    const appWithMock = createApp();

    const response = await appWithMock.handle(new Request('http://localhost/v1/companies/1'));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect((body as unknown as any).error).toBe('Internal Server Error');

    // restore the original method to avoid side effects
    companyService.getCompanyById = originalGetCompanyById;
  });
});


