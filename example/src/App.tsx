import { FC } from 'react';
import { AuthProvider } from 'stardust-auth';
import './App.css';
// Screens
import MainScreen from './screens/Main';

const App: FC = () => (
  <AuthProvider isOpen custom={{ privacyPolicyUrl: 'localhost:3000' }}>
    <MainScreen />
  </AuthProvider>
);

export default App;
