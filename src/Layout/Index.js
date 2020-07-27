import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useWindowDimensions from '../utils/WindowSize';
import { BankContext } from '../context/Context';
import MobileLayout from './MobileLayout';
import Layout from './Layout';

function MainLayout({ children, active, className }) {
  const { width } = useWindowDimensions();
  const { email } = useContext(BankContext);
  if (!email) return <Redirect to="/login" />;
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
