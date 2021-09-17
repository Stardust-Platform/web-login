import React, { memo } from 'react';
import { useAuthContext } from '../../..';

const Main = () => {
  const { user, handleOpenModal, isOpen } = useAuthContext();

  return (
    <div>
      <div>{user?.username}</div>
      <button type="button" onClick={() => handleOpenModal(!isOpen)}>
        Toggle login
      </button>
    </div>
  );
};

export default memo(Main);
