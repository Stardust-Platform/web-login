// . Libs
import { createContext, useContext } from 'react';
// Interfaces
import { TStateContext, TContext, TTypes } from './interfaces';

export const AuthContext = createContext<TContext | undefined>(undefined);

const useAuthContext = (): TStateContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a AuthProvider');
  }

  const { state, dispatch } = context;

  const handleOpenModal = (isOpen: boolean) => {
    dispatch({ type: TTypes.handleOpenModal, payload: isOpen });
  };

  return { ...state, handleOpenModal, dispatch };
};

export default useAuthContext;
