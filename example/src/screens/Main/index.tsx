import { memo } from 'react';
import { useAuthContext } from 'web-login';

const Main = () => {
  const { user, handleOpenModal, isOpen, handleSignOut } = useAuthContext();

  return (
    <div>
      <div>{user?.username}</div>
      <button type="button" onClick={() => handleOpenModal(!isOpen)}>
        Toggle login
      </button>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default memo(Main);
