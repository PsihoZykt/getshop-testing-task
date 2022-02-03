import React, {useRef, useState} from 'react';
import s from './App.module.css'
import VideoWrapper from "./components/VideoWrapper";
import PhonePage from "./components/PhonePage/PhonePageContainer";
import 'normalize.css'

const App = () => {

    //Using visible for video-wrapper because it's a "tv" version and should be used inside other site ( I supposed this from examples )
    // So, I think use urls will be inappropriate
    const [isVideoWrapperVisible, setIsVideoWrapperVisible] = useState(false);
    const [isNumberWrapperVisible, setIsNumberWrapperVisible] = useState(true);
    const [isFinalPageVisible, setIsFinalPageVisible] = useState(true)

    // I can't handle video ( stop it ) inside videoComponent, because I can't unmount this component ( Or videoRef sets to null, and I can't access it )
    // So, if I can't unmount component, I can't pause video in componentWillUnmount inside VideoComponent
    // That's why I handle video inside App
    let videoRef = useRef(null)
    let switchToNumberBanner = () => {
        videoRef.current.pause();
        setIsVideoWrapperVisible(false)
        setIsNumberWrapperVisible(true);
    }
    let switchToFinalPage = () => {
        // setIsNumberWrapperVisible(false)
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
                                              isFinalPageVisible={isFinalPageVisible}
                                              backToVideoPage={backToVideoPage}
                                              switchToFinalPage={switchToFinalPage}/>}

    </div>);
};

export default App;

