/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

const Notifications: FC<NotificationsProps> = (props) => {
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
    <>
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
    </>
  );
};

export default memo(Notifications);
