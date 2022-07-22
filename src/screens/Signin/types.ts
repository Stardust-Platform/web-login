import { AnchorHTMLAttributes } from "react";

export type SigninProps = {
  closeModal?: () => void;
  authContext?: any;
  loginOptionsEnv?: string;
  setSnackBar?: (arg: {
    isOpen: boolean;
    hasError: boolean;
    message: string;
  }) => void;
  custom?: {
    logoUrl?: string;
    magicLinkRedirectUrl?: string;
    termsServiceUrl?: string;
    termsServiceProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
    privacyPolicyUrl?: string;
    privacyPolicyProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
    containerClassName?: string;
  };
};

export type EmailError = {
  hasError?: boolean;
  message?: string;
};

export type EmailContainerProps = {
  hasError?: Boolean;
};
