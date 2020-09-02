import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { BankContext } from './Context';

export const IndexContext = createContext();

function IndexContextProvider({ children }) {
  const { conractsObj } = useContext(BankContext);

  // Coin Defenitions;
  const [defenitionsList, setDefenitionsList] = useState([]);
  useEffect(() => {
    Axios.get(
      'https://storeapi.apimachine.com/dynamic/Globalxchangetoken/icedefinations?key=4c69ba17-af5c-4a5c-a495-9a762aba1142'
    ).then((res) => {
      const { data } = res;
      if (data.success) {
        setDefenitionsList(data.data);
      }
    });
  }, []);
  return (
    <IndexContext.Provider value={{ conractsObj, defenitionsList }}>
      {children}
    </IndexContext.Provider>
  );
}

export default IndexContextProvider;
