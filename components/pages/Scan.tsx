import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import { useLocalization } from '../../context/LocalizationContext';
import { useUser } from '../../context/UserContext'; // Import useUser
import { ScanResponse } from '../../types';
import { scanCode } from '../../services/scanService';

import QRScanner from '../scan/QRScanner';
import ScanSuccessModal from '../scan/ScanSuccessModal';
import Spinner from '../shared/Spinner';

type ScanStatus = 'scanning' | 'loading' | 'success' | 'error';

const Scan = () => {
    const { t } = useLocalization();
    const { refetchUser } = useUser(); // Get the refetch function from context
    const [status, setStatus] = useState<ScanStatus>('scanning');
    const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleScanSuccess = async (decodedText: string) => {
        setStatus('loading');
        try {
            const result = await scanCode(decodedText);
            setScanResult(result);
            setStatus('success');
            refetchUser(); // CRITICAL: Update global user state
        } catch (err: any) {
            setErrorMessage(err.error || t('scanErrorApi'));
            setStatus('error');
        }
    };

    const handleScanError = (error: any) => {
        console.error("QR Scan Error:", error);
        setErrorMessage(t('scanCameraError'));
        setStatus('error');
    };

    const resetScanner = () => {
        setStatus('scanning');
        setScanResult(null);
        setErrorMessage('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center h-full"
        >
            <AnimatePresence>
                {scanResult && status === 'success' &&
                    createPortal(
                        <ScanSuccessModal result={scanResult} onClose={resetScanner} />,
                        document.getElementById('modal-root')!
                    )
                }
            </AnimatePresence>

            <div className="w-full max-w-md aspect-square bg-slate-900 rounded-3xl relative overflow-hidden shadow-2xl border-4 border-slate-800">
                <AnimatePresence mode="wait">
                    {status === 'scanning' && (
                        <motion.div
                            key="scanning"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full"
                        >
                            <QRScanner
                                onScanSuccess={handleScanSuccess}
                                onScanFailure={handleScanError}
                            />
                        </motion.div>
                    )}

                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm"
                        >
                            <Spinner />
                            <p className="mt-4 text-slate-300 font-semibold">{t('scanLoading')}</p>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/50 backdrop-blur-sm p-4 text-center"
                        >
                            <p className="text-red-300 font-bold text-lg">{errorMessage}</p>
                            <button
                                onClick={resetScanner}
                                className="mt-6 bg-lime-500 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-lime-400 transition-colors duration-300"
                            >
                                {t('tryAgain')}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <h1 className="text-2xl font-bold text-white mt-6 text-center">{t('scanTitle')}</h1>
            <p className="text-slate-400 text-center">{t('scanPrompt')}</p>
        </motion.div>
    );
};

export default Scan;