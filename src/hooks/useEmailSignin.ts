// libs
import axios from 'axios';
import { Auth } from 'aws-amplify';
// Interfaces
import { EmailError } from '../screens/Signin/types';

const loginUrl = 'https://opzvmjx033.execute-api.us-east-1.amazonaws.com/v1/player/login';

const emailRegex = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

type UseEmailSigninProps = {
  email: string;
  setIsEmailLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailError: React.Dispatch<React.SetStateAction<EmailError>>;
  isSingup: boolean;
  magicLinkRedirectUrl?: string;
};

const useEmailSignin = (
  {
    email, setIsEmailLoading, setEmailError, isSingup, magicLinkRedirectUrl,
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

    if (isSingup) {
      if (typeof window === 'undefined') return;
      const array = new Uint32Array(5);
      crypto.getRandomValues(array);

      try {
        await Auth.signUp({
          username: email,
          password: array.join('-'),
          attributes: {
            email,
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
    } else if (!isSingup) {
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
