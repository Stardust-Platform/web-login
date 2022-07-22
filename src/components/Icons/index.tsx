// Libs
import { FC, memo } from "react";
// Types
import { IconProps, IconsEnum } from "./types";
// Svgs
import { DiscordSvg, FacebookSvg, GoogleSvg, AppleSvg } from "./SocialIcon";
import CloseIconSvg from "./CloseIcon";
import EmailIconSvg from "./EmailIcon";
import SuccessIconSvg from "./SuccessIcon";
import ErrorIconSvg from "./ErrorIcon";
import BackArrowIcon from "./BackArrowIcon";

// eslint-disable-next-line func-names
const Icon: FC<IconProps> = function ({ icon }) {
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

    case IconsEnum.BackArrow:
      return BackArrowIcon;

    default:
      return null;
  }
};

export default memo(Icon);
export type { IconProps };
export { IconsEnum };
