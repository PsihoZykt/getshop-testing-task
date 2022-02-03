import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from '../../App.module.css';
import openingVideo from '../../assets/video/Volvo Trucks - The Epic Split feat. Van Damme.mp4';
import EntryBanner from './EntryBanner';

function VideoPage({ switchToPhonePage, videoRef, isVideoPageVisible }) {
  useEffect(() => {
    videoRef.current.play();
  });
  const onToggleVideo = () => {
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };
  return (
    <div style={{ display: isVideoPageVisible ? 'block' : 'none' }} className={s.videoWrapper}>
      <video muted ref={videoRef} onClick={onToggleVideo} className={s.openingVideo}>
        <source src={openingVideo} type="video/mp4" />
      </video>
      <EntryBanner switchToPhonePage={switchToPhonePage} />
    </div>
  );
}
VideoPage.propTypes = {
  switchToPhonePage: PropTypes.func.isRequired,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]).isRequired,
  isVideoPageVisible: PropTypes.bool.isRequired,

};
export default VideoPage;
