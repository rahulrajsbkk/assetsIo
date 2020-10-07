import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid/dist';
import Axios from 'axios';
import http from 'http';
import https from 'https';
import moment from 'moment-timezone';
import btc from '../Static/image/coins/btc.svg';
import { BankContext } from '../../../context/Context';

export const OptionsContext = createContext();

const OptionsContextProvider = (props) => {
  const { email, token } = useContext(BankContext);
  const [username, setUsername] = useState('Loading');
  const [requestType, setRequestType] = useState('Deposit');
  const [depositAsset, setdepositAsset] = useState(0);
  const [coin, setCoin] = useState('BTC');

  const [cryptoPrice, setCryptoPrice] = useState();
  useEffect(() => {
    Axios.get(`https://comms.globalxchange.com/coin/getCmcPrices`)
      .then((res) => {
        if (res.data.status === true) {
          setCryptoPrice(res.data);
        }
      })
      .catch((err) => {
        console.log('optErr', err);
      });
  }, []);
  const [name, setName] = useState('');
  useEffect(() => {
    if (email !== '' && email !== 'Loading')
      Axios.post('https://comms.globalxchange.com/get_affiliate_data_no_logs', {
        email: email,
      }).then((res) => {
        const data = res.data[0];
        if (data) {
          setUsername(data.username);
          setName(data.name);
        }
      });
  }, [email]);
  const [transCoin, setTransCoin] = useState('USD');

  const [transactions, setTxns] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isTrading, setIsTrading] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [balanceChange, setBalanceChange] = useState(false);
  useEffect(() => {
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const instance = Axios.create({
      httpAgent, // httpAgent: httpAgent -> for non es6 syntax
      httpsAgent,
    });
    // setTimeout(
    Axios.get(`https://gxtokenoptions.azurewebsites.net/api/SP?email=${email}`)
      .then((res) => {
        let obj = res.data;
        setTxns(obj.txns);
        setBalance(obj.balance);
        setProfilePic(
          obj.signalProviderDetails && obj.signalProviderDetails.profilePicture
            ? obj.signalProviderDetails.profilePicture
            : ''
        );
      })
      .catch((err) => {
        console.log('optErr', err);
      });
    //   2000
    // );
  }, [email, balanceChange, token]);
  useEffect(() => {
    setTimeout(setBalanceChange(!balanceChange), 0);
  }, [isTrading]);
  const balanceToggle = () => {
    setTimeout(setBalanceChange(!balanceChange), 3000);
  };

  const [amount, setAmount] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [countDown, setCountDown] = useState('00:00:00');
  const [endDate, setEndDate] = useState();

  const getUTCDateTime = () => {
    let endDateTime = moment.utc().add(seconds, 'second');
    setEndDate(endDateTime.valueOf());
    return endDateTime.format('YYYY-MM-DD HH:mm:ss');
  };

  const [tradeList, setTradeList] = useState([]);
  const [chartSymbol, setChartSymbol] = useState('BTCUSD');
  const [isLimit, setIsLimit] = useState(false);
  const [limitVal, setLimitVal] = useState(0);
  const [startDate, setStartDate] = useState();

  const startTrade = async (callOrPut) => {
    const time = getUTCDateTime();
    const gxId = uuidv4();
    setTradeList([
      {
        startDate: cryptoTimeRate.time,
        strikeRate: cryptoTimeRate.value,
        call: callOrPut,
        endDate: moment.utc().add(seconds, 'second').valueOf(),
        coin: coin,
        seconds: seconds,
        gxId: gxId,
      },
      ...tradeList,
    ]);
    setStartDate(cryptoTimeRate.time);
    setStrikeRate({ value: cryptoTimeRate.value, call: callOrPut });
    // const response = await Axios.get(
    //   "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
    // );
    setIsTrading(true);
    Axios.post('https://gxtokenoptions.azurewebsites.net/api/Trade/TradeData', {
      Time: time,
      Counter: amount, // / cryptoPrice[coin],
      RequestType: callOrPut ? 'Upper' : 'Lower',
      GxId: gxId,
      Email: email,
      UserId: username,
      Asset: coin,
      StrikeType: isLimit ? 'Limit' : 'Market',
      Market: '',
      Limit: isLimit ? limitVal : '',
    })
      .then((res) => {
        setTimeout(setBalanceChange(!balanceChange), (seconds + 2) * 1000);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };

  const [chartType, setChartType] = useState('area');

  const [tickerTime, setTickerTime] = useState('1s');

  const usdAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const btcAmountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  });

  const refreshBalance = () => {
    setBalanceChange(!balanceChange);
  };

  const [cryptoTimeRate, setCryptoTimeRate] = useState();
  const [strikeRate, setStrikeRate] = useState();

  const [searchOn, setSearchOn] = useState(false);

  const [coinDetail, setCoinDetail] = useState({
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: btc,
  });

  const [isExchange, setIsExchange] = useState(false);
  const [exchDetail, setExchDetail] = useState({});
  return (
    <OptionsContext.Provider
      value={{
        requestType,
        setRequestType,
        setdepositAsset,
        setCoin,
        coin,
        depositAsset,
        // Start Trade
        startTrade,
        setAmount,
        amount,
        seconds,
        setSeconds,
        balance,
        profilePic,
        // Chart Change
        chartSymbol,
        setChartSymbol,
        // Count Down
        isTrading,
        setIsTrading,
        countDown,
        setCountDown,
        // Limit Trade
        isLimit,
        setIsLimit,
        limitVal,
        setLimitVal,
        // Ticker
        tickerTime,
        setTickerTime,
        //
        endDate,
        startDate,
        strikeRate,
        // Chart Type
        chartType,
        setChartType,
        email,
        // usdAmountFormatter
        usdAmountFormatter,
        btcAmountFormatter,
        // Chart
        cryptoTimeRate,
        setCryptoTimeRate,
        // TradeList
        tradeList,
        balanceToggle,
        // transactions
        transactions,
        // Fullname Of USer
        name,
        // Coin To Withdraw Deposit
        transCoin,
        setTransCoin,
        username,
        token,
        refreshBalance,
        // Search Sidebar
        searchOn,
        setSearchOn,
        // Coin Detail Full
        coinDetail,
        setCoinDetail,
        // Exchange in terminal
        isExchange,
        setIsExchange,
        exchDetail,
        setExchDetail,
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  );
};
export default OptionsContextProvider;

export const TerminalConsumer = OptionsContext.Consumer;
