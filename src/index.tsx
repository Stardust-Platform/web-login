import Amplify from 'aws-amplify';
// Config
import awsconfig from './aws-exports';
// Provider
import { AuthProvider, useAuthContext } from './components/Provider';

const { origin } = window.location;

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
