
import React from 'react';
import { motion } from 'framer-motion';
import Card from '../shared/Card';
import { useLocalization } from '../../context/LocalizationContext';
import { DashboardCardData } from '../../types';

interface RecommendationCardProps {
  data: Extract<DashboardCardData, { type: 'recommendation' }>;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ data }) => {
    const { t, language } = useLocalization();

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="flex flex-col h-full p-0 overflow-hidden bg-slate-800/80 hover:border-lime-500/50">
        <img src={data.image_url} alt={language === 'pl' ? data.name_pl : data.name_en} className="w-full h-32 object-cover"/>
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-1">{t('recommendation')}</p>
            <h3 className="font-bold text-white text-lg flex-grow">
                {language === 'pl' ? data.name_pl : data.name_en}
            </h3>
            <a href="#/menu" className="text-sm font-semibold text-lime-400 hover:text-lime-300 mt-2 self-start">
                {t('viewMenu')} &rarr;
            </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecommendationCard;
