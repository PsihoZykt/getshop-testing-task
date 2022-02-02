import React, {useRef, useState} from 'react';
import s from './App.module.css'
import VideoWrapper from "./components/VideoWrapper";
import PhonePage from "./components/PhonePage/PhonePageContainer";
import FinalPage from "./components/FinalPage";
import openingVideo from "./assets/video/Volvo Trucks - The Epic Split feat. Van Damme.mp4";

const App = () => {

    //Using visible for video-wrapper because it's a "tv" version and should be used inside other site ( I supposed this from examples )
    // So, I think use urls will be inappropriate
    const [isVideoWrapperVisible, setIsVideoWrapperVisible] = useState(true);
    const [isNumberWrapperVisible, setIsNumberWrapperVisible] = useState(false);
    const [isFinalPageVisible, setIsFinalPageVisible] = useState(false)
    let videoRef = useRef(null)

    let switchToNumberBanner = () => {
        videoRef.current.pause();
        setIsVideoWrapperVisible(false)
        setIsNumberWrapperVisible(true);
    }
    let switchToFinalPage = () => {
        setIsNumberWrapperVisible(false)
        setIsFinalPageVisible(true)
    }
    let backToVideoPage = () => {
        videoRef.current.play();
        setIsVideoWrapperVisible(true)
        setIsNumberWrapperVisible(false)
    }

    return (<div className={s.wrapper}>
       <VideoWrapper
            isVideoWrapperVisible={isVideoWrapperVisible}
            switchToNumberBanner={switchToNumberBanner}
            videoRef={videoRef}/>

        {isNumberWrapperVisible && <PhonePage videoRef={videoRef}
                                              backToVideoPage={backToVideoPage}
                                              switchToFinalPage={switchToFinalPage}/>}
        {isFinalPageVisible && <FinalPage/>}
    </div>);
};

export default App;

