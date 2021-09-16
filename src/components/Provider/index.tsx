// . Libs
import React, {
  createContext,
  useReducer,
  useMemo,
  useContext,
  FC,
  Dispatch,
} from 'react';
// Consts
import { initialState } from './constants';
// Interfaces
import { TState, TStateContext, TAction, TTypes } from './interfaces';

type TContext = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

const AuthContext = createContext<TContext | undefined>(undefined);

const AuthReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case TTypes.handleOpen: {
      return {
        ...state,
        isOpen: action?.payload,
      };
    }

    default:
      throw new Error(`Action is not supported: ${action.type}`);
  }
};

export const AuthProvider: FC = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value} {...props} />;
};

// Custom hook useAuthContext
export const useAuthContext = (): TStateContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside a AuthProvider');
  }

  const { state, dispatch } = context;

  const handleOpen = (isOpen: boolean) => {
    dispatch({ type: TTypes.handleOpen, payload: isOpen });
  };

  return { ...state, handleOpen };
};
