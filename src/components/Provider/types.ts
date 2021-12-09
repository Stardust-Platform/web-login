// Libs
import { Dispatch } from 'react';
import { CognitoUserInterface } from '@aws-amplify/ui-components';
// Components
// eslint-disable-next-line import/no-cycle
import { SigninProps } from '../../screens/Signin';

export enum Types {
  handleOpenModal = 'HANDLE_OPEN_MODAL',
  handleSignin = 'HANDLE_SIGNIN',
  handleSignOut = 'HANDLE_SIGNOUT',
  handleSessionLoading = 'HANDLE_SESSION_LOADING',
}

export type ActionIsSessionLoading = {
  type: Types.handleSessionLoading,
  payload: boolean
};

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

export type Action = ActionIsOpen | ActionSignin | ActionSignOut | ActionIsSessionLoading;

export type User = CognitoUserInterface | undefined;

export type State = {
  user?: User;
  isOpen: boolean;
  isSessionLoading: boolean;
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

export type ProviderProps = SigninProps & {
  isOpen?: boolean;
};

export type SnackBarStatus = {
  isOpen: boolean;
  hasError: boolean;
  message?: string;
};
