// libs
import React, {
  memo, FC, useState, FormEvent,
} from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import axios from 'axios';
// Components
import Icon, { IconsEnum } from '../../components/Icons';
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
  SocialMediaButton,
  IconContainer,
  SeparatorLine,
  TermsText,
  StrongUnderlineText,
  EmailVerificationText,
  EmailActionText,
  LoaderContainer,
  ResendEmailContainer,
  ResendEmailLink,
  Backdrop,
} from './styles';
// Interfaces
import { EmailError, SigninProps } from './types';

const loginUrl = 'https://0jlwpmenkg.execute-api.us-east-1.amazonaws.com/dev/login';

const emailRegex = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const Signin: FC<SigninProps> = ({ closeModal, custom }) => {
  const [isSingup, setIsSingup] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<EmailError>({
    hasError: false, message: '',
  });

  const {
    logoUrl,
    termsServiceUrl,
    privacyPolicyUrl,
    containerClassName,
    termsServiceProps,
    privacyPolicyProps,
  } = custom ?? {};

  const cleanErrors = () => {
    setEmailError({
      hasError: false, message: '',
    });
  };

  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (email.length === 0 || !(emailRegex.test(email))) {
      setEmailError({
        hasError: true, message: 'Enter a valid email.',
      });
      return;
    }

    if (isSingup) {
      if (typeof window === 'undefined') return;
      const array = new Uint32Array(5);
      crypto.getRandomValues(array);

      try {
        await Auth.signUp({
          username: email,
          password: array.join('-'),
          attributes: {
            email,
          },
        });
        cleanErrors();
        setIsEmailLoading(true);
      } catch (error: any) {
        setEmailError({
          hasError: true, message: error.message,
        });
      }
    } else if (!isSingup) {
      try {
        await axios.post(loginUrl, { email });
        cleanErrors();
        setIsEmailLoading(true);
      } catch {
        setEmailError({
          hasError: false, message: 'There was an error. Try again.',
        });
      }
    }
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
                    <ResendEmailLink>Resend Email</ResendEmailLink>
                  </ResendEmailContainer>
                </>
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

                  <SocialMediaButton
                    type="button"
                    onClick={() => Auth.federatedSignIn({
                      provider: CognitoHostedUIIdentityProvider.Google,
                    })}
                  >
                    <IconContainer>
                      <Icon icon={IconsEnum.Google} />
                    </IconContainer>
                    Continue with Google
                  </SocialMediaButton>

                  <SocialMediaButton
                    type="button"
                    onClick={() => Auth.federatedSignIn({
                      provider: CognitoHostedUIIdentityProvider.Facebook,
                    })}
                  >
                    <IconContainer>
                      <Icon icon={IconsEnum.Facebook} />
                    </IconContainer>
                    Continue with Facebook
                  </SocialMediaButton>

                  <SocialMediaButton
                    type="button"
                    onClick={() => Auth.federatedSignIn({
                      provider: CognitoHostedUIIdentityProvider.Apple,
                    })}
                  >
                    <IconContainer>
                      <Icon icon={IconsEnum.Apple} />
                    </IconContainer>
                    Continue with Apple
                  </SocialMediaButton>

                  <SocialMediaButton
                    type="button"
                    onClick={() => Auth.federatedSignIn({
                      customProvider: 'Discord',
                    })}
                  >
                    <IconContainer>
                      <Icon icon={IconsEnum.Discord} />
                    </IconContainer>
                    Continue with Discord
                  </SocialMediaButton>

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
