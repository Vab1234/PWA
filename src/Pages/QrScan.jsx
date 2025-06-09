// File: src/pages/QRScan.jsx
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

export default function QRScan() {
  const scannerRef = useRef(null);
  const scannerInstance = useRef(null);

  const handleScan = async (text) => {
    try {
      const { eventId, expiresAt } = JSON.parse(text);
      await axios.post('/event/mark-attendance-via-qr', { eventId, expiresAt });
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
      (decodedText, decodedResult) => {
        handleScan(decodedText);
      },
      (errorMessage) => {
        // optional: handle scanning errors here
      }
    );

    return () => {
      scannerInstance.current.clear().catch(console.error);
    };
  }, []);

  return (
    <div>
      <h2>Scan QR</h2>
      <div id="reader" ref={scannerRef} />
    </div>
  );
}
