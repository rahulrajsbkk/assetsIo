import React, { useState, useContext } from 'react';
import message from 'antd/lib/message';
import Axios from 'axios';
import Progress from 'antd/lib/progress/index';
import funds from '../../../../Static/image/funds.svg';
import close from '../../../../Static/image/close.svg';
import back from '../../../../Static/image/back.svg';
import Follower from './Follower';
import ProfileChart from './ProfileChart';
import { OptionsContext } from '../../../../ContextAPI/OptionContext';
import Loader from '../../../Loader/Loader';
import { useEffect } from 'react';

function FundProfileDetail({ setDrawerOpen, setProfile, follower }) {
  const [chartHide, setChartHide] = useState(false);
  const { email, usdAmountFormatter } = useContext(OptionsContext);
  const [percentage, setPercentage] = useState('');

  const [progress, setProgress] = useState(0);

  const config = {
    onUploadProgress: function (progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (percentCompleted === 100) {
        percentCompleted = 99;
      }
      setProgress(percentCompleted);
    },
  };
  const [loading, setLoading] = useState(false);
  const follow = () => {
    setLoading(true);
    Axios.post(
      'https://gxtokenoptions.azurewebsites.net/api/SPFollows',
      {
        EmailId: email,
        Follows: follower.emailId,
        FollowPercentage: percentage,
        IsFollowing: true,
      },
      config
    )
      .then((res) => {
        console.log('res.data :', res.data);
        message.success(JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((err) => {
        message.error(JSON.stringify(err.message));
        setLoading(false);
      });
  };
  const [followingPercent, setFollowingPercent] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [txnCount, setTxnCount] = useState(0);
  const [winPercent, setWinPercent] = useState(0);
  useEffect(() => {
    // Axios.get(
    //   `https://gxtokenoptions.azurewebsites.net/api/SPFollows?email=${follower.emailId}`
    // ).then((res) => {
    //   const { data } = res;
    //   setFollowingPercent(data.totalFollowedByPercentage);
    //   setFollowers(data.followedBy);
    // });
    Axios.get(
      `https://gxtokenoptions.azurewebsites.net/api/SP?email=${follower.emailId}`
    ).then((res) => {
      const { data } = res;
      setTxnCount(data.totalTxns);
      setWinPercent(data.signalProviderDetails.winPercentage);
    });
    return () => {};
  }, []);

  useEffect(() => {
    Axios.get('https://gxtokenoptions.azurewebsites.net/api/SP').then(
      (resOne) => {
        Axios.get(
          `https://gxtokenoptions.azurewebsites.net/api/SPFollows?email=${follower.emailId}`
        ).then((res) => {
          console.log('res :', res);
          let emails = [];
          let percent = {};
          res.data.follows.forEach((followers) => {
            emails.push(followers.follows);
            percent[`${followers.follows}`] = followers.followPercentage;
          });
          console.log('emails :', emails);
          const myFollowings = resOne.data.filter((data) => {
            data[`follow`] = percent[`${data.emailId}`];
            return emails.includes(data.emailId);
          });
          console.log('myFollowings :>> ', myFollowings);
          setFollowers(myFollowings);
          // setMySignalProviders(myFollowings);
        });
      }
    );
  }, [follower.emailId]);

  return (
    <div className="fund-profile-view h-100 d-flex flex-column h-100">
      <div className="p-4 title">
        <img src={funds} alt="" />
      </div>
      {loading ? (
        <Loader percentage={progress} />
      ) : (
        <>
          <div className="profile-detail d-flex flex-column">
            <div
              className={
                'chart flex-column ' + (chartHide ? 'd-none' : 'd-flex')
              }
            >
              <h2 className="mt-5">$324,034.03</h2>
              <h6>Fund Valuation</h6>
              <ProfileChart />
            </div>
            <div
              className={
                'card-detail card justify-content-around' +
                (chartHide ? ' rounded-0' : '')
              }
              onClick={() => setChartHide(true)}
            >
              <div className="d-flex">
                <img className="avatar" src={follower.profilePicture} alt="" />
                <div className="d-flex flex-column my-auto mx-2">
                  <h3>{follower.userName}</h3>
                  <h4>Verified</h4>
                </div>
                <div className="d-flex flex-column my-auto ml-auto">
                  <h3 className="count">{followers.length}</h3>
                  <h4 className="vis">count</h4>
                </div>
              </div>
              <div className="d-flex flex-column my-3">
                <h5>About</h5>
                <p>{follower.bio}</p>
              </div>
              <div className="d-flex my-3">
                <div className="col-4 p-0 text-left">
                  <h5>{usdAmountFormatter.format(follower.roi)}%</h5>
                  <h6>Account ROI</h6>
                </div>
                <div className="col-4 p-0 text-center">
                  <h5>{txnCount}</h5>
                  <h6>Trades</h6>
                </div>
                <div className="col-4 p-0 text-right">
                  <h5>{usdAmountFormatter.format(winPercent)}%</h5>
                  <h6>Winning(%)</h6>
                </div>
              </div>
            </div>
            <div
              className={
                'fund-composition flex-column ' +
                (chartHide ? 'd-flex' : 'd-none')
              }
            >
              <h5>Current Fund Composition</h5>
              <div className="d-flex py-2">
                <div className="d-flex h-scrl">
                  {followers.map((follower) => {
                    return <Follower key={follower.emailId} data={follower} />;
                  })}
                </div>
              </div>
              <div className="position-relative progrss-circle my-auto">
                <Progress
                  type="circle"
                  percent={followingPercent}
                  width="200px"
                  strokeColor="#292934"
                  trailColor="#E4E4E6"
                  showInfo={false}
                />
                <div className="inner-circle d-flex flex-column">
                  <h2 className="mx-auto mt-auto alloc">{followingPercent}%</h2>
                  <h6 className="mx-auto mb-auto alloc">Allocated</h6>
                  <h2 className="mx-auto mt-auto avail">
                    {100 - followingPercent}%
                  </h2>
                  <h6 className="mx-auto mb-auto avail">Available</h6>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <button className="footer-btn btn w-100 p-0 d-flex">
        {loading ? (
          <div className="p-3 mx-auto">Processing</div>
        ) : (
          <>
            {chartHide ? (
              <>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => {
                    setPercentage(e.target.value);
                  }}
                  placeholder={'0.00%'}
                />
                {percentage === '' || percentage === 0 ? (
                  <div className="p-3 mx-auto">Set Balance Allocation</div>
                ) : (
                  <div className="p-3 mx-auto" onClick={follow}>
                    Subscribe
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="btn" onClick={() => setDrawerOpen(false)}>
                  <img src={close} alt="" />
                </div>
                <div className="btn" onClick={() => setProfile(false)}>
                  <img src={back} alt="" />
                </div>
                <div className="p-3 mx-auto" onClick={() => setChartHide(true)}>
                  Subscribe
                </div>
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
}

export default FundProfileDetail;
