import React from 'react';
// import EarnIntrestTable from './EarnIntrestTable';
import EarnIntrestControll from './EarnIntrestControll';
import AssetPlatformTable from './AssetPlatformTable';

function EarnIntrest({ title }) {
  return (
    <div className="earn-intrest">
      <EarnIntrestControll title={title} />
      <AssetPlatformTable />
      <div className="areaBelowTable"></div>
      {/* <EarnIntrestTable /> */}
    </div>
  );
}

export default EarnIntrest;
