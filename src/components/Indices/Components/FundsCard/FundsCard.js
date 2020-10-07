import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import { OptionsContext } from '../../ContextAPI/OptionContext';
import MyFundsTabView from './MyFundsTabView';
import LeaderBoardDrawer from '../LeaderBoardDrawer/LeaderBoardDrawer';

function FundsCard() {
  const [tab, setTab] = useState('my');
  const { email } = useContext(OptionsContext);
  const [signalProviders, setSignalProviders] = useState([]);
  const [mySignalProviders, setMySignalProviders] = useState([]);
  useEffect(() => {
    Axios.get('https://gxtokenoptions.azurewebsites.net/api/SP').then(
      (resOne) => {
        setSignalProviders(resOne.data);
        Axios.get(
          `https://gxtokenoptions.azurewebsites.net/api/SPFollows?email=${email}`
        ).then((res) => {
          console.log('res :', res);
          let emails = [];
          res.data.follows.forEach((follower) => {
            emails.push(follower.follows);
          });
          console.log('emails :', emails);
          const myFollowings = resOne.data.filter((data) =>
            emails.includes(data.emailId)
          );
          setMySignalProviders(myFollowings);
        });
      }
    );
  }, [email]);
  const [spList, setSpList] = useState([]);
  useEffect(() => {
    if (tab === 'all') {
      setSpList(signalProviders);
    } else {
      setSpList(mySignalProviders);
    }
  }, [tab, signalProviders, mySignalProviders]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [follwerDetail, setFollwerDetail] = useState({});
  return (
    <div className="card card-funds card-dark flex-grow-1 h-100">
      <div className="opt-tab d-flex">
        <div
          className={'tab-itm w-50 p-3 ' + (tab === 'all' ? 'active' : '')}
          onClick={() => setTab('all')}
        >
          All Funds
        </div>
        <div
          className={'tab-itm w-50 p-3 ' + (tab !== 'all' ? 'active' : '')}
          onClick={() => setTab('my')}
        >
          My Funds
        </div>
      </div>
      <MyFundsTabView
        setDrawerOpen={setDrawerOpen}
        setFollwerDetail={setFollwerDetail}
        spList={spList}
      />
      <h5
        className="text-center py-2 more"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <i className="tokenicon-all-funds" /> All Funds
      </h5>
      <LeaderBoardDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        follwerDetail={follwerDetail}
      />
    </div>
  );
}

export default FundsCard;
