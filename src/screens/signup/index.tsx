// libs
import React, { FormEvent, useState, memo, FC } from 'react';
import { NodeCallback, ISignUpResult } from 'amazon-cognito-identity-js';
// Config
import UserPool from '../../userPool';
// Interfaces
import { Error } from './interfaces';
// Styles
import { Container, Form } from './styles';

const Signup: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp: NodeCallback<Error, ISignUpResult> = (err, data) => {
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
        <button type="submit">Signup</button>
      </Form>
    </Container>
  );
};

export default memo(Signup);
