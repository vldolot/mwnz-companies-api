import { t } from 'elysia';

export interface Company {
  id: string;
  name: string;
  description: string;
}

export interface CompanyXMLData {
  Data: {
    name: string;
    description: string;
  };
}

export interface APIError {
  error: string;
  error_description: string;
}

// Elysia validation schemas
export const CompanyParamsSchema = t.Object({
  id: t.String(),
});

export const CompanyResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
});

export const ErrorResponseSchema = t.Object({
  error: t.String(),
  error_description: t.String(),
});