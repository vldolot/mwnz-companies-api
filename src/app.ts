import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
// import { lambda } from 'elysia-lambda'; // for when using Elysia Lambda integration to deploy to AWS Lambda
import { env } from './config/env';
import { companyRoutes } from './routes/company.routes';
import { errorHandler } from './middleware/error-handler';

import { helmet } from 'elysia-helmet';

export const createApp = () => {
  const app = new Elysia()
    .use(helmet()) // for security headers
    // .use(lambda()) // for when using Elysia Lambda integration to deploy to AWS Lambda
    .use(
      swagger({
        documentation: {
          info: {
            title: 'MWNZ companies API',
            version: '1.0.0',
            description: 'API for retrieving company information',
          },
          tags: [
            {
              name: 'Companies',
              description: 'MWNZ Company-related endpoints',
            },
          ],
          servers: [
            {
              url: `http://${env.HOST}:${env.PORT}`,
              description: 'Development server',
            },
          ],
        },
      })
    )
    .use(
      cors({
        origin: env.NODE_ENV === 'development' ? true : false,
        credentials: true,
      })
    )
    // register routes
    .use(companyRoutes)
    .onError(errorHandler);

  return app;
};

// only start the server if this file is run directly
// otherwise, it can be imported as a module (e.g. for testing)
if (import.meta.main) {
  const app = createApp();
  
  app.listen({
    hostname: env.HOST,
    port: env.PORT,
  });

  console.log(`🚀 Server running at http://${env.HOST}:${env.PORT}`);
  console.log(`📚 Swagger docs at http://${env.HOST}:${env.PORT}/swagger`);
}