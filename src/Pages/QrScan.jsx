import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export default function QRScan() {
  const scannerRef = useRef(null);
  const scannerInstance = useRef(null);

  const handleScan = async (text) => {
    const token = localStorage.getItem("token");
    try {
      const { eventId, expiresAt } = JSON.parse(text);
      await axios.post(BASE_URL + '/event/mark-attendance-via-qr', { eventId, expiresAt }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Attendance marked successfully!');
    } catch (error) {
      console.error('Error parsing QR code or marking attendance:', error);
      alert('Invalid QR Code or failed to mark attendance.');
    }
  };

  useEffect(() => {
    if (!scannerRef.current) return;

    scannerInstance.current = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scannerInstance.current.render(
      (decodedText, decodedResult) => handleScan(decodedText),
      (errorMessage) => {}
    );

    return () => {
      scannerInstance.current.clear().catch(console.error);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Scan QR</h2>
      <div id="reader" ref={scannerRef} className="mx-auto max-w-xs" />
    </div>
  );
}