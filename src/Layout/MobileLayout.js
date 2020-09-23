import React from 'react';
import MobileNavbar from './MobileNavbar';
import MobileFooter from './MobileFooter';
import useWindowDimensions from '../utils/WindowSize';
import MobileFooterMain from './MobileFooterMain';

function MobileLayout({
  children,
  active,
  className,
  setMenuSelected,
  menuSelected,
  footerMain,
}) {
  const { height } = useWindowDimensions();
  return (
    <div className="mobile-layout" style={{ height }}>
      <MobileNavbar active={active} />
      <div className={`mobile-content  ${className}`}>{children}</div>
      {footerMain ? (
        <MobileFooterMain active={active} />
      ) : (
        <MobileFooter
          menuSelected={menuSelected}
          setMenuSelected={setMenuSelected}
        />
      )}
    </div>
  );
}

export default MobileLayout;
