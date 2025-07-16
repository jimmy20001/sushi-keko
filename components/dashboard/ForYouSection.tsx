import React from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../../context/LocalizationContext';
import { DashboardCardData } from '../../types';
import ChallengeCard from './ChallengeCard';
import RecommendationCard from './RecommendationCard';
import LocationStockCard from './LocationStockCard';

interface ForYouSectionProps {
  cards: DashboardCardData[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ForYouSection: React.FC<ForYouSectionProps> = ({ cards }) => {
  const { t } = useLocalization();

  const renderCard = (card: DashboardCardData) => {
    switch (card.type) {
      case 'challenge':
        return <ChallengeCard data={card} />;
      case 'recommendation':
        return <RecommendationCard data={card} />;
      case 'location_stock':
        return <LocationStockCard data={card} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">{t('forYou')}</h2>
      <motion.div 
        className="flex space-x-4 overflow-x-auto pb-4 -mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card, index) => (
          <div key={index} className="flex-shrink-0 w-72">
            {renderCard(card)}
          </div>
        ))}
        <div className="flex-shrink-0 w-1"></div>
      </motion.div>
    </div>
  );
};

export default ForYouSection;