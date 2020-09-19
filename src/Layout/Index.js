import React from 'react';
import useWindowDimensions from '../utils/WindowSize';
import MobileLayout from './MobileLayout';
import Layout from './Layout';

function MainLayout({
  children,
  active,
  className,
  setMenuSelected,
  menuSelected,
  hideFooter,
}) {
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 768 ? (
        <Layout
          children={children}
          active={active}
          className={className}
          hideFooter={hideFooter}
        />
      ) : (
        <MobileLayout
          children={children}
          active={active}
          className={className}
          setMenuSelected={setMenuSelected}
          menuSelected={menuSelected}
        />
      )}
    </>
  );
}

export default MainLayout;
