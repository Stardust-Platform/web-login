/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
// libs
import React, {
  memo, FC, useState,
} from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
// Components
import Icon, { IconsEnum } from '../../components/Icons';
// Styles
import {
  Container,
  Form,
  HeaderContainer,
  LogoImage,
  CloseIconContainer,
  Text,
  EmailContainer,
  EmailInput,
  ContinueButton,
  SwitchModeText,
  OptionToSocialText,
  SocialMediaButton,
  IconContainer,
  SeparatorLine,
  TermsText,
  StrongUnderlineText,
  Backdrop,
} from './styles';
// Interfaces
import { SigninProps } from './types';

const Signin: FC<SigninProps> = ({ closeModal, custom }) => {
  const [isSingup, setIsSingup] = useState(false);
  const [email, setEmail] = useState('');

  const {
    logoUrl, termsServiceUrl, privacyPolicyUrl, containerClassName,
  } = custom ?? {};

  const onSubmit = (event: any): void => {
    event.preventDefault();
  };

  return (
    <>
      <Container className={containerClassName ?? ''}>
        <Form onSubmit={onSubmit}>
          <HeaderContainer>
            <LogoImage src={logoUrl} alt="Logo" />
            <CloseIconContainer onClick={closeModal}>
              <Icon icon={IconsEnum.Close} />
            </CloseIconContainer>
          </HeaderContainer>

          <Text>{isSingup ? 'New user? Create your account' : 'Log in to your account'}</Text>

          <EmailContainer>
            <div>
              <Icon icon={IconsEnum.Email} />
            </div>
            <EmailInput
              id="email"
              value={email}
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </EmailContainer>

          <ContinueButton type="submit">Continue</ContinueButton>

          {isSingup
            ? (
              <SwitchModeText>
                Already have an account?
                {' '}
                <span onClick={() => setIsSingup(false)}>Sign in</span>
              </SwitchModeText>
            )
            : (
              <SwitchModeText>
                Don't have an account?
                {' '}
                <span onClick={() => setIsSingup(true)}>Sign up</span>
              </SwitchModeText>
            )}

          <OptionToSocialText>{isSingup ? 'or Sign up with' : 'or Sign In with'}</OptionToSocialText>

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
            {' '}
            <StrongUnderlineText href={termsServiceUrl ?? ''}>
              Terms of Service
            </StrongUnderlineText>
            {' '}
            and
            {' '}
            <StrongUnderlineText href={privacyPolicyUrl ?? ''}>
              Privacy Policy
            </StrongUnderlineText>
          </TermsText>
        </Form>
      </Container>
      <Backdrop onClick={closeModal} />
    </>
  );
};

export default memo(Signin);
export type { SigninProps };
