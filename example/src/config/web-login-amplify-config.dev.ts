const webLoginDevAmplifyConfig = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:eb7f5db4-1770-4be9-8fd3-830dd8f942e8",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_k6scdnfyW",
  aws_user_pools_web_client_id: "1jj4jkbdfmr23a9c8ivivc69lh",
  oauth: {
    domain: "stardust-shop-dev.auth.us-east-1.amazoncognito.com",
    scope: [
      "aws.cognito.signin.user.admin",
      "email",
      "openid",
      "phone",
      "profile",
    ],
    redirectSignIn:
      "http://localhost:3000",
    redirectSignOut:
      "http://localhost:3000",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};

export default webLoginDevAmplifyConfig;
