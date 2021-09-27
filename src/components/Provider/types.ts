// Libs
import { Dispatch } from 'react';
import { CognitoUserInterface } from '@aws-amplify/ui-components';

export enum Types {
  handleOpenModal = 'HANDLE_OPEN_MODAL',
  handleSignin = 'HANDLE_SIGNIN',
  handleSignOut = 'HANDLE_SIGNOUT',
}

export type ActionIsOpen = {
  type: Types.handleOpenModal;
  payload: boolean;
};

export type ActionSignin = {
  type: Types.handleSignin;
  payload?: User;
};

export type ActionSignOut = {
  type: Types.handleSignOut;
  payload?: undefined;
};

export type Action = ActionIsOpen | ActionSignin | ActionSignOut;

export type User = CognitoUserInterface | undefined;

export type State = {
  user?: User;
  isOpen: boolean;
};

export type Context = {
  state: State;
  dispatch: Dispatch<Action>;
};

export type StateContext = State & {
  handleOpenModal: (isOpen: boolean) => void;
  handleSignOut: () => void;
  dispatch: Dispatch<Action>;
};

export type ProviderProps = {
  isOpen?: boolean;
  customLogoUrl?: string;
};
