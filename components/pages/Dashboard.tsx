import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ForYouResponse } from '../../types';
import { fetchForYouCards } from '../../services/dashboardService';
import { useUser } from '../../context/UserContext'; // Import useUser

import GreetingHeader from '../dashboard/GreetingHeader';
import PointsBalanceCard from '../dashboard/PointsBalanceCard';
import ForYouSection from '../dashboard/ForYouSection';
import DashboardSkeleton from '../dashboard/DashboardSkeleton';

const pageVariants: Variants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

const Dashboard = () => {
    const { user, isLoading: isUserLoading } = useUser(); // Use the UserContext
    const [forYouData, setForYouData] = useState<ForYouResponse | null>(null);
    const [isCardsLoading, setIsCardsLoading] = useState(true);

    useEffect(() => {
        const loadForYouData = async () => {
            setIsCardsLoading(true);
            try {
                const forYouCardsData = await fetchForYouCards();
                setForYouData(forYouCardsData);
            } catch (error) {
                console.error("Failed to load For You cards data", error);
            } finally {
                setIsCardsLoading(false);
            }
        };

        if (!isUserLoading) {
            loadForYouData();
        }
    }, [isUserLoading]);

    if (isUserLoading || isCardsLoading) {
        return <DashboardSkeleton />;
    }

    if (!user || !forYouData) {
        return <div>Error loading data.</div>; // Or a more user-friendly error component
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <GreetingHeader name={user.name} />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <PointsBalanceCard points={user.points} tier={user.loyalty_tier} />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <ForYouSection cards={forYouData.cards} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;