// libs
import axios from 'axios';
import { Auth } from 'aws-amplify';
import * as dotenv from 'dotenv';

// Interfaces
import { EmailError } from '../screens/Signin/types';

const loginUrl = 'https://opzvmjx033.execute-api.us-east-1.amazonaws.com/v1/player/login';

const emailRegex = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

dotenv.config();

type UseEmailSigninProps = {
  email: string;
  setIsEmailLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailError: React.Dispatch<React.SetStateAction<EmailError>>;
  isSignUp: boolean;
  magicLinkRedirectUrl?: string;
};

const useEmailSignin = (
  {
    email, setIsEmailLoading, setEmailError, isSignUp, magicLinkRedirectUrl,
  }: UseEmailSigninProps,
) => {
  const cleanErrors = () => {
    setEmailError({
      hasError: false, message: '',
    });
  };

  const loginWithMagicLink = async () => {
    try {
      await axios.post(loginUrl, {
        email, redirect: magicLinkRedirectUrl ?? window?.location?.origin,
      });
      cleanErrors();
      setIsEmailLoading(true);
    } catch {
      setEmailError({
        hasError: false, message: 'There was an error. Try again.',
      });
    }
  };

  const SigninSignupWithEmail = async () => {
    if (email.length === 0 || !(emailRegex.test(email))) {
      setEmailError({
        hasError: true, message: 'Enter a valid email.',
      });
      return;
    }
    if (!process.env.REACT_APP_GAME_ID || Number(process.env.REACT_APP_GAME_ID) < 1) {
      setEmailError({
        hasError: true, message: 'REACT_APP_GAME_ID must be a value > 0',
      });
      return;
    }
    if (isSignUp) {
      if (typeof window === 'undefined') return;
      const array = new Uint32Array(5);
      crypto.getRandomValues(array);

      try {
        await Auth.signUp({
          username: email,
          password: array.join('-'),
          attributes: {
            email,
            'custom:gameId': process.env.REACT_APP_GAME_ID, // required to be a string representation of a number in this api
          },
        });
        cleanErrors();
        setIsEmailLoading(true);
        loginWithMagicLink();
      } catch (error: any) {
        setEmailError({
          hasError: true, message: error.message,
        });
      }
    } else if (!isSignUp) {
      await loginWithMagicLink();
    }
  };

  return {
    loginWithMagicLink,
    SigninSignupWithEmail,
    cleanErrors,
    emailRegex,
  };
};

export default useEmailSignin;
