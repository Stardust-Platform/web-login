// Libs
import { FC } from 'react';
// Enums
import IconsEnum from './iconsEnum';
// Svgs
import {
  DiscordSvg, FacebookSvg, GoogleSvg, TwitterSvg,
} from './SocialIcons';

type IconProps = {
  icon: string;
};

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

    default:
      return null;
  }
};

export default Icon;
