import React from 'react';
import s from './index.module.css'
import exitButton from '../../assets/img/exitButton.svg'
import qrCode from '../../assets/img/qrCode.png'
import SliderPage from "../SliderPage";

const PhonePage = ({
                       number,
                       onPhoneSubmit,
                       onPersonalDataCheckbox,
                       onExitButton,
                       onNumberButton,
                       personalDataCheckbox,
                       isNumberError,
                       isFinalPageVisible
                   }) => {
    console.log(isFinalPageVisible)
        return (<>
                { !isFinalPageVisible ? <div className={s.phonePage}>
                    <div className={s.phoneForm}>
                        <h2> Введите ваш номер мобильного телефона </h2>
                        <h3 className={isNumberError ? s.incorrectNumberColor : null}> {number}</h3>
                        <p> и с Вами свяжется наш менеждер для <br/> дальнейшей консультации </p>
                        <div className={s.phoneInput}>
                            <NumberButton onNumberButton={onNumberButton} value={1}/>
                            <NumberButton onNumberButton={onNumberButton} value={2}/>
                            <NumberButton onNumberButton={onNumberButton} value={3}/>
                            <NumberButton onNumberButton={onNumberButton} value={4}/>
                            <NumberButton onNumberButton={onNumberButton} value={5}/>
                            <NumberButton onNumberButton={onNumberButton} value={6}/>
                            <NumberButton onNumberButton={onNumberButton} value={7}/>
                            <NumberButton onNumberButton={onNumberButton} value={8}/>
                            <NumberButton onNumberButton={onNumberButton} value={9}/>
                            <NumberButton onNumberButton={onNumberButton} value={"Стереть"}
                                          className={s.span3}/>
                            <NumberButton onNumberButton={onNumberButton} value={0}/>
                        </div>
                        {!isNumberError ? <div className={s.personalData}>
                            <input checked={personalDataCheckbox} onChange={onPersonalDataCheckbox}
                                   className={s.personalDataCheckbox} type="checkbox" id="personalData"/>
                            <label htmlFor="personalData">Согласие на обработку <br/> персональных данных </label>
                        </div> : <div className={s.incorrectNumberError}> Неверно введён номер </div>}
                        <div onClick={onPhoneSubmit} className={s.phoneSubmit}>
                            Подтвердить номер
                        </div>
                    </div>
                    <div onClick={onExitButton} className={s.exitButton}>
                        <img src={exitButton}/>
                    </div>
                    <div className={s.qrCodeBanner}>
                        <div className={s.qrCodeText}> Сканируйте QR-код <br/> для получения <br/> дополнительной <br/>информации
                        </div>
                        <div><img src={qrCode} alt="Qr code leads to getshoptv"/></div>


                    </div>
                </div> : <SliderPage onExitButton={onExitButton}/>}
            </>);
    }
;
const NumberButton = ({value, onNumberButton, className}) => {
    className = className ? className : "";
    return (
        <div onClick={() => {
            onNumberButton(value)
        }} className={s.numberButton + " " + className}>
            {value}
        </div>
    )
}
export default PhonePage;