import React, { FC } from 'react';

const SvgStardustLogo: FC = () => (
  <svg
    width={144}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path fill="url(#prefix__a)" d="M0 0h144v23.879H0z" />
    <defs>
      <pattern
        id="prefix__a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#prefix__b" transform="scale(.00503 .0303)" />
      </pattern>
      <image
        id="prefix__b"
        width={199}
        height={33}
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
);

export default SvgStardustLogo;
