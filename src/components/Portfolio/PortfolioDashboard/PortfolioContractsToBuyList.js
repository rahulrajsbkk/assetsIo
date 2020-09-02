import React, { useContext } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { BankContext } from '../../../context/Context';
import { FormatNumber, FormatCurrency } from '../../../utils/FunctionTools';
import { PortfolioContext } from '../../../context/PortfolioContext';

function PortfolioContractsToBuyList() {
  const { conractsObj, coinListObject } = useContext(BankContext);
  const { filterCurrency } = useContext(PortfolioContext);
  console.log('coinListObject.USDT', coinListObject.BTC);
  return (
    <Scrollbars
      autoHide
      className="bondsListScroll"
      renderThumbHorizontal={() => <div />}
      renderView={(props) => <div {...props} className="bondsList" />}
    >
      {Object.keys(conractsObj)
        .filter((key) => {
          if (coinListObject && coinListObject[key])
            switch (filterCurrency) {
              case 'CryptoCurrency':
                return coinListObject[key].type === 'crypto';
              case 'StableCoin':
                return (
                  coinListObject[key].type === 'crypto' &&
                  coinListObject[key].stable_coin
                );
              case 'Fiat Currencies':
                return coinListObject[key].type === 'fiat';
              default:
                return true;
            }
        })
        .map((key) => {
          const contract = conractsObj[key];
          return (
            <div className="bondsItem">
              <div className="coinPrice">
                <div className="img">
                  <img
                    src={
                      coinListObject &&
                      coinListObject[key] &&
                      coinListObject[key].coinImage
                    }
                    alt=""
                  />
                  {coinListObject &&
                    coinListObject[key] &&
                    coinListObject[key].coinName}
                </div>
                <div className="title">{`${FormatCurrency(
                  contract.amount,
                  contract.coin
                )} ${contract.coin}`}</div>
              </div>
              <div className="labels">
                <span>
                  Your Balance:{' '}
                  {`${FormatCurrency(
                    coinListObject &&
                      coinListObject[key] &&
                      coinListObject[key].coinValue,
                    contract.coin
                  )} ${contract.coin}`}
                </span>
                <span>Bond Price</span>
              </div>
              <div className="rates">
                <div className="ratesItem">
                  <div className="value">
                    {FormatNumber(contract.base_compression_rate, 1)}%
                  </div>
                  <div className="label">Base Rate</div>
                </div>
                <div className="ratesItem">
                  <div className="value">
                    {FormatNumber(contract.base_velocity, 1)}%
                  </div>
                  <div className="label">Velocity</div>
                </div>
                <div className="ratesItem">
                  <div className="value">
                    {FormatNumber(-contract.acceleration, 2)}
                  </div>
                  <div className="label">Acceleration</div>
                </div>
              </div>
            </div>
          );
        })}
    </Scrollbars>
  );
}

export default PortfolioContractsToBuyList;
