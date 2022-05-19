// Libs
import React, {FC, useState} from 'react';
// Types
import { EmailLoadingProps } from './types';
// Styles
import {
  EmailVerificationText,
  EmailActionText,
  LoaderContainer,
  ResendEmailContainer,
  ResendEmailLink,
  ChangeEmail,
  CodeContainer,
  ConfirmButton
} from './styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {
  TextInput,
  TextContainer, ErrorMessage,
} from "../../screens/Signin/styles";

// eslint-disable-next-line func-names
const EmailLoading: FC<EmailLoadingProps> = function (
  { email,
    resendEmail,
    isResendClicked,
    setIsEmailLoading,
    finishSignInWithCode,
    setEmailError,
    error }) {

  const [code, setCode] = useState('');
  const linkEnv = process.env.REACT_APP_LINK ? false : true


  return (
    <>
      {!linkEnv ?
        <CodeContainer>
          <EmailActionText>
            Please check your email for a 6
            digit code and enter it below
          </EmailActionText>
          <TextContainer hasError={error.hasError}>
            <div>
              <FontAwesomeIcon style={{color: '#CACACA'}} icon={faLock}/>
            </div>
            <TextInput
              value={code}
              required={true}
              onChange={(e) => {
                setCode(e.target.value)
                setEmailError({hasError: false, message: ''})
              }}
              min={6}
              maxLength={6}
              placeholder="Enter code"/>
          </TextContainer>
          <ErrorMessage>{error.message}</ErrorMessage>
          <ConfirmButton
            style={{
              opacity: code.length !== 6 ? 0.5 : 1,
              cursor: code.length !== 6 ? 'not-allowed' : 'pointer',
            }}
            disabled={code.length !== 6} onClick={() => {
            finishSignInWithCode(code)
          }}>
            Confirm
          </ConfirmButton>
          <ResendEmailContainer>
            <ChangeEmail onClick={() => {
              setIsEmailLoading(false)
              setEmailError({hasError: false, message: ''})
            }}>
              Change email
            </ChangeEmail>
            <ResendEmailLink onClick={resendEmail}>
              {isResendClicked ? 'Email Sent' : 'Resend code'}
            </ResendEmailLink>
          </ResendEmailContainer>
        </CodeContainer>
        :
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
      }
    </>
  );
};

export default EmailLoading;
