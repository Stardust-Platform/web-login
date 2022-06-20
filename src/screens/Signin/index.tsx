// libs
import React, {
  FC, memo, useState,
} from 'react';
// Components
import EmailLoading from '../../components/EmailLoading';
import SocialMediaButtons from '../../components/SocialMediaButtons';
import Icon, { IconsEnum } from '../../components/Icons';
// Hooks
// eslint-disable-next-line import/no-cycle
import useEmailSignin from '../../hooks/useEmailSignin';
// Styles
import { LoaderContainer } from '../../components/EmailLoading/styles';
import {
  BackArrowIconContainer,
  Backdrop,
  CloseIconContainer,
  MagicLoading,
  Container,
  ContinueButton,
  EmailContainer,
  EmailInput,
  ErrorMessage,
  Form,
  HeaderContainer,
  LogoImage,
  OptionToSocialText,
  SeparatorLine,
  StrongUnderlineText,
  TermsText,
  Text,
} from './styles';
// Interfaces
import { EmailError, SigninProps } from './types';
// eslint-disable-next-line import/no-cycle
import {Types, User} from '../../components/Provider/types';
import { LIB_VERSION } from '../../version';
import {Auth} from "aws-amplify";
import axios from "axios";

// eslint-disable-next-line func-names
const Signin: FC<SigninProps> = function ({ closeModal, custom, authContext, setSnackBar, loginOptionsEnv }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const { dispatch, state } = authContext;
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<EmailError>({
    hasError: false, message: '',
  });
  const {
    logoUrl,
    magicLinkRedirectUrl,
    termsServiceUrl,
    privacyPolicyUrl,
    containerClassName,
    termsServiceProps,
    privacyPolicyProps,
  } = custom ?? {};

  const {
    loginWithMagicLink, emailRegex, cleanErrors, SigninSignupWithEmail,
  } = useEmailSignin({
    email, setIsEmailLoading, setEmailError, isSignup, setIsSignup, magicLinkRedirectUrl,
  });

  const onSubmit = async (): Promise<void> => {
    dispatch({ type: Types.handleSessionLoading, payload: true });
    await SigninSignupWithEmail(authContext);
  };

  const emailLoginOption = !process.env.REACT_APP_LOGIN_OPTIONS ? true : loginOptionsEnv?.includes('email');

  /*When REACT_APP_LINK is false
  users will receive an email with their code
  so they can login.

  This function calls the verify-code endpoint to make sure
  the code is correct
   */

  const verifyCode = async (code: string) => {
    return await axios.post('https://marketplace-api.stardust.gg/v1/player/login-verify-code', {
      email: email,
      code: code,
      gameId: process.env.REACT_APP_GAME_ID
    }).catch((e) => {
      dispatch({ type: Types.handleSessionLoading, payload: false });
      setEmailError({
        hasError: true,
        message: e.response.data.errorDetail
      })
    });
  }

  /*Sign in function with the code that the user inputs.
    "await verifyCode" check the code before completing
    the login process
   */

  const finishSignInWithCode = async (code: string) => {
    try {
      dispatch({ type: Types.handleMagicLinkLoading, payload: true });
      await verifyCode(code);
      Auth.configure({ clientMetadata: { 'custom:gameId': process.env.REACT_APP_GAME_ID } });
      const user = await Auth.signIn(email);
      await Auth.sendCustomChallengeAnswer(user, code);
      await Auth.currentSession();
      const payload = Object.entries(user).length !== 0 ? user : undefined;
      dispatch({ type: Types.handleSignin, payload: payload as User });
      dispatch({ type: Types.handleOpenModal, payload: false });
      dispatch({ type: Types.handleSessionLoading, payload: false });
    } catch (e: any) {
      dispatch({ type: Types.handleMagicLinkLoading, payload: false });
      if (setSnackBar) {
        setSnackBar({
          isOpen: true,
          hasError: true,
          message: 'An error has occurred while logging in...',
        });
      }
    }
  }

  const resendHandler = async () => {
    dispatch({ type: Types.handleResendClicked, payload: true });
    setTimeout(() => {
      dispatch({ type: Types.handleResendClicked, payload: false });
    }, 10000);
    await loginWithMagicLink()
  }

  return (
    <>
      <Container className={containerClassName ?? ''}>
        <Form onSubmit={onSubmit}>
          <HeaderContainer>
            { isEmailLoading
              && (
              <BackArrowIconContainer onClick={() => {
                setIsEmailLoading(false);
                cleanErrors();
              }}>
                <Icon icon={IconsEnum.BackArrow} />
              </BackArrowIconContainer>
              )}

            <LogoImage src={logoUrl} alt="Logo" />

            <CloseIconContainer onClick={closeModal}>
              <Icon icon={IconsEnum.Close} />
            </CloseIconContainer>
          </HeaderContainer>

          {state.isMagicLinkLoading
            && (
              <MagicLoading>
                <LoaderContainer>
                  <div />
                  <div />
                  <div />
                  <div />
                </LoaderContainer>
                Logging in...
              </MagicLoading>
            )}

          {isEmailLoading && !state.isMagicLinkLoading
            && (
              <EmailLoading
                setIsEmailLoading={setIsEmailLoading}
                error={emailError}
                finishSignInWithCode={(code) => {
                  finishSignInWithCode(code)
                }}
                setEmailError={() => {
                  setEmailError({hasError: false, message: ''})
                }}
                isResendClicked= {state.isResendClicked}
                email={email}
                resendEmail={resendHandler}
              />
            )}

          {!isEmailLoading && !state.isMagicLinkLoading
          && (
          <>
            <Text>{emailLoginOption ? 'Enter an email to login' : 'Welcome To Login'}</Text>
            {emailLoginOption && <EmailContainer hasError={emailError.hasError}>
              <div>
                <Icon icon={IconsEnum.Email} />
              </div>
              <EmailInput
                id="email"
                value={email}
                placeholder="Email address"
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (emailRegex.test(event.target.value)) {
                    cleanErrors();
                  }
                }}
              />
            </EmailContainer>}

            { emailError && emailError.message && emailError.message.length > 0
            && <ErrorMessage>{emailError.message}</ErrorMessage>}

            {emailLoginOption ? <ContinueButton onClick={onSubmit} type="submit">
              Continue
            </ContinueButton> : ''}

            {loginOptionsEnv?.length === 1 && loginOptionsEnv.includes('email') ? '' : emailLoginOption && <OptionToSocialText>or Sign In with</OptionToSocialText>}

            <SocialMediaButtons loginOptionsEnv={loginOptionsEnv} />

            <SeparatorLine />

            <TermsText>
              Version:
              {' '}
              {LIB_VERSION}
              <br />
              <br />
              {' '}
              When you sign up, you’re accepting our
              <br />
              {' '}
              <StrongUnderlineText href={termsServiceUrl ?? ''} {...termsServiceProps}>
                Terms of Service
              </StrongUnderlineText>
              {' '}
              and
              {' '}
              <StrongUnderlineText href={privacyPolicyUrl ?? ''} {...privacyPolicyProps}>
                Privacy Policy
              </StrongUnderlineText>
            </TermsText>
          </>
          )}

        </Form>
      </Container>
      <Backdrop onClick={closeModal} />
    </>
  );
};

export default memo(Signin);
export type { SigninProps };
