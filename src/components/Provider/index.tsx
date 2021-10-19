// . Libs
import React, {
  useReducer, useMemo, useEffect, FC, useState,
} from 'react';
import { Auth, Hub } from 'aws-amplify';
import GoogleFontsCss2Loader from 'react-google-fonts-css2';
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

const checkUserLoggedIn = async () => {
  let user = {};
  await Auth.currentAuthenticatedUser().then(
    (data) => { user = data; },
  );
  return user;
};

const STARDUST_LOGO = 'https://sd-game-assets.s3.amazonaws.com/_Stardust_Dark_Branding.svg';

export const AuthProvider: FC<ProviderProps> = (props) => {
  const { isOpen, custom } = props;
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [snackBarStatus, setSnackBarStatus] = useState<SnackBarStatus>({
    isOpen: false, hasError: false, message: '',
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  const finishSignin = async (challenge: any) => {
    try {
      const [email, code] = challenge.split(',');
      const user = await Auth.signIn(email);
      await Auth.sendCustomChallengeAnswer(user, code);
      await Auth.currentSession();
      const payload = Object.entries(user).length !== 0 ? user : undefined;
      dispatch({
        type: Types.handleSignin,
        payload: payload as User,
      });
    } catch (e) {
      setSnackBarStatus({
        isOpen: true, hasError: false, message: 'There was an error Singing in',
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const challenge = params.get('challenge');
    if (challenge) {
      finishSignin(challenge);
    }
  }, []);

  Hub.listen('auth', async (data) => {
    switch (data.payload.event) {
      case 'signIn':
        await Auth.currentAuthenticatedUser().then(
          (user) => {
            setSnackBarStatus({
              isOpen: true, hasError: false, message: user.attributes.email,
            });
          },
        );
        break;
      case 'signIn_failure':
        setSnackBarStatus({
          isOpen: true, hasError: true,
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
      const user = await checkUserLoggedIn();
      const payload = Object.entries(user).length !== 0 ? user : undefined;
      dispatch({
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
        <SigninScreen closeModal={closeModal} custom={{ logoUrl: STARDUST_LOGO, ...custom }} />)}
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
