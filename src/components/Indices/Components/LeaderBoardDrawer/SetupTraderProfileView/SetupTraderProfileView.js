import React, { useState, useContext } from 'react';
import cloud from '../../../Static/image/cloud.svg';
import short from '../../../Static/image/down.svg';
import long from '../../../Static/image/up.svg';
import both from '../../../Static/image/both.svg';
import forex from '../../../Static/image/forex.svg';
import crypto from '../../../Static/image/crypto.svg';
import funds from '../../../Static/image/funds.svg';
import close from '../../../Static/image/close.svg';
import back from '../../../Static/image/back.svg';
import Axios from 'axios';
import { OptionsContext } from '../../../ContextAPI/OptionContext';
import image2base64 from 'image-to-base64';
import Loader from '../../Loader/Loader';
import message from 'antd/lib/message';

function SetupTraderProfileView({ setProfileSetUp, setDrawerOpen }) {
  const { email } = useContext(OptionsContext);
  const [uName, setUName] = useState('');
  const [dir, setDir] = useState('');
  const [asset, setAsset] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [upldPrgrs, setUpldPrgrs] = useState(0);

  const uploadConfig = {
    onUploadProgress: function (progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUpldPrgrs(percentCompleted);
    },
  };
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

  const uploadData = () => {
    image2base64(image.preview)
      .then((response) => {
        setLoading(true);
        Axios.post(
          'https://gxtokenoptions.azurewebsites.net/api/UploadFiles',
          {
            EmailId: email,
            FileName: 'avatar.jpg',
            UserId: uName,
            File: response,
          },
          uploadConfig
        )
          .then((uploadRes) => {
            if (uploadRes.data.fileUrl) {
              Axios.post(
                'https://gxtokenoptions.azurewebsites.net/api/SP',
                {
                  EmailId: email,
                  UserName: uName,
                  AssetTradeType: asset,
                  TradeDirection: dir,
                  Bio: bio,
                  ProfilePicture: uploadRes.data.fileUrl,
                  IsSignalProvider: true,
                },
                config
              )
                .then((res) => {
                  setProfileSetUp(false);
                  message.success('Created Profile');
                  setLoading(false);
                })
                .catch((err) => {
                  message.error(err.message);
                  setLoading(false);
                });
            } else {
              message.error('Image Upload Failed');
            }
          })
          .catch((err) => {
            message.error(err.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
        setLoading(false);
      });
  };

  const [image, setImage] = useState({ preview: '', raw: '' });
  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  return (
    <div className="setup-trade-profile-view h-100 d-flex flex-column">
      <div className="p-4 title">
        <img src={funds} alt="" />
      </div>
      {loading ? (
        <Loader percentage={(progress + upldPrgrs) / 2} />
      ) : (
        <div className="setup-trade-form flex-grow-1 d-flex flex-column justify-content-around">
          <div className="group">
            <h6 className="label-title">Create Trader ID</h6>
            <div className="d-flex">
              <div className="border-wrapper cloud">
                <label htmlFor="upload-button" className="m-0">
                  <img
                    src={image.preview ? image.preview : cloud}
                    alt=""
                    className={'cloud' + (image.preview ? ' p-0' : '')}
                  />
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: 'none' }}
                  onChange={handleChange}
                  accept="image/*"
                />
              </div>
              <div className="border-wrapper uname">
                <input
                  className="uname"
                  type="text"
                  placeholder="Trader Username"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="group">
            <h6 className="label-title">What assets do you trade?</h6>
            <div className="d-flex">
              <div
                className={
                  'border-wrapper select d-flex' +
                  (asset === 'crypto' ? ' active' : '')
                }
                onClick={() => setAsset('crypto')}
              >
                <h6>CRYPTO </h6>
                <img src={crypto} alt="" />
              </div>
              <div
                className={
                  'border-wrapper select d-flex mx-2' +
                  (asset === 'forex' ? ' active' : '')
                }
                onClick={() => setAsset('forex')}
              >
                <h6>FOREX </h6>
                <img src={forex} alt="" />
              </div>
              <div
                className={
                  'border-wrapper select d-flex' +
                  (asset === 'both' ? ' active' : '')
                }
                onClick={() => setAsset('both')}
              >
                <h6>BOTH </h6>
                <img src={both} alt="" />
              </div>
            </div>
          </div>
          <div className="group">
            <h6 className="label-title">What Direction Do you trade?</h6>
            <div className="d-flex">
              <div
                className={
                  'border-wrapper select d-flex' +
                  (dir === 'short' ? ' active' : '')
                }
                onClick={() => setDir('short')}
              >
                <h6>SHORT </h6>
                <img src={short} alt="" />
              </div>
              <div
                className={
                  'border-wrapper select d-flex mx-2' +
                  (dir === 'long' ? ' active' : '')
                }
                onClick={() => setDir('long')}
              >
                <h6>LONG </h6>
                <img src={long} alt="" />
              </div>
              <div
                className={
                  'border-wrapper select d-flex' +
                  (dir === 'both' ? ' active' : '')
                }
                onClick={() => setDir('both')}
              >
                <h6>BOTH </h6>
                <img src={both} alt="" />
              </div>
            </div>
          </div>
          <div className="group">
            <h6 className="label-title">What Describes You</h6>
            <div className="border-wrapper bio d-flex">
              <textarea
                rows="6"
                placeholder="Enter Your Bio Here"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
      <button
        disabled={bio === '' || asset === '' || dir === '' || uName === ''}
        className="footer-btn btn w-100 p-0 d-flex"
      >
        <div className="btn" onClick={() => setDrawerOpen(false)}>
          <img src={close} alt="" />
        </div>
        <div className="btn" onClick={() => setProfileSetUp(false)}>
          <img src={back} alt="" />
        </div>
        <div className="p-3 mx-auto" onClick={uploadData}>
          {loading ? (
            <>
              Loading{'  '}
              {(progress + upldPrgrs) / 2}
              <i className="fas fa-spinner fa-pulse" />
            </>
          ) : (
            'Next Step'
          )}
        </div>
      </button>
    </div>
  );
}

export default SetupTraderProfileView;
