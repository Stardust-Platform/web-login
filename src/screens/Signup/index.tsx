// libs
import React, { FormEvent, useState, memo, FC } from 'react';
import { NodeCallback, ISignUpResult } from 'amazon-cognito-identity-js';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import Amplify, { Auth } from 'aws-amplify';
// Config
import UserPool from '../../userPool';
import awsconfig from '../../aws-exports';
// Interfaces
import { IError } from './interfaces';
// Styles
import { Container, Form, SocialMediaContainer } from './styles';

Amplify.configure(awsconfig);

const Signup: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp: NodeCallback<IError, ISignUpResult> = (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    UserPool.signUp(email, password, [], [], handleSignUp);
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
        <button type="submit">Sign up</button>
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

export default memo(Signup);
