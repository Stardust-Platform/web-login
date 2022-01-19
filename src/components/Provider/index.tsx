// . Libs
import React, {
  useReducer, useMemo, useEffect, FC, useState,
} from 'react';
import { Auth, Hub } from 'aws-amplify';
import GoogleFontsCss2Loader from 'react-google-fonts-css2';
// import axios, { AxiosRequestConfig } from 'axios';
// Screens
import SigninScreen from '../../screens/Signin';
// Components
import Notifications from '../Notifications';
// Consts
import { initialState } from './constants';
// Interfaces
import {
  Types, ProviderProps, User, SnackBarStatus,
} from './types';
// Reducers
import AuthReducer from './reducer';
// Hooks
import useAuthContext, { AuthContext } from './hooks';

const checkUserLoggedIn = async (dispatch: any) => {
  let user = {};
  await Auth.currentAuthenticatedUser()
    .then((data) => {
      user = data;
    }).catch(() => {
      return dispatch({ type: Types.handleSessionLoading, payload: false });
    });
  return user;
};

const STARDUST_LOGO = 'https://sd-game-assets.s3.amazonaws.com/_Stardust_Dark_Branding.svg';

// eslint-disable-next-line func-names
export const AuthProvider: FC<ProviderProps> = function (props) {
  const {
    isOpen,
    custom,
  } = props;
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [snackBarStatus, setSnackBarStatus] = useState<SnackBarStatus>({
    isOpen: false,
    hasError: false,
    message: '',
  });

  const value = useMemo(() => ({
    state,
    dispatch,
  }), [state]);

  const finishSignin = async (challenge: any) => {
    try {
      const [email, code] = challenge.split(',');
      // MUST be here for TriggerPlayerPreTokenGeneration
      Auth.configure({ clientMetadata: { 'custom:gameId': process.env.REACT_APP_GAME_ID } });
      const user = await Auth.signIn(email);
      await Auth.sendCustomChallengeAnswer(user, code);
      await Auth.currentSession();
      const payload = Object.entries(user).length !== 0 ? user : undefined;
      await dispatch({
        type: Types.handleSignin,
        payload: payload as User,
      });
      dispatch({ type: Types.handleSessionLoading, payload: false });
    } catch (e) {
      setSnackBarStatus({
        isOpen: true,
        hasError: false,
        message: 'There was an error Signing in',
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const challenge = params.get('challenge');
    if (challenge) {
      finishSignin(challenge);
    }
    if (state.isResendClicked) {
      setTimeout(() => {
        dispatch({ type: Types.handleResendClicked, payload: false });
      }, 10000);
    }
  }, [state.isResendClicked]);

  const forceTokenRefresh = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      Auth.configure({ clientMetadata: { 'custom:gameId': process.env.REACT_APP_GAME_ID }, Auth: { oauth: { responseType: 'code' } } });
      const cognitoUser = await Auth.currentAuthenticatedUser();
      // THIS IS THE MAGIC THAT ACTUALLY WORKS
      // https://aws.amazon.com/blogs/mobile/aws-amplify-adds-support-for-custom-attributes-in-amazon-cognito-user-pools/
      await Auth.updateUserAttributes(cognitoUser, {
        'custom:gameId': process.env.REACT_APP_GAME_ID,
      });
      const { refreshToken } = cognitoUser.getSignInUserSession();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cognitoUser.refreshSession(refreshToken, (err: any) => {
        if (err) {
          setSnackBarStatus({
            isOpen: true,
            hasError: true,
            message: `There was an error refreshing the session token ${err}`,
          });
        }
        // const { idToken, refreshToken, accessToken } = session;
        // do whatever you want to do now :)
      });
    } catch (err) {
      setSnackBarStatus({
        isOpen: true,
        hasError: true,
        message: `There was an error refreshing the session token ${err}`,
      });
    }
  };

  Hub.listen('auth', async (data) => {
    switch (data.payload.event) {
      case 'signIn':
        await forceTokenRefresh();
        await Auth.currentAuthenticatedUser()
          .then(
            (user) => {
              setSnackBarStatus({
                isOpen: true,
                hasError: false,
                message: user.attributes.email,
              });
            },
          );
        break;
      case 'signIn_failure':
        setSnackBarStatus({
          isOpen: true,
          hasError: true,
        });
        break;

      default:
        break;
    }
  });

  const closeModal = () => {
    dispatch({
      type: Types.handleOpenModal,
      payload: false,
    });
  };

  useEffect(() => {
    (async () => {
      const params = window.location.search;
      if (params.startsWith('?challenge=')) {
        return dispatch({ type: Types.handleSessionLoading, payload: true });
      }
      const user = await checkUserLoggedIn(dispatch);
      const payload = Object.entries(user).length !== 0 ? user : undefined;
      dispatch({
        type: Types.handleSignin,
        payload: payload as User,
      });
      if (Object.entries(user).length !== 0) {
        dispatch({ type: Types.handleSessionLoading, payload: false });
      }
    })();
  }, []);

  useEffect(() => {
    dispatch({
      type: Types.handleOpenModal,
      payload: isOpen ?? false,
    });
  }, [isOpen]);

  return (
    <>
      <GoogleFontsCss2Loader family="DM Sans" styles={[400, 500, 700]} />
      <AuthContext.Provider value={value} {...props} />
      <Notifications
        isOpen={snackBarStatus.isOpen}
        closeNotification={() => setSnackBarStatus({
          ...snackBarStatus,
          isOpen: false,
        })}
        hasError={snackBarStatus.hasError}
        message={snackBarStatus.message}
      />
      {state.isOpen && (
        // eslint-disable-next-line max-len
        <SigninScreen authContext={value} closeModal={closeModal} custom={{ logoUrl: STARDUST_LOGO, ...custom }} />)}
    </>
  );
};

AuthProvider.defaultProps = {
  isOpen: false,
  custom: {
    logoUrl: STARDUST_LOGO,
  },
};

export { useAuthContext };
export type { ProviderProps };
