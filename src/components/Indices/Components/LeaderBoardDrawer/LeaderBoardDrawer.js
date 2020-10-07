import React, { useState } from 'react';
import Drawer from 'antd/lib/drawer/index';
import SetupTraderProfileView from './SetupTraderProfileView/SetupTraderProfileView';
import FundProfilesView from './FundProfilesView/FundProfilesView';
import FundProfileDetail from './FundProfilesView/FundProfileDetail/FundProfileDetail';
import { useEffect } from 'react';

function LeaderBoardDrawer({ drawerOpen, setDrawerOpen, follwerDetail }) {
  const [profileSetUp, setProfileSetUp] = useState(false);
  const [profile, setProfile] = useState(false);
  const [follower, setFollower] = useState({});
  useEffect(() => {
    setProfileSetUp(false);
    setProfile(false);
    setFollower({});
  }, [drawerOpen]);
  useEffect(() => {
    if (follwerDetail) {
      setProfile(true);
      setFollower(follwerDetail);
    }
  }, [follwerDetail]);
  return (
    <Drawer
      className="leaderboard-drawer"
      placement="right"
      closable={false}
      onClose={() => setDrawerOpen(false)}
      visible={drawerOpen}
      width={500}
    >
      {profileSetUp ? (
        <SetupTraderProfileView
          setProfileSetUp={setProfileSetUp}
          setDrawerOpen={setDrawerOpen}
        />
      ) : profile ? (
        <FundProfileDetail
          setDrawerOpen={setDrawerOpen}
          setProfile={setProfile}
          follower={follower}
        />
      ) : (
        <FundProfilesView
          setDrawerOpen={setDrawerOpen}
          setFollower={setFollower}
          setProfileSetUp={setProfileSetUp}
          setProfile={setProfile}
        />
      )}
    </Drawer>
  );
}

export default LeaderBoardDrawer;
