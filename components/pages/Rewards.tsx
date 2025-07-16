import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../shared/Card';
import { REWARDS } from '../../constants';
import { useLocalization } from '../../context/LocalizationContext';
import { useUser } from '../../context/UserContext'; // Import useUser
import { Reward, User } from '../../types';

const RedemptionModal = ({ reward, user, onClose }: { reward: Reward; user: User; onClose: () => void }) => {
  const { t, language } = useLocalization();
  // Use the user's actual ID from the context for the QR code
  const qrData = `SUSHI_KEKO_REWARD:${reward.id}:${user.id}:${new Date().getTime()}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=2A332F&color=9CCC65&qzone=1`;

  const modalContent = (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        <Card className="max-w-md w-full border-lime-500/50">
          <h2 className="text-2xl font-bold text-lime-400 text-center mb-2">{t('redeemSuccessTitle')}</h2>
          <p className="text-slate-300 text-center mb-4">{reward.name[language]}</p>
          <p className="text-slate-400 text-center text-sm mb-6">{t('redeemSuccessMessage')}</p>
          <div className="bg-slate-900 rounded-xl p-4 flex justify-center">
            <img src={qrCodeUrl} alt="Redemption QR Code" className="w-48 h-48 rounded-lg" />
          </div>
          <button
            onClick={onClose}
            className="w-full mt-6 bg-lime-500 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-lime-400 transition-colors duration-300"
          >
            {t('close')}
          </button>
        </Card>
      </motion.div>
    </motion.div>
  );

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(modalContent, modalRoot) : null;
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Rewards = () => {
  const { t, language } = useLocalization();
  const { user } = useUser(); // Get user from context
  const [redeemedReward, setRedeemedReward] = useState<Reward | null>(null);

  const handleRedeem = async (reward: Reward) => {
    if (!user || user.points < reward.pointsRequired) return;

    // In a real app, you would make an API call here
    // try {
    //   const response = await fetch('/api/rewards/redeem', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ rewardId: reward.id })
    //   });
    //   if (!response.ok) throw new Error('Redemption failed');
    //   refetchUser(); // Update points globally
    //   setRedeemedReward(reward);
    // } catch (error) {
    //   console.error(error);
    //   // Handle UI error state
    // }

    // For demonstration:
    setRedeemedReward(reward);
  };

  const loyaltyTiers = { bronze: 1, silver: 2, gold: 3 };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading user data...</p>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {redeemedReward && <RedemptionModal reward={redeemedReward} user={user} onClose={() => setRedeemedReward(null)} />}
      </AnimatePresence>
      <motion.div
        className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-6">{t('rewardsMarketplace')}</h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {REWARDS.map(reward => {
            const canAfford = user.points >= reward.pointsRequired;
            const hasTier = loyaltyTiers[user.loyalty_tier] >= loyaltyTiers[reward.tierRequired];
            const canRedeem = canAfford && hasTier;

            return (
              <motion.div key={reward.id} variants={itemVariants}>
                <Card className="flex flex-col overflow-hidden h-full">
                  <img src={reward.imageUrl} alt={reward.name[language]} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{reward.name[language]}</h3>
                    <div className="flex-grow mb-4">
                      {!hasTier && (
                        <p className="text-sm text-yellow-400 font-semibold">{t('tierRequired')}: {t(`tier${reward.tierRequired.charAt(0).toUpperCase() + reward.tierRequired.slice(1)}` as any)}</p>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <p className="text-xl font-semibold text-lime-400">{reward.pointsRequired.toLocaleString()} {t('points')}</p>
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canRedeem}
                        className="bg-lime-500 text-slate-900 font-bold px-4 py-2 rounded-lg hover:bg-lime-400 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400"
                      >
                        {canRedeem ? t('redeem') : (canAfford ? t('tierLocked') : t('insufficientPoints'))}
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Rewards;