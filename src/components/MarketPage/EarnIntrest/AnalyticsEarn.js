import React, { useState, useEffect, useContext } from 'react';
import ReactPlayer from 'react-player';
import { Scrollbars } from 'react-custom-scrollbars';
import { IndexContext } from '../../../context/IndexContext';
import Axios from 'axios';
import { IsValidURL } from '../../../utils/FunctionTools';

function AnalyticsEarn() {
  const [selected, setSelected] = useState({});
  const { defenitionsList } = useContext(IndexContext);

  useEffect(() => {
    setSelected(defenitionsList[0]);
  }, [defenitionsList]);

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    Axios.post(
      'https://vod-backend.globalxchange.io/get_user_profiled_video_stream_link',
      {
        video_id: selected && selected.formData && selected.formData.Video,
      }
    ).then((res) => {
      setVideoUrl(res.data);
    });
  }, [selected]);
  return (
    <div className="analyticsEarn">
      <Scrollbars
        autoHide
        className="menu"
        renderView={(props) => <div {...props} className="view" />}
      >
        {defenitionsList.map((def) => (
          <div
            key={def.Key}
            className={`menu-itm ${selected === def}`}
            onClick={() => {
              setSelected(def);
              setVideoUrl('');
            }}
          >
            {def.formData.Title}
          </div>
        ))}
      </Scrollbars>
      <div className="content">
        <div className="textContent">
          <h6>{selected && selected.formData && selected.formData.Subtitle}</h6>
          <div className="textDetail">
            {selected && selected.formData && selected.formData.Description}
          </div>
        </div>
        <div className="palyerWrapper">
          {videoUrl &&
          IsValidURL(videoUrl) &&
          selected &&
          selected.formData &&
          selected.formData.Videothumbnail ? (
            <ReactPlayer
              light={selected.formData.Videothumbnail}
              width="100%"
              height="100%"
              url={videoUrl}
              playing
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsEarn;
