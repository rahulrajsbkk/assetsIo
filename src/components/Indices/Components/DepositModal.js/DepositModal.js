import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import SelectCoin from "./SelectCoin/SelectCoin";
import SetAmount from "./SetAmount/SetAmount";
import { OptionsContext } from "../../ContextAPI/OptionContext";
import Axios from "axios";
import Zoom from "react-reveal/Zoom";

function DepositModal({ modalOpen, setModalOpen }) {
  const { transCoin, setTransCoin, setRequestType, email } = useContext(
    OptionsContext
  );
  const [coinObject, setCoinObject] = useState({
    sym: "$",
    symbol: "USD",
    price: 1,
  });
  const [isCoinSelected, setIsCoinSelected] = useState(false);
  useEffect(() => {
    setTransCoin("");
    setRequestType("Deposit");
  }, [modalOpen]);

  const [price, setPrice] = useState({
    USD: 0,
    BTC: 0,
    ETH: 0,
    USDT: 0,
  });

  useEffect(() => {
    Axios.get(
      `https://comms.globalxchange.com/coin/vault/coins_data?email=${email}`
    ).then((res) => {
      if (res.data.status) {
        const coin = res.data.coins;
        let priceObj = {};
        coin.forEach((value, index, array) => {
          priceObj[value.coinSymbol] = {
            value: value.coinValueUSD,
            sym: value.symbol,
            symbol: value.coinSymbol,
            price: value.price[0].price,
          };
        });
        setPrice(priceObj);
      }
    });
  }, [email]);

  return (
    <Modal
      className="modal-deposit my-auto"
      show={modalOpen}
      animation={false}
      onHide={() => {
        setModalOpen(false);
      }}
    >
      <Zoom>
        <div className="card deposit-card">
          <h2 className="title py-3">Deposit</h2>
          {transCoin === "" || !isCoinSelected ? (
            <SelectCoin
              setCoinObject={setCoinObject}
              setIsCoinSelected={setIsCoinSelected}
              price={price}
            />
          ) : (
            <SetAmount
              coinObject={coinObject}
              setCoinObject={setCoinObject}
              setModalOpen={setModalOpen}
              price={price}
            />
          )}
        </div>
      </Zoom>
    </Modal>
  );
}

export default DepositModal;
