// Libs
import React, { FC } from 'react';
// Screens
import Signin from './screens/Signin';
// Provider
import { AuthProvider, useAuthContext } from './components/Provider';

const StardustAuth: FC = () => (
  <div className="StardustAuth">
    <Signin />
  </div>
);

export default StardustAuth;
export { AuthProvider, useAuthContext };
