import React from 'react';
import PropTypes from 'prop-types';
import s from './index.module.css';
import QrCode from '../../UI/QrCode';

function EntryBanner({ switchToPhonePage }) {
  return (
    <div className={s.bannerEntry}>
      <h2>
        Исполните мечту вашего малыша!
        <br />
        Подарите ему собаку!
      </h2>
      <QrCode />
      <div>
        Сканируйте QR-код
        <br />
        или нажмите ОК
      </div>
      <div
        role="button"
        onKeyPress={switchToPhonePage}
        tabIndex={0}
        onClick={switchToPhonePage}
        className={s.button}
      >
        OK
      </div>
    </div>
  );
}

EntryBanner.propTypes = {
  switchToPhonePage: PropTypes.func.isRequired,
};
export default EntryBanner;
