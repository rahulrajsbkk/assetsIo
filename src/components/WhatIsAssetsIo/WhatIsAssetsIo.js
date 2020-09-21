import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import WhatIsAssetsIoHome from './WhatIsAssetsIoHome';
import WhatIsAssetsIoPlayList from './WhatIsAssetsIoPlayList';

function WhatIsAssetsIo({ setWhatIsAssetIo }) {
  const [open, setOpen] = useState(false);
  return (
    <Fade up>
      <div className="whatIsAssetsIo">
        {open ? (
          <WhatIsAssetsIoPlayList setOpen={setOpen} />
        ) : (
          <WhatIsAssetsIoHome setOpen={setOpen} />
        )}
        <svg
          onClick={() => setWhatIsAssetIo(false)}
          className="closeWhatIsAsset"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1756 12L23.549 2.62658C24.1502 2.0255 24.1504 1.05223 23.549 0.451009C22.9479 -0.150258 21.9747 -0.150399 21.3734 0.450962L12 9.8244L2.62658 0.451009C2.0255 -0.150211 1.05219 -0.150399 0.450968 0.450915C-0.150299 1.05214 -0.150346 2.02526 0.450968 2.62653L9.8243 12L0.450921 21.3734C-0.14894 21.9733 -0.14894 22.9492 0.450921 23.549C1.05209 24.1503 2.02531 24.1504 2.62653 23.549L11.9999 14.1755L21.3733 23.5489C21.9744 24.1502 22.9477 24.1502 23.5489 23.549C24.1501 22.9478 24.1503 21.9746 23.5489 21.3733L14.1756 12Z"
            fill="#464B4E"
          />
        </svg>
      </div>
    </Fade>
  );
}

export default WhatIsAssetsIo;
