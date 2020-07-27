import React from 'react';
import MobileNavbar from './MobileNavbar';
import MobileFooter from './MobileFooter';

function MobileLayout({ children, active, className }) {
  console.log('active :>> ', active, className);
  return (
    <div className="mobile-layout">
      <MobileNavbar active={active} />
      <div className={`mobile-content  ${className}`}>{children}</div>
      <MobileFooter />
    </div>
  );
}

export default MobileLayout;
