import React from 'react';

function Follower({ data }) {
  return (
    <div className="follower card d-flex flex-row my-1">
      <img className="avatar my-auto" src={data.profilePicture} alt="" />
      <div className="d-flex flex-column my-auto mx-2">
        <h5>{data.userName}</h5>
        {/* <h6>$523.93</h6> */}
      </div>
      <div className="d-flex flex-column my-auto ml-auto">
        <h5>{data.follow}%</h5>
      </div>
    </div>
  );
}

export default Follower;
