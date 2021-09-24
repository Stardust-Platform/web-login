import { FC } from 'react';
import { AuthProvider } from 'stardust-auth';
import './App.css';
// Screens
import MainScreen from './screens/Main';

const App: FC = () => (
  <AuthProvider isOpen>
    <MainScreen />
  </AuthProvider>
);

export default App;
