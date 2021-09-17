import { TState, TAction, TTypes } from './interfaces';

const AuthReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case TTypes.handleOpenModal: {
      return {
        ...state,
        isOpen: action?.payload,
      };
    }

    case TTypes.handleSignin: {
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
