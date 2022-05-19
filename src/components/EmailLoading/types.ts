export type EmailLoadingProps = {
  email: string;
  resendEmail: () => void;
  isResendClicked: boolean;
  setIsEmailLoading: (arg: boolean) => void
  finishSignInWithCode: (arg: string) => void;
  error: {hasError?: boolean, message?: string}
  setEmailError: ({hasError, message}: {hasError: boolean, message: string}) => void;
};
