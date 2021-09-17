import { State, Action, Types } from './types';

const AuthReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.handleOpenModal: {
      return {
        ...state,
        isOpen: action?.payload,
      };
    }

    case Types.handleSignin: {
      return {
        ...state,
        user: action?.payload,
      };
    }

    default:
      throw new Error(`Action is not supported: ${action}`);
  }
};

export default AuthReducer;
