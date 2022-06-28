import { Hub, Auth } from 'aws-amplify';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
// Config
import { CurrentUserOpts } from '@aws-amplify/auth/lib-esm/types';
// Provider
import { AuthProvider, useAuthContext, ProviderProps } from './components/Provider';


let origin = 'localhost:3000';

if (typeof window !== 'undefined') origin = window?.location?.origin;

const currentSession = async () => Auth.currentSession();

const currentUserInfo = async () => Auth.currentUserInfo();

// eslint-disable-next-line max-len
const currentAuthenticatedUser = async (params?: CurrentUserOpts | undefined) => Auth.currentAuthenticatedUser(params);

/**
 * Allow custom aws-exports file to overwrite default environment
 */
const overwriteEnvironment = () => console.warn('overwriteEnvironment is deprecated: use AuthProvider awsConfig and loginUrl props instead.');

export {
  AuthProvider,
  CognitoUserInterface,
  Hub,
  useAuthContext,
  currentSession,
  currentUserInfo,
  currentAuthenticatedUser,
  overwriteEnvironment,
};
export type { ProviderProps };
