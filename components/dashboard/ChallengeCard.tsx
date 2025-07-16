
import React from 'react';
import { motion } from 'framer-motion';
import Card from '../shared/Card';
import { useLocalization } from '../../context/LocalizationContext';
import { DashboardCardData } from '../../types';

interface ChallengeCardProps {
  data: Extract<DashboardCardData, { type: 'challenge' }>;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ data }) => {
  const { t, language } = useLocalization();
  const progressPercentage = Math.round(data.progress * 100);

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="flex flex-col h-full bg-slate-800/80 hover:border-lime-500/50">
        <h3 className="font-bold text-white text-lg mb-2">
            {language === 'pl' ? data.title_pl : data.title_en}
        </h3>
        <div className="mt-auto">
            <div className="flex justify-between text-sm text-slate-300 mb-1">
                <span>{t('challengeProgress')}</span>
                <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <motion.div
                    className="bg-lime-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ChallengeCard;
