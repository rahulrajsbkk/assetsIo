import React from 'react';
import CreateDefiTrust from './CreateDefiTrust';

function CreateDefiTrustWrapper({ setOpenDefiLogin }) {
  return (
    <div className="createDefiTrustWrapper">
      <div className="overlayTrust" onClick={() => setOpenDefiLogin(false)} />
      <CreateDefiTrust />
    </div>
  );
}

export default CreateDefiTrustWrapper;
