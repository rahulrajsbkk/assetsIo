import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Scrollbars from 'react-custom-scrollbars';
import logoWtBg from '../../../../../static/images/logoWtBg.svg';
import { NetWorthContext } from '../../../../../context/ NetWorthContext';

function SelectVault({ isDeposit, setAppFrom, setSelectVault }) {
  const { userApps } = useContext(NetWorthContext);
  return (
    <div className="select-vault">
      <div className="head">
        {isDeposit
          ? 'Which App Do You Want To Withdraw From ? '
          : 'Which App Do You Want To Send To ? '}
      </div>
      <div className="content">
        <div className="selectAppHead">
          <div className="titleAppSelect">Select The App</div>
          <label className="searcWraper">
            <input type="search" placeholder="Search Your Registered Apps" />
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </div>
        <Scrollbars
          className="scrollWrap"
          renderView={(props) => <div {...props} className="gridApps" />}
          renderThumbHorizontal={() => <div />}
          renderThumbVertical={() => <div />}
        >
          {userApps &&
            userApps.map((app) => (
              <div
                className="appGrid"
                key={app.app_code}
                onClick={() => {
                  setAppFrom(app);
                  setSelectVault(false);
                }}
              >
                <img src={app.app_icon || logoWtBg} alt="" />
              </div>
            ))}
        </Scrollbars>
      </div>
      <div
        className="footer"
        onClick={() => {
          setAppFrom({
            app_code: 'gx',
            profile_id: '',
            app_name: '',
            app_icon: '',
          });
          setSelectVault(false);
        }}
      >
        Are You A Legacy GX User With A Nitrous Vault?{' '}
        <span className="btnClickHere">Click Here</span>
      </div>
    </div>
  );
}

export default SelectVault;

// app_code: 'ice';
// app_icon: 'https://chatsgx.s3-us-east-2.amazonaws.com/shorupan@gmail.com/1600250614453.png';
// app_name: 'Assets.io';
// profile_id: 'iceu1f42cc0279214t1595785867080';
