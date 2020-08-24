import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import { VaultContext } from '../../context/VaultContext';

function VaultControlls() {
  const { loading } = useContext(VaultContext);
  return (
    <div className="controlls">
      <div className={'drop-select mr-3' + (loading ? ' p-0' : '')}>
        {loading ? (
          <Skeleton width={140} height={40} />
        ) : (
          <>
            All Types
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </>
        )}
      </div>
      <div className={'drop-select mr-3' + (loading ? ' p-0' : '')}>
        {loading ? (
          <Skeleton width={140} height={40} />
        ) : (
          <>
            All Vaults
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </>
        )}
      </div>
      <div className={'drop-select mr-3' + (loading ? ' p-0' : '')}>
        {loading ? (
          <Skeleton width={140} height={40} />
        ) : (
          <>
            All Time
            <FontAwesomeIcon className="ml-2" icon={faCaretDown} />
          </>
        )}
      </div>
      <div className={'search ml-auto' + (loading ? ' p-0' : '')}>
        {loading ? (
          <Skeleton width={200} height={40} />
        ) : (
          <>
            <input type="text" name="serch" placeholder="Search Vaults" />
            <FontAwesomeIcon className="ml-2" icon={faSearch} />
          </>
        )}
      </div>
    </div>
  );
}

export default VaultControlls;
