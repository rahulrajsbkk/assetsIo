import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { BankContext } from './Context';

export const IndexContext = createContext();
const apiKey = '44ca622072609f7311624de1bed6204b9c80fed56ac5e4c6ab60e10b52b2';
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

  const [tokenList, setTokenList] = useState(['USDT']);
  const [coinSelect, setCoinSelect] = useState('USDT');
  const [platformRatesObject, setPlatformRatesObject] = useState({});
  useEffect(() => {
    Axios.get(
      `https://data-api.defipulse.com/api/v1/defipulse/api/GetLendingTokens?api-key=${apiKey}`
    ).then((res) => {
      const { data } = res;
      setTokenList(data);
    });
  }, []);
  useEffect(() => {
    Axios.get(
      `https://data-api.defipulse.com/api/v1/defipulse/api/GetRates?token=${coinSelect}&api-key=${apiKey}`
    ).then((res) => {
      const { data } = res;
      if (data.rates) {
        setPlatformRatesObject(data.rates);
      }
    });
  }, [coinSelect]);
  return (
    <IndexContext.Provider
      value={{
        conractsObj,
        defenitionsList,
        platformRatesObject,
        tokenList,
        coinSelect,
        setCoinSelect,
      }}
    >
      {children}
    </IndexContext.Provider>
  );
}

export default IndexContextProvider;
