import { AnchorHTMLAttributes } from 'react';

export type SigninProps = {
  closeModal?: () => void;
  custom?: {
    logoUrl?: string;
    termsServiceUrl?: string,
    termsServiceProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
    privacyPolicyUrl?: string;
    privacyPolicyProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
    containerClassName?: string;
  };
};

export type EmailError = {
  hasError?: boolean,
  message?: string,
};

export type EmailContainerProps = {
  hasError?: Boolean,
};
