import Amplify from 'aws-amplify';
// Config
import awsconfig from './aws-exports';
// Provider
import { AuthProvider, useAuthContext, ProviderProps } from './components/Provider';

let origin = 'localhost:3000';

if (typeof window !== 'undefined') origin = window?.location?.origin;

// Override aws config redirect with current origin
const newAWSConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: origin,
    redirectSignOut: origin,
  },
};

Amplify.configure(newAWSConfig);

export { AuthProvider, useAuthContext };
export type { ProviderProps };
