import qrCode from "../../../assets/img/qrCode.png";
import React from "react";
import s from './index.module.css'

const QrCode = () => {
    return (
        <div>
            <img className={s.qrCode} src={qrCode} alt="QR code leads to getshoptv.com"/>
        </div>
    );
};

export default QrCode;