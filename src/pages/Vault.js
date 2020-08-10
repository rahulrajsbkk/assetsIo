import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';

import VaultContextProvider from '../context/VaultContext';
import Layout from '../Layout/Index';
import VaultPageHead from '../components/VaultsPage/VaultPageHead';
import VaultTransactionTable from '../components/VaultsPage/VaultTransactionTable';

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
        <VaultTransactionTable
          credit={!(match.params.type === 'deposit')}
          debit={!(match.params.type === 'withdraw')}
        />
      </Layout>
    </VaultContextProvider>
  );
}

export default Vault;
