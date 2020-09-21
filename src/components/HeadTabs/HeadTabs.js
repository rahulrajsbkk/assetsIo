import React, { useContext, useState } from 'react';
import { NetWorthContext } from '../../context/ NetWorthContext';
import HeadTabItem from './HeadTabItem';
import iceLogo from '../../static/images/logo.svg';
import backDouble from '../../static/images/backDouble.svg';
import { BankContext } from '../../context/Context';
function HeadTabs() {
  const { tabData } = useContext(NetWorthContext);
  const { iceSidebarOpen, setIceSidebarOpen } = useContext(BankContext);
  return (
    <div className="headTabsWrapper">
      {Object.keys(tabData).map((key) => {
        return (
          <HeadTabItem key={key} index={key} selectedTabData={tabData.key} />
        );
      })}
      <div
        onClick={() => setIceSidebarOpen(!iceSidebarOpen)}
        className="tab-ice"
      >
        <img src={iceSidebarOpen ? backDouble : iceLogo} alt="" />
      </div>
    </div>
  );
}

export default HeadTabs;
