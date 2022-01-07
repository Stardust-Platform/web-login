// libs
import axios from 'axios';
import { Auth } from 'aws-amplify';

// Interfaces
import { EmailError } from '../screens/Signin/types';
// eslint-disable-next-line import/no-cycle
import { Types } from '../components/Provider/types';

const loginUrl = 'https://opzvmjx033.execute-api.us-east-1.amazonaws.com/v1/player/login';

// eslint-disable-next-line prefer-regex-literals
const emailRegex = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

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
    } catch (err: any) {
      if (err.response.data.error.startsWith('Sorry, we could not find your account')) {
        setEmailError({
          hasError: false, message: 'Please sign up, this account does not exist',
        });
      } else {
        setEmailError({
          hasError: false, message: err.message,
        });
      }
    }
  };

  const SigninSignupWithEmail = async (authContext: any) => {
    const { dispatch } = authContext;
    if (email.length === 0 || !(emailRegex.test(email))) {
      setEmailError({
        hasError: true, message: 'Enter a valid email.',
      });
      dispatch({ type: Types.handleSessionLoading, payload: false });
      return;
    }
    // console.log('process.env=', process.env);
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
        await loginWithMagicLink();
        dispatch({ type: Types.handleResendClicked, payload: false });
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
