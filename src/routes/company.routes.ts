import { Elysia } from 'elysia';
import { companyController } from '../controllers/company.controller';
import { 
  CompanyParamsSchema, 
  CompanyResponseSchema, 
  ErrorResponseSchema 
} from '../types/company.types';

export const companyRoutes = new Elysia({ prefix: '/v1/companies' })
  .get(
    '/:id',
    /* @ts-ignore-next-line */
    companyController.getCompany,
    {
      params: CompanyParamsSchema,
      response: {
        200: CompanyResponseSchema,
        400: ErrorResponseSchema,
        404: ErrorResponseSchema,
        500: ErrorResponseSchema,
      },
      detail: {
        tags: ['Companies'],
        summary: 'Get company by ID',
        description: 'Retrieve company info by company ID',
      },
    }
  ); // Future extensibility: add more routes...