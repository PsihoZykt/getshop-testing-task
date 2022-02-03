import React from 'react';
import PropTypes from 'prop-types';
import s from './index.module.css';
import exitButton from '../../assets/img/exitButton.svg';
import qrCode from '../../assets/img/qrCode.png';

function PhonePage({
  number,
  onPhoneSubmit,
  onPersonalDataCheckbox,
  onExitButton,
  onNumberButton,
  personalDataCheckbox,
  isNumberError,
  isLoading,
}) {
  return (
    <div className={s.phonePage}>
      <div className={s.phoneForm}>
        <h2> Введите ваш номер мобильного телефона </h2>
        <h3 className={isNumberError ? s.incorrectNumberColor : null}>
          {number}
        </h3>
        <p>
          и с Вами свяжется наш менеждер для
          <br />
          дальнейшей консультации
        </p>
        <div className={s.phoneInput}>
          <NumberButton onNumberButton={onNumberButton} value={1} />
          <NumberButton onNumberButton={onNumberButton} value={2} />
          <NumberButton onNumberButton={onNumberButton} value={3} />
          <NumberButton onNumberButton={onNumberButton} value={4} />
          <NumberButton onNumberButton={onNumberButton} value={5} />
          <NumberButton onNumberButton={onNumberButton} value={6} />
          <NumberButton onNumberButton={onNumberButton} value={7} />
          <NumberButton onNumberButton={onNumberButton} value={8} />
          <NumberButton onNumberButton={onNumberButton} value={9} />
          <NumberButton
            onNumberButton={onNumberButton}
            value="Стереть"
            className={s.span3}
          />
          <NumberButton onNumberButton={onNumberButton} value={0} />
        </div>
        {!isNumberError ? (
          <div className={s.personalData}>
            <input
              checked={personalDataCheckbox}
              onChange={onPersonalDataCheckbox}
              className={s.personalDataCheckbox}
              type="checkbox"
              id="personalData"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="personalData">
              Согласие на обработку
              <br />
              персональных данных
            </label>
          </div>
        ) : (
          <div className={s.incorrectNumberError}>
            Неверно введён номер
            <br />
            и/или не дано согласие на обработку персональных данных
          </div>
        )}
        <div role="button" onKeyPress={onPhoneSubmit} tabIndex={0} onClick={onPhoneSubmit} className={s.phoneSubmit}>
          Подтвердить номер
        </div>
      </div>
      <div role="button" onKeyPress={onExitButton} tabIndex={0} onClick={onExitButton} className={s.exitButton}>
        <img src={exitButton} alt="X symbol" />
      </div>
      <div className={`${s.qrCodeBanner} ${isLoading ? s.disabled : ''}`}>
        <div className={s.qrCodeText}>
          Сканируйте QR-код
          <br />
          для получения
          <br />
          дополнительной
          <br />
          информации
        </div>
        <div><img src={qrCode} alt="Qr code leads to getshoptv" /></div>

      </div>
    </div>
  );
}

function NumberButton({ value, onNumberButton, className }) {
  const numberButtonClassName = className || '';
  return (
    <div
      role="button"
      tabIndex="0"
      onKeyPress={() => onNumberButton(value)}
      onClick={() => onNumberButton(value)}
      className={`${s.numberButton} ${numberButtonClassName}`}
    >
      {value}
    </div>
  );
}

export default PhonePage;
NumberButton.propTypes = {
  value: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'стереть']).isRequired,
  onNumberButton: PropTypes.func.isRequired,
  className: PropTypes.string,
};
NumberButton.defaultProps = {
  className: '',
};
PhonePage.propTypes = {
  number: PropTypes.string.isRequired,
  onPhoneSubmit: PropTypes.func.isRequired,
  onPersonalDataCheckbox: PropTypes.func.isRequired,
  onExitButton: PropTypes.func.isRequired,
  onNumberButton: PropTypes.func.isRequired,
  personalDataCheckbox: PropTypes.bool.isRequired,
  isNumberError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,

};
