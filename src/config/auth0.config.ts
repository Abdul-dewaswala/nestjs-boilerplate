import { registerAs } from '@nestjs/config';

export default registerAs('auth0', () => ({
  audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
}));