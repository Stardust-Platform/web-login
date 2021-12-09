import { State, Action, Types } from './types';

const AuthReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.handleOpenModal: {
      return {
        ...state,
        isOpen: action?.payload,
      };
    }

    case Types.handleSessionLoading: {
      return {
        ...state,
        isSessionLoading: action?.payload,
      };
    }

    case Types.handleSignin: {
      return {
        ...state,
        user: action?.payload,
      };
    }

    case Types.handleSignOut: {
      return {
        ...state,
        user: undefined,
      };
    }

    default:
      throw new Error(`Action is not supported: ${action}`);
  }
};

export default AuthReducer;
