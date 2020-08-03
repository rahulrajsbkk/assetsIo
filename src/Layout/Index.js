import React from 'react';
import useWindowDimensions from '../utils/WindowSize';
import MobileLayout from './MobileLayout';
import Layout from './Layout';

function MainLayout({
  children,
  active,
  className,
  setTitle,
  setMenuSelected,
  menuSelected,
}) {
  const { width } = useWindowDimensions();
  return (
    <>
      {width > 768 ? (
        <Layout children={children} active={active} className={className} />
      ) : (
        <MobileLayout
          children={children}
          active={active}
          className={className}
          setTitle={setTitle}
          setMenuSelected={setMenuSelected}
          menuSelected={menuSelected}
        />
      )}
    </>
  );
}

export default MainLayout;
