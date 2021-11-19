// libs
import React, {
  memo, FC, useState, FormEvent,
} from 'react';
// Components
import EmailLoading from '../../components/EmailLoading';
import SocialMediaButtons from '../../components/SocialMediaButtons';
import Icon, { IconsEnum } from '../../components/Icons';
// Hooks
import useEmailSignin from '../../hooks/useEmailSignin';
// Styles
import {
  Container,
  Form,
  HeaderContainer,
  BackArrowIconContainer,
  LogoImage,
  CloseIconContainer,
  Text,
  EmailContainer,
  ErrorMessage,
  EmailInput,
  ContinueButton,
  SwitchModeText,
  OptionToSocialText,
  SeparatorLine,
  TermsText,
  StrongUnderlineText,
  Backdrop,
} from './styles';
// Interfaces
import { EmailError, SigninProps } from './types';

const Signin: FC<SigninProps> = ({ closeModal, custom }) => {
  const [isSingup, setIsSingup] = useState(false);
  const [email, setEmail] = useState('');
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
    email, setIsEmailLoading, setEmailError, isSignUp: isSingup, magicLinkRedirectUrl,
  });

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    SigninSignupWithEmail();
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

          {
            isEmailLoading
              ? (
                <EmailLoading email={email} resendEmail={loginWithMagicLink} />
              )
              : (
                <>
                  <Text>{isSingup ? 'Create an Account' : 'Log in to your account'}</Text>

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
                    {isSingup ? 'Create Account' : 'Continue'}
                  </ContinueButton>

                  {isSingup
                    ? (
                      <SwitchModeText>
                        Already have an account?
                        {' '}
                        <button
                          type="button"
                          onClick={() => {
                            setIsSingup(false);
                            cleanErrors();
                          }}
                        >
                          Log in
                        </button>
                      </SwitchModeText>
                    )
                    : (
                      <SwitchModeText>
                        Don&apos;t have an account?
                        {' '}
                        <button
                          type="button"
                          onClick={() => {
                            setIsSingup(true);
                            cleanErrors();
                          }}
                        >
                          Sign up
                        </button>
                      </SwitchModeText>
                    )}

                  <OptionToSocialText>or Sign In with</OptionToSocialText>

                  <SocialMediaButtons />

                  <SeparatorLine />

                  <TermsText>
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
              )
          }
        </Form>
      </Container>
      <Backdrop onClick={closeModal} />
    </>
  );
};

export default memo(Signin);
export type { SigninProps };
