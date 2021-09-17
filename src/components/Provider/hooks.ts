// . Libs
import { createContext, useContext } from 'react';
// Interfaces
import { StateContext, Context, Types } from './types';

export const AuthContext = createContext<Context | undefined>(undefined);

const useAuthContext = (): StateContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a AuthProvider');
  }

  const { state, dispatch } = context;

  const handleOpenModal = (isOpen: boolean) => {
    dispatch({ type: Types.handleOpenModal, payload: isOpen });
  };

  return { ...state, handleOpenModal, dispatch };
};

export default useAuthContext;
