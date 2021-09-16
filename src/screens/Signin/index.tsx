// libs
import React, { FormEvent, useState, memo, FC } from 'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import Amplify, { Auth } from 'aws-amplify';
// Config
import awsconfig from '../../aws-exports';
// Styles
import { Container, Form, SocialMediaContainer } from './styles';

Amplify.configure(awsconfig);

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Sign in</button>
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
        </SocialMediaContainer>
      </Form>
    </Container>
  );
};

export default memo(Login);
