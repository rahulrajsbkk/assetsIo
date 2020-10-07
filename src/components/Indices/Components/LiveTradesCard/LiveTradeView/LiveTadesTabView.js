import React, { useContext } from 'react';
import LiveTrdesItem from './LiveTrdesItem';
import { OptionsContext } from '../../../ContextAPI/OptionContext';
import { useEffect } from 'react';
import { useState } from 'react';

function LiveTadesTabView({ live, tab }) {
  const { username } = useContext(OptionsContext);
  const [copy, setCopy] = useState([]);
  const [liveList, setLiveList] = useState([]);
  useEffect(() => {
    console.log('live :>> ', live);
    setCopy(live.filter((live) => live.UserId !== username));
    setLiveList(live.filter((live) => live.UserId === username));
  }, [live, tab, username]);
  return (
    <div className="d-flex tabview-live-trades flex-grow-1 flex-column">
      <div className="d-flex my-1 trade-list-head px-4 text-center">
        <div className="col-3 px-1">Date</div>
        <div className="col-3 px-1">Trade</div>
        <div className="col-3 px-1">Strike Rate</div>
        <div className="col-3 px-1">Market Rate</div>
      </div>
      <div className="flex-grow-1 trade-list tab-view-scroll d-flex flex-column">
        {(tab === 'live' ? liveList : copy)
          .slice()
          .reverse()
          .map((trade, i) => {
            return <LiveTrdesItem key={trade.Id} data={trade} />;
          })}
      </div>
    </div>
  );
}

export default LiveTadesTabView;
