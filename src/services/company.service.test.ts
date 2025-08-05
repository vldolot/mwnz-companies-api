
import { describe, it, expect } from 'bun:test';
import { companyService, CompanyNotFoundError } from './company.service';

// mock fetch
global.fetch = (async (url: string) => {
  if (url.endsWith('/1.xml')) {
    return new Response(`
      <Data>
        <name>Test Company</name>
        <description>A test company description.</description>
      </Data>
    `, { status: 200 });
  }
  if (url.endsWith('/404.xml')) {
    return new Response('Not Found', { status: 404 });
  }
  return new Response('Error', { status: 500 });
}) as any;

describe('CompanyService', () => {
  it('should return company data for a valid ID', async () => {
    const company = await companyService.getCompanyById('1');
    expect(company).toEqual({
      id: '1',
      name: 'Test Company',
      description: 'A test company description.',
    });
  });

  it('should throw CompanyNotFoundError for a 404 response', async () => {
    await expect(companyService.getCompanyById('404')).rejects.toThrow(CompanyNotFoundError);
  });

  it('should throw an error for a non-200 response', async () => {
    await expect(companyService.getCompanyById('500')).rejects.toThrow('HTTP 500: ');
  });
});
