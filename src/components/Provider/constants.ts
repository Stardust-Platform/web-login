import { TState, TUser } from './interfaces';

export const initialUser: TUser = {
  id: 1,
  userId: '23dsjfl2',
  email: 's.molina@opticpower.com',
};

export const initialState: TState = {
  user: initialUser,
  isOpen: false,
};
