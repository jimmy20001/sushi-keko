import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ScanResponse } from '../../types';
import { useLocalization } from '../../context/LocalizationContext';
import Card from '../shared/Card';

interface ScanSuccessModalProps {
  result: ScanResponse;
  onClose: () => void;
}

const ScanSuccessModal: React.FC<ScanSuccessModalProps> = ({ result, onClose }) => {
  const { t, language } = useLocalization();
  const pointsRef = useRef<HTMLSpanElement>(null);
  const oldTotalPoints = result.new_total_points - result.points_added - result.bonus_points;

  useEffect(() => {
    // Fire confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  
    // Animate total points
    const node = pointsRef.current;
    if (!node) return;

    const controls = animate(oldTotalPoints, result.new_total_points, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      }
    });

    return () => controls.stop();
  }, [result, oldTotalPoints]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <Card className="max-w-md w-full border-lime-500/50 text-center">
          <h2 className="text-3xl font-bold text-lime-400 mb-4">{t('scanSuccessTitle')}</h2>
          
          <div className="space-y-4 my-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              className="bg-slate-700/50 p-4 rounded-lg"
            >
              <p className="text-slate-300 text-sm">{t('pointsAdded')}</p>
              <p className="text-white font-bold text-2xl">+{result.points_added} {t('points')}</p>
            </motion.div>
            
            <AnimatePresence>
            {result.bonus_points > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30"
              >
                <p className="text-yellow-300 text-sm font-bold">{t('bonusAdded')}</p>
                <p className="text-yellow-200 font-bold text-2xl">+{result.bonus_points} {t('points')}</p>
                 {result.challenge_completed_en && (
                    <p className="text-yellow-300 text-xs mt-1">
                        {t('challengeCompleted')}: {language === 'pl' ? result.challenge_completed_pl : result.challenge_completed_en}
                    </p>
                 )}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
             className="mt-8"
          >
            <p className="text-slate-300">{t('totalPoints')}</p>
            <p className="text-lime-400 font-bold text-5xl">
                <span ref={pointsRef}>{oldTotalPoints.toLocaleString()}</span>
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
            onClick={onClose}
            className="w-full mt-8 bg-lime-500 text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-lime-400 transition-colors duration-300"
          >
            {t('done')}
          </motion.button>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ScanSuccessModal;
