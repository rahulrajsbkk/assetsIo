import React, { useContext } from 'react';
import { NetWorthContext } from '../../context/ NetWorthContext';
import HeadTabItem from './HeadTabItem';

function HeadTabs() {
  const { tabData } = useContext(NetWorthContext);
  return (
    <div className="headTabsWrapper">
      {Object.keys(tabData).map((key) => {
        return (
          <HeadTabItem key={key} index={key} selectedTabData={tabData.key} />
        );
      })}
    </div>
  );
}

export default HeadTabs;
