import React, { useState } from 'react';
import { useContext } from 'react';
import { OptionsContext } from '../../ContextAPI/OptionContext';

function MyFundsTabView({ spList, setFollwerDetail, setDrawerOpen }) {
  const { usdAmountFormatter } = useContext(OptionsContext);
  const [time, setTime] = useState('24hr');
  return (
    <div className="d-flex flex-grow-1 flex-column myfunds-tab-view">
      <div className="tab-btn d-flex justify-content-between px-4">
        <div
          className={'tab-btn-itm ' + (time === '24hr' ? 'active' : '')}
          onClick={() => setTime('24hr')}
        >
          24 Hours
        </div>
        <div className="border-left my-2" />
        <div
          className={'tab-btn-itm ' + (time === '30d' ? 'active' : '')}
          onClick={() => setTime('30d')}
        >
          30 Days
        </div>
        <div className="border-left my-2" />
        <div
          className={'tab-btn-itm ' + (time === 'all' ? 'active' : '')}
          onClick={() => setTime('all')}
        >
          All Time
        </div>
      </div>
      <div className="tab-view-scroll fund-list flex-grow-1">
        {spList.map((item) => {
          return (
            <div
              key={item.id}
              className="d-flex fund-list-item justify-content-between px-4"
              onClick={() => {
                setDrawerOpen(true);
                setFollwerDetail(item);
              }}
            >
              <div className="d-flex my-auto">
                <img
                  src={item.profilePicture}
                  alt=""
                  className="my-auto mx-2"
                />
                <h5 className="my-auto link">{item.userName}</h5>
              </div>
              <div className="d-flex my-auto">
                <h6
                  className={
                    'my-auto' +
                    (item.winPercentage && item.winPercentage < 0
                      ? ' text-danger'
                      : ' text-success')
                  }
                >
                  {usdAmountFormatter.format(item.winPercentage)}%{' '}
                  <span
                    className={
                      'fas mx-1 my-auto fa-arrow-' +
                      (item.winPercentage && item.winPercentage < 0
                        ? 'down'
                        : 'up')
                    }
                  ></span>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyFundsTabView;
