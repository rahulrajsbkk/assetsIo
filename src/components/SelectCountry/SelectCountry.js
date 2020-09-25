import React, { useState, useContext, useEffect } from 'react';
import { BankContext } from '../../context/Context';
import Scrollbars from 'react-custom-scrollbars';
import Axios from 'axios';

function SelectCountry({}) {
  const { email, token, tostShowOn } = useContext(BankContext);
  const [openModal, setOpenModal] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [searchStr, setSearchStr] = useState('');
  useEffect(() => {
    if (email && token)
      Axios.get(
        `https://comms.globalxchange.com/coin/iced/get/country/data?email=${email}`
      ).then((res) => {
        const { data } = res;
        if (data.status) {
          if (!data.user[0].countryData) {
            setOpenModal(true);
          }
        }
      });
  }, [email]);
  useEffect(() => {
    if (openModal)
      Axios.get(
        'https://storeapi.apimachine.com/dynamic/InstaCryptoPurchase/Countrydem?key=b6459026-2535-434e-bc4c-893fae5fc87d'
      ).then((res) => {
        const { data } = res;
        if (data.success) {
          setCountryList(data.data);
        }
      });
  }, [openModal]);
  const setCountry = (country) => {
    Axios.post(
      'https://comms.globalxchange.com/coin/iced/update/country/data',
      {
        token: token, // user auth token
        email: email, // user email
        country: country, // country name
      }
    ).then((res) => {
      const { data } = res;
      if (data.status) {
        setOpenModal(false);
      }
      tostShowOn(data.message);
    });
  };
  return (
    <>
      {openModal && email && token ? (
        <div className="modalCountrySelect">
          <div className="overlayClose" />
          <div className="modalContent">
            <div className="head">Select Your Country</div>
            <input
              value={searchStr}
              type="text"
              placeholder="Search Country"
              className="searchCountry"
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <Scrollbars
              className="countryListScroll"
              renderThumbHorizontal={() => <div />}
              renderThumbVertical={() => <div />}
              renderView={(props) => <div {...props} className="countryList" />}
            >
              {countryList
                .filter(
                  (countryData) =>
                    countryData.formData &&
                    countryData.formData.Name.includes(searchStr)
                )
                .map((countryData) => (
                  <div
                    key={countryData.Key}
                    className="listCountry"
                    onClick={() =>
                      setCountry(
                        countryData.formData && countryData.formData.Name
                      )
                    }
                  >
                    <div className="name">
                      {countryData.formData && countryData.formData.Name}
                    </div>
                    <img
                      src={countryData.formData && countryData.formData.Flag}
                      alt=""
                      className="flag"
                    />
                  </div>
                ))}
            </Scrollbars>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default SelectCountry;
