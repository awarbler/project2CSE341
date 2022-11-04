require('dotenv').config();
module.exports = {
  port: process.env.PORT || 8080,
  clientId: process.env.CLIENT_ID,
  redirectUrl: process.env.REDIRECT_URL,
  authorizationHost: process.env.AUTHORIZATION_HOST,
  clientSecret: process.env.CLIENT_SECRET
};
