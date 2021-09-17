// Libs
import { Dispatch } from 'react';
import { CognitoUserInterface } from '@aws-amplify/ui-components';

export enum TTypes {
  handleOpenModal = 'HANDLE_OPEN_MODAL',
  handleSignin = 'HANDLE_SIGNIN',
}

export type TActionIsOpen = {
  type: TTypes.handleOpenModal;
  payload: boolean;
};

export type TActionSignin = {
  type: TTypes.handleSignin;
  payload?: TUser;
};

export type TAction = TActionIsOpen | TActionSignin;

export type TUser = CognitoUserInterface | undefined;

export type TState = {
  user?: TUser;
  isOpen: boolean;
};

export type TContext = {
  state: TState;
  dispatch: Dispatch<TAction>;
};

export type TStateContext = TState & {
  handleOpenModal: (isOpen: boolean) => void;
  dispatch: Dispatch<TAction>;
};

export type TProviderProps = {
  isOpen?: boolean;
};
