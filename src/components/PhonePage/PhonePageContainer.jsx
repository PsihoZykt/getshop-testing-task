import React, {useEffect, useState} from 'react';
import PhonePage from "./index";
import axios from 'axios'

const PhonePageContainer = ({switchToFinalPage, backToVideoPage, isFinalPageVisible}) => {

        const LAST_NUMBER_SYMBOL = 15;

        const [numberCounter, setNumberCounter] = useState(3)
        const [personalDataCheckbox, setPersonalDataCheckbox] = useState(false)
        const [isNumberError, setIsNumberError]  = useState(false);
        let onPhoneSubmit = () => {

            if (personalDataCheckbox && number[LAST_NUMBER_SYMBOL] !== "_") {
                validateNumber().then(res => {
                    console.log(res.data)
                    if (res.data.valid) {
                        switchToFinalPage()
                    } else {
                        setIsNumberError(true)
                    }
                })
            }
        }
        let onPersonalDataCheckbox = () => {
            setPersonalDataCheckbox(!personalDataCheckbox)
        }
        let onExitButton = () => {
            backToVideoPage();
        }
        let validateNumber = () => {
            return axios.get(`http://apilayer.net/api/validate?access_key=fb06d83a07193e429de6e8936e3ad69d&number=${number.substring(2)}&country_code=RU&format=1`)

        }
        const [number, setNumber] = useState("+7(___)___-__-__")
        let onNumberButton = (value) => {

            if (Number.isInteger(value)) {
                if ((numberCounter === 5 || numberCounter === 9 || numberCounter === 12) && numberCounter <= LAST_NUMBER_SYMBOL) {
                    setNumberCounter((numberCounter) => numberCounter + 2)
                } else if (numberCounter <= LAST_NUMBER_SYMBOL) setNumberCounter(numberCounter => numberCounter + 1)
                let newNumber = setCharAt(number, numberCounter, value)
                setNumber(newNumber)
            } else {
                if (numberCounter > 3 && numberCounter <= 16) {
                    setIsNumberError(false)
                    let newNumber;
                    if (numberCounter === 7 || numberCounter === 11 || numberCounter === 14) {
                        newNumber = setCharAt(number, numberCounter - 2, "_")
                        setNumberCounter(numberCounter => numberCounter - 2)
                    } else {

                        if (numberCounter <= LAST_NUMBER_SYMBOL) {
                            newNumber = setCharAt(number, numberCounter - 1, "_")
                            setNumberCounter(numberCounter => numberCounter - 1)
                        } else {
                            newNumber = setCharAt(number, 15, "_")
                            setNumberCounter(numberCounter => numberCounter - 1)
                        }
                    }
                    setNumber(newNumber)
                }
            }

        }
        //I used keyup because keydown works incorrectly when you hold  a button ( Some inputs are skipping  )
        useEffect(() => {
            const handleEsc = (event) => {
                if (event.keyCode >= 48 && event.keyCode <= 57) {
                    onNumberButton(event.keyCode - 48)
                } else if (event.keyCode === 8) {
                    onNumberButton("-")
                }
            };
            window.addEventListener('keyup', handleEsc);

            return () => {
                window.removeEventListener('keyup', handleEsc);
            };
        }, [onNumberButton]);
        return (
            <PhonePage onPhoneSubmit={onPhoneSubmit}
                       onPersonalDataCheckbox={onPersonalDataCheckbox}
                       onExitButton={onExitButton}
                       onNumberButton={onNumberButton}
                       isFinalPageVisible={isFinalPageVisible}
                       personalDataCheckbox={personalDataCheckbox}
                       isNumberError={isNumberError}
                       number={number}/>
        );
    }
;

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

export default PhonePageContainer;
