// . Libs
import { createContext, useContext } from 'react';
import { Auth } from 'aws-amplify';
// Interfaces
import { StateContext, Context, Types } from './types';

export const AuthContext = createContext<Context | undefined>(undefined);

const signOut = async (dispatchCallback: () => void) => {
  const cognitoUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
  cognitoUser.signOut();
  await Auth.signOut({ global: true }).then(
    () => dispatchCallback(),
    // eslint-disable-next-line no-console
    (error) => console.error(error),
  );
};

const useAuthContext = (): StateContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a AuthProvider');
  }

  const { state, dispatch } = context;

  const handleOpenModal = (isOpen: boolean) => {
    dispatch({ type: Types.handleOpenModal, payload: isOpen });
  };

  const handleSignOut = () => {
    signOut(() => dispatch({ type: Types.handleSignOut }));
  };

  return {
    ...state, handleOpenModal, handleSignOut, dispatch,
  };
};

export default useAuthContext;
