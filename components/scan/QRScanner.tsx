import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure: (error: any) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanFailure }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    const scanner = new Html5Qrcode('reader');
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          config,
          (decodedText, decodedResult) => {
             scanner.stop().then(() => {
                onScanSuccess(decodedText);
             }).catch(err => {
                console.error("Failed to stop scanner", err);
                onScanSuccess(decodedText); // Proceed even if stop fails
             });
          },
          (errorMessage) => {
            // This callback is called frequently, ignore 'QR code not found' errors.
          }
        );
      } catch (err) {
        onScanFailure(err);
      }
    };
    
    startScanner();

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => {
          console.error("Cleanup failed to stop scanner", err);
        });
      }
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="relative w-full h-full">
      <div id="reader" className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[250px] h-[250px]">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-lime-400 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-lime-400 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-lime-400 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-lime-400 rounded-br-lg" />
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
