// . Libs
import React, {
  useReducer, useMemo, useEffect, FC,
} from 'react';
import { Auth } from 'aws-amplify';
// Screens
import SigninScreen from '../../screens/Signin';
// Consts
import { initialState } from './constants';
// Interfaces
import { Types, ProviderProps, User } from './types';
// Reducers
import AuthReducer from './reducer';
// Hooks
import useAuthContext, { AuthContext } from './hooks';

const checkUserLoggedIn = async () => {
  let user = {};
  await Auth.currentAuthenticatedUser().then(
    (data) => {
      user = data;
    },
    (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    },
  );
  return user;
};

const STARDUST_LOGO = 'https://sd-game-assets.s3.amazonaws.com/_Stardust_Dark_Branding.svg';

export const AuthProvider: FC<ProviderProps> = (props) => {
  const { isOpen, customLogoUrl } = props;
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

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
      <AuthContext.Provider value={value} {...props} />
      {state.isOpen && <SigninScreen closeModal={closeModal} customLogoUrl={customLogoUrl} />}
    </>
  );
};

AuthProvider.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  isOpen: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  customLogoUrl: STARDUST_LOGO,
};

export { useAuthContext };
