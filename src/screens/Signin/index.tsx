// libs
import React, { memo, FC } from 'react';
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
  const {
    logoUrl, termsServiceUrl, privacyPolicyUrl, containerClassName,
  } = custom ?? {};

  return (
    <>
      <Container className={containerClassName ?? ''}>
        <Form>
          <HeaderContainer>
            <LogoImage src={logoUrl} alt="Logo" />
            <CloseIconContainer onClick={closeModal}>
              <Icon icon={IconsEnum.Close} />
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
            <StrongUnderlineText href={termsServiceUrl ?? ''}>Terms of Service</StrongUnderlineText>
            {' '}
            and
            {' '}
            <StrongUnderlineText href={privacyPolicyUrl ?? ''}>Privacy Policy</StrongUnderlineText>
          </TermsText>
        </Form>
      </Container>
      <Backdrop onClick={closeModal} />
    </>
  );
};

export default memo(Signin);
export type { SigninProps };
