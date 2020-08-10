import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';

import VaultContextProvider from '../context/VaultContext';
import Layout from '../Layout/Index';
import VaultPageHead from '../components/VaultsPage/VaultPageHead';

function Vault({ match }) {
  return (
    <VaultContextProvider>
      <Layout active={`vaults-${match.params.type}`} className="vaults">
        <VaultPageHead />
        <div className="controlls">
          <div className="drop-select mr-3">
            All Types
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </div>
          <div className="drop-select mr-3">
            All Vaults
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </div>
          <div className="drop-select mr-3">
            All Time
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </div>
          <div className="search ml-auto">
            <input type="text" name="serch" placeholder="Search Vaults" />
            <FontAwesomeIcon className="ml-2" icon={faSearch} />
          </div>
        </div>

        <Scrollbars
          autoHide
          className="vaults-list"
          renderView={(props) => <div {...props} className="vaultsView" />}
        >
          <div className="day">Today</div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="day">Yesterday</div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="day">July 20th 2020</div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
          <div className="vaults-itm">
            <img src="" alt="" />
            <div className="name-n-date mr-auto">
              <div className="name">Name Of Vault</div>
              <div className="date">July 20th 2020 at 9:03 AM EST</div>
            </div>
            <div className="credit">0.0000</div>
            <div className="debit">0.0000</div>
            <div className="balance">0.0000</div>
          </div>
        </Scrollbars>
      </Layout>
    </VaultContextProvider>
  );
}

export default Vault;
