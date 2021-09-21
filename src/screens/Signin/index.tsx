// libs
import React, { FormEvent, useState, memo, FC } from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import Amplify, { Auth } from 'aws-amplify';
// Config
import awsconfig from '../../aws-exports';
// Styles
import { Container, Form, SocialMediaContainer } from './styles';

Amplify.configure(awsconfig);

const Signin: FC = () => {
  const [isSingup, setIsSingup] = useState(false);
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h1>{isSingup ? 'Sign up' : 'Sign in'}</h1>
        <SocialMediaContainer>
          <button
            type="button"
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook,
              })
            }
          >
            Facebook
          </button>
          <button
            type="button"
            onClick={() =>
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              })
            }
          >
            Google
          </button>
          <button
            type="button"
            onClick={() =>
              Auth.federatedSignIn({
                customProvider: 'Discord',
              })
            }
          >
            Discord
          </button>
        </SocialMediaContainer>
      </Form>
      <button type="button" onClick={() => setIsSingup(!isSingup)}>
        {isSingup ? 'Sign in instead' : 'Sign up instead'}
      </button>
    </Container>
  );
};

export default memo(Signin);
