import React from 'react';
import qrCode from '../../../assets/img/qrCode.png';
import s from './index.module.css';

function QrCode() {
  return (
    <div>
      <img loading="eager" className={s.qrCode} src={qrCode} alt="QR code leads to getshoptv.com" />
    </div>
  );
}

export default QrCode;
