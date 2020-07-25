import React from 'react';
import EarnIntrestTable from './EarnIntrestTable';
import EarnIntrestControll from './EarnIntrestControll';

function EarnIntrest({ title }) {
  return (
    <div className="earn-intrest">
      <EarnIntrestControll title={title} />
      <EarnIntrestTable />
    </div>
  );
}

export default EarnIntrest;
