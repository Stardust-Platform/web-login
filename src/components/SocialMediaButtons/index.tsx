// libs
import React from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
// Components
import Icon, { IconsEnum } from '../Icons';
// Styles
import { SocialMediaButton, IconContainer, Disable } from './styles';

const SocialMediaButtons = () => (
  <>
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

    <Disable>
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
    </Disable>

    <Disable>
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
    </Disable>

  </>
);

export default SocialMediaButtons;
