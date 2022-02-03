import s from "../../App.module.css";
import openingVideo from "../../assets/video/Volvo Trucks - The Epic Split feat. Van Damme.mp4";
import BannerEntry from "./bannerEntry";
import React, {useEffect} from "react";

const VideoWrapper = ({switchToNumberBanner: switchToPhonePage, videoRef, isVideoWrapperVisible: isVideoPageVisible}) => {
    useEffect(() => {
        videoRef.current.play();
    })
    let onToggleVideo = () => {
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }
    return (
        <div style={{display: isVideoPageVisible ? "block" : "none"}} className={s.videoWrapper}>
            <video muted ref={videoRef} onClick={onToggleVideo} className={s.openingVideo}>
                <source src={openingVideo} type="video/mp4"/>
            </video>
            <BannerEntry switchToNumberBanner={switchToPhonePage}/>
        </div>
    );
};

export default VideoWrapper;