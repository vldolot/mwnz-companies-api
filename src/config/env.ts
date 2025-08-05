import { t } from 'elysia';

const envSchema = t.Object({
  PORT: t.Transform(t.String({ default: '3000' }))
    .Decode((value) => parseInt(value, 10))
    .Encode((value) => value.toString()),
  HOST: t.String({ default: 'localhost' }),
  NODE_ENV: t.Union([
    t.Literal('development'),
    t.Literal('production'), 
    t.Literal('test')
  ], { default: 'development' }),
  XML_API_BASE_URL: t.String({ format: 'uri' }),
  REQUEST_TIMEOUT: t.Transform(t.String({ default: '5000' }))
    .Decode((value) => parseInt(value, 10))
    .Encode((value) => value.toString()),
});

type Environment = typeof envSchema.static;

const parseEnv = (): Environment => {
  try {
    // apply defaults
    const processEnv = {
      PORT: process.env.PORT || '3000',
      HOST: process.env.HOST || 'localhost',
      NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
      XML_API_BASE_URL: process.env.XML_API_BASE_URL || '',
      REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT || '5000',
    };

    if (!processEnv.XML_API_BASE_URL) {
      throw new Error('XML_API_BASE_URL is required');
    }

    // XML_API_BASE_URL validation
    try {
      new URL(processEnv.XML_API_BASE_URL);
    } catch {
      throw new Error('XML_API_BASE_URL must be a valid URL');
    }

    return {
      PORT: parseInt(processEnv.PORT, 10),
      HOST: processEnv.HOST,
      NODE_ENV: processEnv.NODE_ENV,
      XML_API_BASE_URL: processEnv.XML_API_BASE_URL,
      REQUEST_TIMEOUT: parseInt(processEnv.REQUEST_TIMEOUT, 10),
    };
  } catch (error) {
    console.error('Invalid environment variables:', error);
    process.exit(1);
  }
};

export const env = parseEnv();