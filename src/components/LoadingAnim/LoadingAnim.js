import React from 'react';
import Lottie from 'react-lottie';

import * as animationData from '../../static/animations/cpu-loading.json';

function LoadingAnim() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="m-auto">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}

export default LoadingAnim;
