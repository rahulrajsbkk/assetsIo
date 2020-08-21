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
  return (
    <IndexContext.Provider value={{ conractsObj }}>
      {children}
    </IndexContext.Provider>
  );
}

export default IndexContextProvider;
