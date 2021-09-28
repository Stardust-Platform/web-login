export type SigninProps = {
  closeModal?: () => void;
  custom?: {
    logoUrl?: string;
    termsServiceUrl?: string,
    privacyPolicyUrl?: string;
    containerClassName?: string;
  };
};
