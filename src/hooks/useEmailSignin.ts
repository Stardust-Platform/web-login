// libs
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { LIB_VERSION } from '../version';

// Interfaces
import { EmailError } from '../screens/Signin/types';
// eslint-disable-next-line import/no-cycle
import { Types } from '../components/Provider/types';

const loginUrl = 'https://bddtm60cbd.execute-api.us-east-1.amazonaws.com/v1/player/login';

// eslint-disable-next-line prefer-regex-literals
const emailRegex = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

type UseEmailSigninProps = {
  email: string;
  setIsEmailLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailError: React.Dispatch<React.SetStateAction<EmailError>>;
  isSignup: boolean;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
  magicLinkRedirectUrl?: string;
};

const useEmailSignin = (
  {
    email, setIsEmailLoading, setEmailError, setIsSignup, magicLinkRedirectUrl,
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
        email,
        redirect: magicLinkRedirectUrl ?? window?.location?.origin,
        version: LIB_VERSION,
      });
      cleanErrors();
      setIsEmailLoading(true);
    } catch (err: any) {
      setEmailError({
        hasError: false, message: err.message,
      });
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
    if (!process.env.REACT_APP_GAME_ID || Number(process.env.REACT_APP_GAME_ID) < 1) {
      setEmailError({
        hasError: true, message: 'REACT_APP_GAME_ID must be a value > 0',
      });
      return;
    }
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
    } catch (err: any) {
      if (err.message.startsWith('User already exists')) {
        setIsSignup(false);
        await loginWithMagicLink();
      }
      setEmailError({
        hasError: true, message: err.message,
      });
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
