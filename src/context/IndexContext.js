import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const IndexContext = createContext();

function IndexContextProvider({ children }) {
  const [conractsObj, setConractsObj] = useState({});
  useEffect(() => {
    Axios.get('https://comms.globalxchange.com/coin/iced/admin/get/data').then(
      (res) => {
        const { data } = res;
        if (data.status) {
          const obj = {};
          data.config_data.forEach((config) => {
            obj[config.coin] = { ...obj[config.coin], ...config };
          });
          setConractsObj(obj);
        }
      }
    );
  }, []);

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
