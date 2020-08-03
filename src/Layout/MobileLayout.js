import React from 'react';
import MobileNavbar from './MobileNavbar';
import MobileFooter from './MobileFooter';
import useWindowDimensions from '../utils/WindowSize';

function MobileLayout({
  children,
  active,
  className,
  setTitle,
  setMenuSelected,
  menuSelected,
}) {
  const { height } = useWindowDimensions();
  return (
    <div className="mobile-layout" style={{ height }}>
      <MobileNavbar active={active} />
      <div className={`mobile-content  ${className}`}>{children}</div>
      <MobileFooter
        menuSelected={menuSelected}
        setTitle={setTitle}
        setMenuSelected={setMenuSelected}
      />
    </div>
  );
}

export default MobileLayout;
