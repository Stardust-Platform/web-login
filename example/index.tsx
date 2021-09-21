// libs
import React, { FC } from 'react';
import * as ReactDOM from 'react-dom';
import { AuthProvider } from '..';
// Screens
import MainScreen from './screens/Main';

const App: FC = () => (
  <AuthProvider isOpen>
    <MainScreen />
  </AuthProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
