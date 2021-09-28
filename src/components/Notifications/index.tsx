// Libs
import React, { memo, FC } from 'react';
// Styles
import { Notification, Backdrop } from './styles';
// Types
import { NotificationsProps } from './types';

const Notifications: FC<NotificationsProps> = (props) => {
  const { closeNotification, isOpen } = props;
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ isOpen', isOpen);
  return (
    <>
      <Notification>
        <div className="content">
          <div className="identifier">error</div>
          <div className="text">text</div>
        </div>
      </Notification>
      <Backdrop onClick={closeNotification} />
    </>
  );
};

export default memo(Notifications);
