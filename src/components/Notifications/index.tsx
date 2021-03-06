// Libs
import React, { memo, FC, useEffect } from 'react';
// Styles
import {
  Notification, TextContainer, Text, CloseIconContainer, NotificationMessage,
} from './styles';
// Types
import { NotificationsProps } from './types';
// Components
import Icon, { IconsEnum } from '../Icons';

// eslint-disable-next-line func-names
const Notifications: FC<NotificationsProps> = function (props) {
  const {
    closeNotification, isOpen, hasError, message,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      closeNotification?.();
    }, 6000);
  }, []);

  if (!isOpen) return null;

  return (
    <Notification>
      <TextContainer>
        { !hasError
          ? (
            <>
              <Icon icon={IconsEnum.Success} />
              <Text>Sucessfully Logged In</Text>
            </>
          ) : (
            <>
              <Icon icon={IconsEnum.Error} />
              <Text>Error Logging in. Please try again.</Text>
            </>
          )}

        <CloseIconContainer onClick={closeNotification}>
          <Icon icon={IconsEnum.Close} />
        </CloseIconContainer>
      </TextContainer>

      <NotificationMessage>{message}</NotificationMessage>
    </Notification>
  );
};

export default memo(Notifications);
