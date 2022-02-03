import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import PhonePage from './index';

function PhonePageContainer({ switchToSliderPage, backToVideoPage }) {
  const LAST_NUMBER_SYMBOL = 15;
  const FIRST_NUMBER_SYMBOL = 3;

  const [numberCounter, setNumberCounter] = useState(3);
  const [personalDataCheckbox, setPersonalDataCheckbox] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNumberButtonDisabled, setIsNumberButtonDisabled] = useState(false);
  const [number, setNumber] = useState('+7(___)___-__-__');
  const onPersonalDataCheckbox = () => {
    setPersonalDataCheckbox(!personalDataCheckbox);
  };
  const onExitButton = () => {
    backToVideoPage();
  };
  const options = {
    method: 'GET',
    url: 'https://veriphone.p.rapidapi.com/verify',
    params: { phone: `${number.substring(2)}` },
    headers: {
      'x-rapidapi-host': 'veriphone.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_VERIFY_NUMBER_API_KEY,
    },
  };

  const validateNumber = () => axios.request(options);
  const onPhoneSubmit = () => {
    setIsLoading(true);
    if (personalDataCheckbox && number[LAST_NUMBER_SYMBOL] !== '_') {
      validateNumber().then((res) => {
        if (res.data.phone_valid) {
          switchToSliderPage();
        } else {
          setIsNumberError(true);
        }
      });
    } else {
      setIsNumberError(true);
    }
    setIsLoading(false);
  };

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  // Without this some inputs can be skipped when there are a lot of simultaneous inputs
  const onNumberButton = (value) => {
    setIsNumberButtonDisabled(true);
    setIsNumberError(false);
    if (Number.isInteger(value)) {
      if ((number[numberCounter + 1] === '(' || number[numberCounter + 1] === ')' || number[numberCounter + 1] === '-') && numberCounter <= LAST_NUMBER_SYMBOL) {
        setNumberCounter((counter) => counter + 2);
      } else if (numberCounter <= LAST_NUMBER_SYMBOL) {
        setNumberCounter((counter) => counter + 1);
      }
      const newNumber = setCharAt(number, numberCounter, value);
      setNumber(newNumber);
    } else if (numberCounter > FIRST_NUMBER_SYMBOL && numberCounter <= LAST_NUMBER_SYMBOL + 1) {
      let newNumber;
      if (number[numberCounter - 1] === '(' || number[numberCounter - 1] === ')' || number[numberCounter - 1] === '-') {
        newNumber = setCharAt(number, numberCounter - 2, '_');
        setNumberCounter((counter) => counter - 2);
      } else if (numberCounter <= LAST_NUMBER_SYMBOL) {
        newNumber = setCharAt(number, numberCounter - 1, '_');
        setNumberCounter((counter) => counter - 1);
      } else if (numberCounter === LAST_NUMBER_SYMBOL + 1) {
        newNumber = setCharAt(number, LAST_NUMBER_SYMBOL, '_');
        setNumberCounter((counter) => counter - 1);
      }
      setNumber(newNumber);
    }
    setIsNumberButtonDisabled(false);
  };
  useEffect(() => {
    const handleKeys = (event) => {
      if (!isNumberButtonDisabled) {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
          onNumberButton(event.keyCode - 48);
        } else if (event.keyCode === 8) {
          onNumberButton('Стереть');
        }
      }
    };
    window.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
  });
  return (
    <PhonePage
      onPhoneSubmit={onPhoneSubmit}
      onPersonalDataCheckbox={onPersonalDataCheckbox}
      onExitButton={onExitButton}
      onNumberButton={onNumberButton}
      personalDataCheckbox={personalDataCheckbox}
      isNumberError={isNumberError}
      isLoading={isLoading}
      number={number}
    />
  );
}

PhonePageContainer.propTypes = {
  switchToSliderPage: PropTypes.func.isRequired,
  backToVideoPage: PropTypes.func.isRequired,
};
export default PhonePageContainer;
