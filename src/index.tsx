import Amplify, { Hub, Auth } from 'aws-amplify';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
// Config
import { CurrentUserOpts } from '@aws-amplify/auth/lib-esm/types';
import awsconfig from './aws-exports';
// Provider
import { AuthProvider, useAuthContext, ProviderProps } from './components/Provider';

let origin = 'localhost:3000';

if (typeof window !== 'undefined') origin = window?.location?.origin;

// https://stackoverflow.com/questions/55137170/aws-amplify-google-sigin-with-react-doesnt-automatically-refresh-token-after-1
// Override aws config redirect with current origin
const newAWSConfig = {
  ...awsconfig,
  Auth: { oauth: { responseType: 'code' } },
  oauth: {
    ...awsconfig.oauth,
    responseType: 'code',
    redirectSignIn: origin,
    redirectSignOut: origin,
  },
};

Amplify.configure(newAWSConfig);

const currentSession = async () => Auth.currentSession();

const currentUserInfo = async () => Auth.currentUserInfo();

// eslint-disable-next-line max-len
const currentAuthenticatedUser = async (params?: CurrentUserOpts | undefined) => Auth.currentAuthenticatedUser(params);

export {
  AuthProvider,
  CognitoUserInterface,
  Hub,
  useAuthContext,
  currentSession,
  currentUserInfo,
  currentAuthenticatedUser,
};
export type { ProviderProps };
