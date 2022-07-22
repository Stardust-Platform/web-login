import { State } from './types';

// eslint-disable-next-line import/prefer-default-export
export const initialState: State = {
  user: undefined,
  isOpen: false,
  isSessionLoading: true,
  isMagicLinkLoading: false,
  isResendClicked: false,
  gameId:
    localStorage.getItem('StardustWebSdk:gameId') ||
    (process.env.REACT_APP_GAME_ID as string),
};
