import type { Context } from 'elysia';
import { companyService, CompanyNotFoundError } from '../services/company.service';
import type { APIError, Company } from '../types/company.types';

export class CompanyController {
  async getCompany({ params: { id }, set }: Context<{ params: { id: number }, set: any }>): Promise<Company | APIError> {
    try {
      return await companyService.getCompanyById(id.toString());
    } catch (error) {
      if (error instanceof CompanyNotFoundError) {
        set.status = 404;
        return {
          error: 'Not Found',
          error_description: 'The requested company could not be found.',
        } satisfies APIError;
      }

      console.error('Error fetching company:', error);
      set.status = 500;
      return {
        error: 'Internal Server Error',
        error_description: 'An unexpected error occurred while processing your request.',
      } satisfies APIError;
    }
  }
}

export const companyController = new CompanyController();