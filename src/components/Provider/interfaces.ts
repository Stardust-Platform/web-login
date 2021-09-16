export enum TTypes {
  handleOpen = 'HANDLE_OPEN',
}

export type TUser = {
  id?: number;
  userId?: string;
  email?: string;
};

export type TState = {
  user?: TUser;
  isOpen: boolean;
};

export type TActionIsOpen = {
  type: TTypes.handleOpen;
  payload: boolean;
};

export type TAction = TActionIsOpen;

export type TStateContext = TState & {
  handleOpen: (isOpen: boolean) => void;
};
