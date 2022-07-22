import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID ?? "us-east-1_7HaN0s3vK",
  ClientId: process.env.REACT_APP_CLIENT_ID ?? "63sn0gvao4hkujmduc6s0it55p",
};

export default new CognitoUserPool(poolData);
