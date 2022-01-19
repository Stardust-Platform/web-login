import { memo } from 'react';
import { useAuthContext } from "@stardust-platform/web-login";
import {useNavigate } from 'react-router-dom'

const Main = () => {
  const { user, handleOpenModal, isOpen, handleSignOut, isSessionLoading } = useAuthContext();
  const navigate = useNavigate();

  const logoutHandler =  () => {
    handleSignOut();
    navigate('/');
  }
  
  return (
    <div>
      <h1>{isSessionLoading ? 'LOADING...' : ''}</h1>
      <div>{user?.username}</div>
      <button type="button" onClick={() => handleOpenModal(!isOpen)}>
        Toggle login
      </button>
      <button type="button" onClick={logoutHandler}>
        Sign out
      </button>
    </div>
  );
};

export default memo(Main);
