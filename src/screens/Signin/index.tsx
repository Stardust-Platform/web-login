// libs
import React, { FormEvent, memo, FC } from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import Amplify, { Auth } from 'aws-amplify';
// Components
import CloseIconSvg from '../../components/CloseIconSvg';
import Icon from '../../components/Icons';
// Config
import awsconfig from '../../aws-exports';
// Styles
import {
  Container,
  Form,
  HeaderContainer,
  LogoImage,
  CloseIconContainer,
  Text,
  SocialMediaButton,
  IconContainer,
  SeparatorLine,
  TermsText,
  StrongUnderlineText,
  Backdrop,
} from './styles';
// Enums
import IconsEnum from '../../components/Icons/iconsEnum';
// Interfaces
import { SigninProps } from './types';

const { origin } = window.location;

// Override aws config redirect with current origin
const newAWSConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: origin,
    redirectSignOut: origin,
  },
};

Amplify.configure(newAWSConfig);

const Signin: FC<SigninProps> = ({ closeModal, customLogoUrl }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <HeaderContainer>
            <LogoImage src={customLogoUrl} alt="Logo" />
            <CloseIconContainer onClick={closeModal}>
              <CloseIconSvg />
            </CloseIconContainer>
          </HeaderContainer>

          <Text>Sign In with:</Text>
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
              customProvider: 'Twitter',
            })}
          >
            <IconContainer>
              <Icon icon={IconsEnum.Twitter} />
            </IconContainer>
            Continue with Twitter
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
            <StrongUnderlineText>Terms of Service</StrongUnderlineText>
            {' '}
            and
            {' '}
            <StrongUnderlineText>Privacy Policy</StrongUnderlineText>
          </TermsText>
        </Form>
      </Container>
      <Backdrop onClick={closeModal} />
    </>
  );
};

export default memo(Signin);
