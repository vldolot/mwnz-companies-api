import type { Context } from 'elysia';
import type { APIError } from '../types/company.types';

// catches unhandled errors and returns a standardized error response.
export const errorHandler = (ctx: any) => {
  const { code, error, set } = ctx;
  console.error('Error:', code, error.message);

  set.status = 500;
  return {
    error: 'Internal Server Error',
    error_description: 'Something went wrong.',
  } satisfies APIError;
};