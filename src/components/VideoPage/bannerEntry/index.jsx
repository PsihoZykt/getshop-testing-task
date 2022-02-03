import React from 'react';
import s from './bannerEntry.module.css';
import QrCode from '../../UI/QrCode';

function BannerEntry({ switchToPhonePage }) {
  return (
    <div className={s.bannerEntry}>
      <h2>
        {' '}
        Исполните мечту вашего малыша!
        <br />
        {' '}
        Подарите ему собаку!
        {' '}
      </h2>
      <QrCode />
      <div>
        {' '}
        Сканируйте QR-код
        <br />
        {' '}
        или нажмите ОК
      </div>
      <div onClick={switchToPhonePage} className={s.button}> OK</div>
    </div>
  );
}

export default BannerEntry;
