// libs
import React from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
// Components
import Icon, { IconsEnum } from '../Icons';
// Styles
import { SocialMediaButton, IconContainer} from './styles';

interface props {
  loginOptionsEnv: string | undefined;
}

// eslint-disable-next-line func-names
const SocialMediaButtons = function ({loginOptionsEnv}: props) {


  const loginOptions = (socialName: string) => {
    return loginOptionsEnv?.includes(socialName) ? socialName : null;
  }

  return (
    <>

      {loginOptions('google') && <SocialMediaButton
        type="button"
        onClick={() => Auth.federatedSignIn({
          provider: CognitoHostedUIIdentityProvider.Google,
        })}
      >
        <IconContainer>
          <Icon icon={IconsEnum.Google} />
        </IconContainer>
        Continue with Google
      </SocialMediaButton>}

      {loginOptions('discord') && <SocialMediaButton
        type="button"
        onClick={() => Auth.federatedSignIn({
          customProvider: 'Discord',
        })}
      >
        <IconContainer>
          <Icon icon={IconsEnum.Discord} />
        </IconContainer>
        Continue with Discord
      </SocialMediaButton>}

      {/*{loginOptions('facebook') && <Disable>*/}
      {/*  <SocialMediaButton*/}
      {/*    type="button"*/}
      {/*    onClick={() => Auth.federatedSignIn({*/}
      {/*      provider: CognitoHostedUIIdentityProvider.Facebook,*/}
      {/*    })}*/}
      {/*  >*/}
      {/*    <IconContainer>*/}
      {/*      <Icon icon={IconsEnum.Facebook} />*/}
      {/*    </IconContainer>*/}
      {/*    Continue with Facebook*/}
      {/*  </SocialMediaButton>*/}
      {/*</Disable>}*/}

      {/*{loginOptions('apple') && <Disable>*/}
      {/*  <SocialMediaButton*/}
      {/*    type="button"*/}
      {/*    onClick={() => Auth.federatedSignIn({*/}
      {/*      provider: CognitoHostedUIIdentityProvider.Apple,*/}
      {/*    })}*/}
      {/*  >*/}
      {/*    <IconContainer>*/}
      {/*      <Icon icon={IconsEnum.Apple} />*/}
      {/*    </IconContainer>*/}
      {/*    Continue with Apple*/}
      {/*  </SocialMediaButton>*/}
      {/*</Disable>}*/}

    </>
  );
};

export default SocialMediaButtons;
