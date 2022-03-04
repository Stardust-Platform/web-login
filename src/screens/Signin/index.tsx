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
import { Types } from '../../components/Provider/types';
import { LIB_VERSION } from '../../version';

// eslint-disable-next-line func-names
const Signin: FC<SigninProps> = function ({ closeModal, custom, authContext }) {
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

  const loginWithMagic = async () => {
    if (state.isResendClicked === true) {
      return;
    }
    dispatch({ type: Types.handleResendClicked, payload: true });
    dispatch({ type: Types.handleSessionLoading, payload: true });
    await loginWithMagicLink()
      .catch(() => {
      });
  };

  return (
    <>
      <Container className={containerClassName ?? ''}>
        <Form onSubmit={onSubmit}>
          <HeaderContainer>
            { isEmailLoading
              && (
              <BackArrowIconContainer onClick={() => { setIsEmailLoading(false); }}>
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
            // eslint-disable-next-line max-len
              <EmailLoading isResendClicked={state.isResendClicked} email={email} resendEmail={loginWithMagic} />
            )}

          {!isEmailLoading && !state.isMagicLinkLoading
          && (
          <>
            <Text>Enter an email to login</Text>
            <EmailContainer hasError={emailError.hasError}>
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
            </EmailContainer>

            { emailError && emailError.message && emailError.message.length > 0
            && <ErrorMessage>{emailError.message}</ErrorMessage>}

            <ContinueButton onClick={onSubmit} type="submit">
              Continue
            </ContinueButton>

            <OptionToSocialText>or Sign In with</OptionToSocialText>

            <SocialMediaButtons />

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
