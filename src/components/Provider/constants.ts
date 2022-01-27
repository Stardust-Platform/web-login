import { State } from './types';

// eslint-disable-next-line import/prefer-default-export
export const initialState: State = {
  user: undefined,
  isOpen: false,
  isSessionLoading: true,
  isResendClicked: false,
};
