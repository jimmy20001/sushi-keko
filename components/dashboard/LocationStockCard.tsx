import React from 'react';
import { motion } from 'framer-motion';
import Card from '../shared/Card';
import { useLocalization } from '../../context/LocalizationContext';
import { DashboardCardData } from '../../types';

interface LocationStockCardProps {
    data: Extract<DashboardCardData, { type: 'location_stock' }>;
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const LocationStockCard: React.FC<LocationStockCardProps> = ({ data }) => {
    const { t, language } = useLocalization();

    return (
        <motion.div variants={itemVariants} className="h-full">
            <Card className="flex flex-col h-full bg-slate-800/80 hover:border-lime-500/50">
                <div className="flex-grow">
                    <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
                        {t('inStockAt')} {data.machine_name}
                    </p>
                    <h3 className="font-bold text-white text-lg">
                        {language === 'pl' ? data.item_name_pl : data.item_name_en}
                    </h3>
                </div>
                <a href="#/locations" className="text-sm font-semibold text-lime-400 hover:text-lime-300 mt-4 self-start">
                    {t('viewLocations')} →
                </a>
            </Card>
        </motion.div>
    );
};

export default LocationStockCard;