import { memo } from 'react';
import { useAuthContext } from 'web-login';

const Main = () => {
  const { user, handleOpenModal, isOpen, handleSignOut, isSessionLoading } = useAuthContext();

  console.log(isSessionLoading)

  return (
    <div>
      <h1>{isSessionLoading ? 'LOADING...' : ''}</h1>
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
