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

  const checkUserLoggedIn = async (dispatch: any) => {
    let user = {};
    await Auth.currentAuthenticatedUser()
      .then((data) => {
        user = data;
      }).catch(() => {
        dispatch({ type: Types.handleSessionLoading, payload: false })
      });
    return user;
  };

  const finishSignin = async (email: string, challenge: string) => {
    try {
      if (typeof challenge === 'string') {
        // MUST be here for TriggerPlayerPreTokenGeneration
        Auth.configure({ clientMetadata: { 'custom:gameId': process.env.REACT_APP_GAME_ID } });
        const user = await Auth.signIn(email);
        await Auth.sendCustomChallengeAnswer(user, challenge);
        await Auth.currentSession();
        const payload = Object.entries(user).length !== 0 ? user : undefined;
        dispatch({ type: Types.handleSignin, payload: payload as User });
      } else {
        setSnackBarStatus({
          isOpen: true,
          hasError: true,
          message: 'Challenge response cannot be empty, value after email in link',
        });
      }
      dispatch({ type: Types.handleSessionLoading, payload: false });
      dispatch({ type: Types.handleMagicLinkLoading, payload: false });
      dispatch({ type: Types.handleOpenModal, payload: false });
    } catch (e) {
      dispatch({ type: Types.handleMagicLinkLoading, payload: false });
      setSnackBarStatus({
        isOpen: true,
        hasError: true,
        message: 'There was an error Signing in',
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const challenge = params.get('challenge');
    const email = params.get('email');
    const googleCode = params.get('code');
    if (!email && challenge) {
      const [Email, Challenge] = challenge.split(',');
      finishSignin(Email, Challenge);
    } else if (googleCode) {
      dispatch({ type: Types.handleMagicLinkLoading, payload: true });
    } else if (email && challenge) {
      dispatch({ type: Types.handleMagicLinkLoading, payload: true });
      dispatch({ type: Types.handleOpenModal, payload: true });
      finishSignin(email, challenge);
    } else {
      dispatch({ type: Types.handleMagicLinkLoading, payload: false });
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

  useEffect(() => {
    Hub.listen('auth', async (data) => {
      // console.log(`data.payload.event=${data.payload.event}`);
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
  }, []);

  const closeModal = () => {
    dispatch({
      type: Types.handleOpenModal,
      payload: false,
    });
  };

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window?.location?.search);
      if (params.get('challenge') || (params.get('email') && params.get('challenge'))) {
        dispatch({ type: Types.handleSessionLoading, payload: true });
      }
      const user = await checkUserLoggedIn(dispatch);
      const payload = Object.entries(user).length !== 0 ? user : undefined;
      if (Object.entries(user).length !== 0) {
        dispatch({ type: Types.handleSessionLoading, payload: false });
        dispatch({ type: Types.handleOpenModal, payload: false });
      }
      return dispatch({
        type: Types.handleSignin,
        payload: payload as User,
      });
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
        <SigninScreen setSnackBar={() => setSnackBarStatus} authContext={value} closeModal={closeModal} custom={{ logoUrl: STARDUST_LOGO, ...custom }} />)}
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
