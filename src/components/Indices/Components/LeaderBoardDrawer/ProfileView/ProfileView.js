import React, { useContext, useState } from 'react';
import ProfileCardMain from '../LeaderboardView/ProfileCardMain';
import Axios from 'axios';
import { OptionsContext } from '../../../ContextAPI/OptionContext';

function ProfileView({ follower }) {
  const { email } = useContext(OptionsContext);
  const [percentage, setPercentage] = useState(0);

  const follow = () => {
    Axios.post('https://gxtokenoptions.azurewebsites.net/api/SPFollows', {
      EmailId: email,
      Follows: follower.emailId,
      FollowPercentage: percentage,
      IsFollowing: true,
    })
      .then((res) => {
        console.log('res.data :', res.data);
        alert(JSON.stringify(res.data));
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  };
  return (
    <div className="leaderboard-view pt-5 mt-5">
      <ProfileCardMain data={follower} />
      <div className="d-flex mx-5 my-3">
        <input
          className="flex-grow-1"
          type="range"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          min={0}
          max={100}
        />
        <h6 className="my-auto ml-2 text-white">{percentage}%</h6>
      </div>
      <button className="footer-btn btn w-100 mt-auto p-3" onClick={follow}>
        Follow
      </button>
    </div>
  );
}

export default ProfileView;
