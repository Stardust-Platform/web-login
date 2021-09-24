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
// Styles
import GlobalStyle from '../../GlobalStyle';

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

export const AuthProvider: FC<ProviderProps> = (props) => {
  const { isOpen = false } = props;
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
      <GlobalStyle />
      <AuthContext.Provider value={value} {...props} />
      {state.isOpen && <SigninScreen closeModal={closeModal} />}
    </>
  );
};

AuthProvider.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  isOpen: false,
};

export { useAuthContext };
