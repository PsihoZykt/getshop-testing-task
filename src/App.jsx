import React, { useRef, useState } from 'react';
import s from './App.module.css';
import VideoPage from './components/VideoPage';
import PhonePage from './components/PhonePage/PhonePageContainer';
import 'normalize.css';
import SliderPage from './components/SliderPage';

function App() {
  // Using visible for video-wrapper
  // because it's a "tv" version and should be used
  // inside other site ( I supposed this from examples )
  // So, I think use urls will be inappropriate
  const [isVideoPageVisible, setIsVideoPageVisible] = useState(true);
  const [isPhonePageVisible, setIsPhonePageVisible] = useState(false);
  const [isSliderPageVisible, setIsSliderPageVisible] = useState(false);

  // I can't handle video ( stop it ) inside videoComponent,
  // because I can't unmount this component ( Or videoRef sets to null, and I can't access it )
  // So, if I can't unmount component,
  // I can't pause video in componentWillUnmount inside VideoComponent
  // That's why I handle video inside App
  const videoRef = useRef(null);
  const switchToPhonePage = () => {
    videoRef.current.pause();
    setIsVideoPageVisible(false);
    setIsSliderPageVisible(false);
    setIsPhonePageVisible(true);
  };
  const switchToSliderPage = () => {
    setIsPhonePageVisible(false);
    setIsSliderPageVisible(true);
  };
  const backToVideoPage = () => {
    videoRef.current.play();
    setIsVideoPageVisible(true);
    setIsPhonePageVisible(false);
    setIsSliderPageVisible(false);
  };

  return (
    <div className={s.wrapper}>
      <VideoPage
        isVideoPageVisible={isVideoPageVisible}
        switchToPhonePage={switchToPhonePage}
        videoRef={videoRef}
      />

      {isPhonePageVisible && (
        <PhonePage
          videoRef={videoRef}
          isFinalPageVisible={isSliderPageVisible}
          backToVideoPage={backToVideoPage}
          switchToSliderPage={switchToSliderPage}
        />
      )}
      {isSliderPageVisible && <SliderPage backToVideoPage={backToVideoPage} />}

    </div>
  );
}

export default App;
