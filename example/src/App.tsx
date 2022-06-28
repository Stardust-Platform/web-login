import { FC } from 'react';
import { AuthProvider } from "web-login";
import './App.css';
// Screens
import MainScreen from './screens/Main';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import webLoginDevAmplifyConfig from './config/web-login-amplify-config.dev';

const devProps: {
  loginUrl?: typeof process.env.REACT_APP_WEB_LOGIN_URL,
  awsOverwrite?: typeof webLoginDevAmplifyConfig
} = {}

if (process.env.REACT_APP_TARGET_ENVIRONMENT === 'dev') {
  devProps.loginUrl = process.env.REACT_APP_WEB_LOGIN_URL;
  devProps.awsOverwrite = webLoginDevAmplifyConfig;
}

const App: FC = () => (
  <AuthProvider
    isOpen
    custom={{ privacyPolicyUrl: 'localhost:3000' }}
    {...devProps}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
