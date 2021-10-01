// Libs
import { FC, memo } from 'react';
// Types
import { IconProps, IconsEnum } from './types';
// Svgs
import {
  DiscordSvg, FacebookSvg, GoogleSvg, AppleSvg,
} from './SocialIcon';
import CloseIconSvg from './CloseIcon';
import EmailIconSvg from './EmailIcon';
import SuccessIconSvg from './SuccessIcon';
import ErrorIconSvg from './ErrorIcon';

const Icon: FC<IconProps> = ({ icon }) => {
  switch (icon) {
    case IconsEnum.Google:
      return GoogleSvg;

    case IconsEnum.Facebook:
      return FacebookSvg;

    case IconsEnum.Apple:
      return AppleSvg;

    case IconsEnum.Discord:
      return DiscordSvg;

    case IconsEnum.Close:
      return CloseIconSvg;

    case IconsEnum.Email:
      return EmailIconSvg;

    case IconsEnum.Success:
      return SuccessIconSvg;

    case IconsEnum.Error:
      return ErrorIconSvg;

    default:
      return null;
  }
};

export default memo(Icon);
export type { IconProps };
export { IconsEnum };
