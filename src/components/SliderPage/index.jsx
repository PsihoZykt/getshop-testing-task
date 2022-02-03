import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './index.module.css';
import slider1 from '../../assets/img/slide_1.png';
import slider2 from '../../assets/img/slide_2.png';
import slider3 from '../../assets/img/slide_3.png';
import leftButton from '../../assets/img/leftButton.svg';
import rightButton from '../../assets/img/rightButton.svg';
import exitButton from '../../assets/img/exitButton.svg';

function SliderPage({ backToVideoPage }) {
  const [sliderNumber, setSliderNumber] = useState(0);
  const sliderImgArr = [slider1, slider2, slider3];
  const goToPreviousSlide = () => {
    if (sliderNumber !== 0) {
      setSliderNumber((number) => number - 1);
    }
  };
  const goToNextSlide = () => {
    if (sliderNumber !== 2) {
      setSliderNumber((number) => number + 1);
    }
  };
  useEffect(() => {
    const handleArrows = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPreviousSlide();
      } else if (event.key === 'ArrowRight') {
        goToNextSlide();
      }
    };
    window.addEventListener('keyup', handleArrows);

    return () => {
      window.removeEventListener('keyup', handleArrows);
    };
  });
  const isLeftButtonIsActive = sliderNumber !== 0;
  const isRightButtonIsActive = sliderNumber !== 2;

  const leftButtonClasses = `${s.arrow} ${isLeftButtonIsActive ? s.active : ''}`;

  const rightArrowClasses = `${s.arrow} ${isRightButtonIsActive ? s.active : ''}`;

  return (
    <div className={s.sliderPage} style={{ backgroundImage: `url(${sliderImgArr[sliderNumber]})` }}>
      <div className={s.arrowsWrapper}>
        <div role="button" onKeyPress={goToPreviousSlide} tabIndex={0} onClick={goToPreviousSlide} className={leftButtonClasses}>
          <img loading="eager" src={leftButton} alt="Arrow leads to previous slide" />
        </div>
        <div role="button" onKeyPress={goToNextSlide} tabIndex={0} onClick={goToNextSlide} className={rightArrowClasses}>
          <img loading="eager" src={rightButton} alt="Arrow leads to next slide" />
        </div>
      </div>
      <div role="button" onKeyPress={backToVideoPage} tabIndex={0} onClick={backToVideoPage} className={s.exitButton}>
        <img loading="eager" src={exitButton} alt="X symbol" />
      </div>
    </div>
  );
}
SliderPage.propTypes = {
  backToVideoPage: PropTypes.func.isRequired,
};
export default SliderPage;
