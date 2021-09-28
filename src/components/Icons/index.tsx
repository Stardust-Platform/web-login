// Libs
import { FC, memo } from 'react';
// Types
import { IconProps, IconsEnum } from './types';
// Svgs
import {
  DiscordSvg, FacebookSvg, GoogleSvg, TwitterSvg,
} from './SocialIcon';
import CloseIconSvg from './CloseIcon';

const Icon: FC<IconProps> = ({ icon }) => {
  switch (icon) {
    case IconsEnum.Google:
      return GoogleSvg;

    case IconsEnum.Facebook:
      return FacebookSvg;

    case IconsEnum.Twitter:
      return TwitterSvg;

    case IconsEnum.Discord:
      return DiscordSvg;

    case IconsEnum.Close:
      return CloseIconSvg;

    default:
      return null;
  }
};

export default memo(Icon);
export type { IconProps };
export { IconsEnum };
