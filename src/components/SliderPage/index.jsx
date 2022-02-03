import React, {useEffect, useState} from 'react';
import s from './index.module.css'
import slider1 from '../../assets/img/slider_1.png'
import slider2 from '../../assets/img/slider_2.png'
import slider3 from '../../assets/img/slider_3.png'
import leftButton from '../../assets/img/leftButton.svg'
import rightButton from '../../assets/img/rightButton.svg'
import exitButton from "../../assets/img/exitButton.svg";

const FinalPage = ({onExitButton}) => {


    const [sliderNumber, setSliderNumber] = useState(0);
    let sliderImgArr = [slider1, slider2, slider3]
    let goToPreviousSlide = () => {
        if (sliderNumber !== 0) {
            setSliderNumber((sliderNumber) => sliderNumber - 1)
        }
    }
    let goToNextSlide = () => {
        if (sliderNumber !== 2) {
            setSliderNumber((sliderNumber) => sliderNumber + 1)
        }
    }
    useEffect(() => {
        const handleArrows = (event) => {
            if (event.key === "ArrowLeft") {
                goToPreviousSlide()
            } else if (event.key === "ArrowRight") {
                goToNextSlide()
            }
        };
        window.addEventListener('keyup', handleArrows);

        return () => {
            window.removeEventListener('keyup', handleArrows);
        };
    }, [goToNextSlide, goToPreviousSlide]);
    let isLeftButtonIsActive = sliderNumber !== 0
    let isRightButtonIsActive = sliderNumber !== 2

    let leftButtonClasses = `${s.arrow} ${isLeftButtonIsActive ? s.active : ""}`

    let rightArrowClasses = `${s.arrow} ${isRightButtonIsActive ? s.active : ""}`

    console.log(sliderNumber, isLeftButtonIsActive, isRightButtonIsActive)
    return (<div className={s.sliderPage} style={{backgroundImage: `url(${sliderImgArr[sliderNumber]})`}}>
        <div className={s.arrowsWrapper}>
            <div onClick={goToPreviousSlide} className={leftButtonClasses}>
                <img src={leftButton} alt="Arrow leads to previous slide"/>
            </div>
            <div onClick={goToNextSlide} className={rightArrowClasses}>
                <img src={rightButton} alt="Arrow leads to next slide"/>
            </div>
        </div>
        <div onClick={onExitButton} className={s.exitButton}>
            <img src={exitButton}/>
        </div>
    </div>);
};

export default FinalPage;