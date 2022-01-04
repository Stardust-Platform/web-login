import { FC } from 'react';
import { AuthProvider } from 'web-login';
import './App.css';
// Screens
import MainScreen from './screens/Main';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const App: FC = () => (
  <AuthProvider isOpen custom={{ privacyPolicyUrl: 'localhost:3000' }}>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen/>} />
      </Routes>
  </BrowserRouter>
  </AuthProvider>
);

export default App;
