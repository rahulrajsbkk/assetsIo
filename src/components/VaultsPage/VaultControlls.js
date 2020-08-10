import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';

function VaultControlls() {
  return (
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
  );
}

export default VaultControlls;
