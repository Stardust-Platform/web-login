import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId:
    process.env.REACT_APP_USER_POOL_ID ?? 'USER_POOL_ID Not configured',
  ClientId: process.env.REACT_APP_CLIENT_ID ?? 'CLIENT_ID Not configured',
};

export default new CognitoUserPool(poolData);
