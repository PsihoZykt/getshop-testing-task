import React from 'react';
import PropTypes from 'prop-types';
import s from './bannerEntry.module.css';
import QrCode from '../../UI/QrCode';

function BannerEntry({ switchToPhonePage }) {
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

BannerEntry.propTypes = {
  switchToPhonePage: PropTypes.func.isRequired,
};
export default BannerEntry;
