import React from 'react';
import { useParams } from 'react-router-dom';

const MusicQrCodePage = () => {
  const { code } = useParams();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
      <h1>Music QR Code</h1>
      <p>Code: <strong>{code}</strong></p>
      {/* Aquí puedes agregar la lógica para mostrar el QR o información relacionada */}
    </div>
  );
};

export default MusicQrCodePage;
