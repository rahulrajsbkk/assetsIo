import React from 'react';
import CentralizedTrust from './CentralizedTrust';
import DeCentralizedTrust from './DeCentralizedTrust';

function CreateDefiTrust() {
  return (
    <div className="createTrustModal">
      <CentralizedTrust />
      <DeCentralizedTrust />
    </div>
  );
}

export default CreateDefiTrust;
