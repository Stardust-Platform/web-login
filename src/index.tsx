// Libs
import React, { FC } from 'react';
// Screens
import Signup from './screens/Signup';
// Provider
import { AuthProvider, useAuthContext } from './components/Provider';

const StardustAuth: FC = () => (
  <div className="StardustAuth">
    <Signup />
  </div>
);

export default StardustAuth;
export { AuthProvider, useAuthContext };
