// Libs
import React, { FC } from 'react';
// Types
import { EmailLoadingProps } from './types';
// Styles
import {
  EmailVerificationText, EmailActionText, LoaderContainer, ResendEmailContainer, ResendEmailLink,
} from './styles';

// eslint-disable-next-line func-names
const EmailLoading: FC<EmailLoadingProps> = function ({ email, resendEmail, isResendClicked }) {
  return (
    <>
      <EmailVerificationText>
        We sent an email to
        <br />
        {' '}
        {email}
        {' '}
      </EmailVerificationText>
      <EmailActionText>
        Click the link in the email to
        <br />
        {' '}
        continue.
      </EmailActionText>
      <LoaderContainer>
        <div />
        <div />
        <div />
        <div />
      </LoaderContainer>
      <ResendEmailContainer>
        <div>Can&apos;t find the email?</div>
        <ResendEmailLink onClick={resendEmail}>
          {isResendClicked ? 'Email Sent' : 'Resend Email'}
        </ResendEmailLink>
      </ResendEmailContainer>
    </>
  );
};

export default EmailLoading;
