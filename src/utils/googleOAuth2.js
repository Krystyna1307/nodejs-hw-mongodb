import { OAuth2Client } from 'google-auth-library';
import * as path from 'node:path';
import { readFile } from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';

const googleOauthJSONPath = path.resolve('google-oauth.json');

const oauthConfig = JSON.parse(await readFile(googleOauthJSONPath, 'utf-8'));

const clientId = getEnvVar('GOOGLE_OAUTH_CLIENT_ID');
const clientSecret = getEnvVar('GOOGLE_OAUTH_CLIENT_SECRET');

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: oauthConfig.web.redirect_uris[0],
});

export const generateOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
  return url;
};
