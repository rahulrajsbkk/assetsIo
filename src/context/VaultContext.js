import React, { createContext, useState, useContext } from 'react';

export const VaultContext = createContext();

function VaultContextProvider({ children }) {
  return <VaultContext.Provider value={{}}>{children}</VaultContext.Provider>;
}

export default VaultContextProvider;
