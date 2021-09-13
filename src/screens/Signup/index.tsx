// libs
import { FormEvent, useState } from 'react';
// Config
import UserPool from '../../UserPool';
// Styles
import { Container, Form } from './styles';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    UserPool.signUp(email, password, [], [], (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };
  
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type='submit'>Signup</button>
      </Form>
    </Container>
  );
};

export default Signup;
