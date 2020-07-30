import React from 'react';
import useWindowDimensions from '../utils/WindowSize';
import MobileLayout from './MobileLayout';
import Layout from './Layout';

function MainLayout({ children, active, className }) {
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
        />
      )}
    </>
  );
}

export default MainLayout;
