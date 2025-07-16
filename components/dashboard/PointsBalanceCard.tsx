
import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import Card from '../shared/Card';
import { useLocalization } from '../../context/LocalizationContext';
import { User } from '../../types';
import BronzeIcon from './icons/BronzeIcon';
import SilverIcon from './icons/SilverIcon';
import GoldIcon from './icons/GoldIcon';

interface PointsBalanceCardProps {
  points: number;
  tier: User['loyalty_tier'];
}

const tierDetails = {
  bronze: { Icon: BronzeIcon, labelKey: 'tierBronze', color: 'text-orange-400' },
  silver: { Icon: SilverIcon, labelKey: 'tierSilver', color: 'text-slate-300' },
  gold: { Icon: GoldIcon, labelKey: 'tierGold', color: 'text-yellow-400' },
};

const PointsBalanceCard: React.FC<PointsBalanceCardProps> = ({ points, tier }) => {
  const { t } = useLocalization();
  const pointsRef = useRef<HTMLParagraphElement>(null);
  const { Icon, labelKey, color } = tierDetails[tier];

  useEffect(() => {
    const node = pointsRef.current;
    if (!node) return;

    const controls = animate(0, points, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      }
    });

    return () => controls.stop();
  }, [points]);

  return (
    <Card className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-300 mb-1">{t('yourPoints')}</h2>
          <p ref={pointsRef} className="text-5xl font-bold text-lime-400">0</p>
        </div>
        <div className="text-center">
           <Icon className={`h-16 w-16 mx-auto ${color}`} />
           <p className={`mt-1 font-bold text-lg ${color}`}>{t(labelKey as any)}</p>
        </div>
      </div>
    </Card>
  );
};

export default PointsBalanceCard;
