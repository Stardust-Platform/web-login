// libs
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { LIB_VERSION } from '../version';
// loginUrl
import { LoginUrl } from '../loginUrl';
// Interfaces
import { EmailError } from '../screens/Signin/types';
// eslint-disable-next-line import/no-cycle
import { Context, Types } from '../components/Provider/types';

// eslint-disable-next-line prefer-regex-literals
const emailRegex = new RegExp(
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

type UseEmailSigninProps = {
  email: string;
  setIsEmailLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailError: React.Dispatch<React.SetStateAction<EmailError>>;
  isSignup: boolean;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
  magicLinkRedirectUrl?: string;
};

const useEmailSignin = ({
  email,
  setIsEmailLoading,
  setEmailError,
  magicLinkRedirectUrl,
}: UseEmailSigninProps) => {
  const cleanErrors = () => {
    setEmailError({
      hasError: false,
      message: '',
    });
  };

  const loginWithMagicLink = async () => {
    setIsEmailLoading(true);
    try {
      await axios.post(LoginUrl.url, {
        email,
        redirect: magicLinkRedirectUrl ?? window?.location?.origin,
        version: LIB_VERSION,
        link: process.env.REACT_APP_LINK ? false : true,
      });
      cleanErrors();
    } catch (err: any) {
      if (err.response.status === 400) {
        setIsEmailLoading(false);
        setEmailError({
          hasError: false,
          message: err.message,
        });
      }
      throw err;
    }
  };

  const SignupWithEmail = async (gameId: string) => {
    const array = new Uint32Array(5);
    crypto.getRandomValues(array);
    try {
      await Auth.signUp({
        username: email,
        password: array.join('-'),
        attributes: {
          email,
          'custom:gameId': gameId, // required to be a string representation of a number in this api
        },
      });
      cleanErrors();
      setIsEmailLoading(true);
    } catch (err: any) {
      setEmailError({
        hasError: true,
        message: err.message,
      });
    }
  };

  const SigninSignupWithEmail = async (authContext: Context) => {
    const { dispatch, state } = authContext;
    if (email.length === 0 || !emailRegex.test(email)) {
      setEmailError({
        hasError: true,
        message: 'Enter a valid email.',
      });
      dispatch({ type: Types.handleSessionLoading, payload: false });
      return;
    }
    if (!state.gameId) {
      setEmailError({
        hasError: true,
        message: 'gameId must be a value > 0',
      });
      return;
    }
    if (typeof window === 'undefined') return;

    try {
      await loginWithMagicLink();
    } catch (err: any) {
      if (err.response.status === 403) {
        await SignupWithEmail(state.gameId);
        await loginWithMagicLink();
      }
    }
    dispatch({ type: Types.handleResendClicked, payload: false });
  };

  return {
    loginWithMagicLink,
    SigninSignupWithEmail,
    cleanErrors,
    emailRegex,
  };
};

export default useEmailSignin;
