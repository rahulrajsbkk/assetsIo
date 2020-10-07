import React, { useState, useEffect } from 'react';
import funds from '../../../Static/image/funds.svg';
import close from '../../../Static/image/close.svg';
import back from '../../../Static/image/back.svg';
import ProfileCard from './ProfileCard';
import Axios from 'axios';

function FundProfilesView({
  setDrawerOpen,
  setProfile,
  setFollower,
  setProfileSetUp,
}) {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    Axios.get('https://gxtokenoptions.azurewebsites.net/api/SP').then((res) => {
      console.log('res.data :', res.data);
      setUserList(res.data);
    });
    return () => {};
  }, []);

  const follow = (data) => {
    setProfile(true);
    setFollower(data);
  };

  return (
    <div className="fund-profile-view h-100 d-flex flex-column h-100">
      <div className="p-4 title">
        <img src={funds} alt="" />
      </div>
      <div className="profile-list py-3 px-2">
        {userList.map((user) => {
          return <ProfileCard key={user.id} data={user} follow={follow} />;
        })}
      </div>
      <button className="footer-btn btn w-100 p-0 d-flex">
        <div className="btn" onClick={() => setDrawerOpen(false)}>
          <img src={close} alt="" />
        </div>
        <div className="btn" onClick={() => setDrawerOpen(false)}>
          <img src={back} alt="" />
        </div>
        <div className="p-3 mx-auto" onClick={() => setProfileSetUp(true)}>
          LAUNCH FUND
        </div>
      </button>
    </div>
  );
}

export default FundProfilesView;
