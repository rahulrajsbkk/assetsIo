import React from 'react';

function ProfileCard({ data, follow }) {
  const amountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return (
    <div
      className="card profile-card p-3 flex-row"
      onClick={() => follow(data)}
    >
      <img className="avatar" src={data.profilePicture} alt="" />
      <div className="d-flex flex-column my-auto mx-2">
        <h5>{data.userName}</h5>
        <h6>Funds Rank: 321</h6>
      </div>
      <div className="d-flex flex-column my-auto ml-auto mr-2 text-right">
        <h5>{data.subscribers}</h5>
        <h6>Subscribers</h6>
      </div>
      <div className="d-flex flex-column my-auto ml-2 mr-0 text-right">
        <h5>{amountFormatter.format(data.roi)}%</h5>
        <h6>Account ROI</h6>
      </div>
    </div>
  );
}

export default ProfileCard;
