import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Scrollbars from 'react-custom-scrollbars';
import Lottie from 'react-lottie';
import AssetItem from './AssetItem';
import { FormatCurrency } from '../../../../../utils/FunctionTools';
import * as animationData from '../../../../../static/animations/cpu-loading.json';

function SelectCoinDirection({
  isDeposit,
  appFrom,
  setCoinObject,
  price,
  transCoin,
  setTransCoin,
  priceList,
  loading,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
  };

  const [searchStr, setSearchStr] = useState('');

  const [searchList, setSearchList] = useState(priceList);

  const [totalVaultUsd, setTotalVaultUsd] = useState(0);
  useEffect(() => {
    let total = 0;
    priceList.forEach((price) => {
      total += price.coinValueUSD;
    });
    setTotalVaultUsd(total);
  }, [priceList]);

  useEffect(() => {
    setSearchList(
      priceList.filter(
        (listItm) =>
          listItm.coinName.toLowerCase().includes(searchStr.toLowerCase()) ||
          listItm.coinSymbol.toLowerCase().includes(searchStr.toLowerCase())
      )
    );
  }, [searchStr, priceList]);

  return (
    <div className="select-vault coin">
      <div className="head">
        Which {appFrom.app_name} Vault Do You Want{' '}
        {isDeposit ? 'To Withdraw From' : 'Deposit To'}?
      </div>
      <div className="content">
        <div className="selectAppHead">
          <div className="titleAppSelect">
            {appFrom.app_name}
            <div className="subText">Vault Balances</div>
          </div>
          <label className="searcWraper">
            <input
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              type="search"
              placeholder="What Vault Are You Looking For? "
            />
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </div>
        {loading ? (
          <div className="m-auto">
            <Lottie options={defaultOptions} height={150} width={150} />
          </div>
        ) : (
          <Scrollbars
            className="coinListWrap"
            renderView={(props) => <div {...props} className="coinList" />}
            renderThumbHorizontal={() => <div />}
            renderThumbVertical={() => <div />}
          >
            {searchList
              .filter((item) => item.coinValueUSD > 0 || !isDeposit)
              .map((item) => {
                return (
                  <AssetItem
                    key={item.coinSymbol}
                    img={item.coinImage}
                    name={item.coinName}
                    crypto={item.crypto}
                    price={item.coinValueUSD}
                    coinObject={price[item.coinSymbol]}
                    symbol={item.coinSymbol}
                    setCoinObject={setCoinObject}
                    transCoin={transCoin}
                    setTransCoin={setTransCoin}
                    isDeposit={isDeposit}
                  />
                );
              })}
          </Scrollbars>
        )}{' '}
      </div>
      <div className="footer" onClick={() => {}}>
        <span className="label">Total Balance</span>
        <span className="value">
          ${FormatCurrency(totalVaultUsd, 'USD')}
          <small>USD</small>
        </span>
      </div>
    </div>
  );
}

export default SelectCoinDirection;
