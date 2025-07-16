import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../shared/Card';
import { MENU_ITEMS } from '../../constants';
import { useLocalization } from '../../context/LocalizationContext';
import { useUser } from '../../context/UserContext'; // Import useUser
import { getSushiRecommendation } from '../../services/geminiService';
import { AIRecommendation, MenuItem, User } from '../../types';
import Spinner from '../shared/Spinner';
import LogoIcon from '../icons/LogoIcon';

const AIIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 7a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-1.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H14a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2a1 1 0 011-1h1.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H9a1 1 0 01-1-1V7z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8.5 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);


const AIRecommenderModal = ({ onClose, user }: { onClose: () => void, user: User }) => {
    const { t, language } = useLocalization();
    const [preference, setPreference] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AIRecommendation | null>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!preference) return;
        setIsLoading(true);
        setResult(null);
        setError('');
        try {
            // Pass the full menu to the service
            const res = await getSushiRecommendation(preference, user, language, MENU_ITEMS);
            setResult(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const recommendedItem = useMemo(() => {
        if (!result) return null;
        return MENU_ITEMS.find(item => item.name.pl === result.recommendation.name) || null;
    }, [result]);

    const modalContent = (
        <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="max-w-lg w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="border-lime-500/50">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold font-serif text-lime-400 mb-4">{t('aiModalTitle')}</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white">×</button>
                    </div>

                    {!result && (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={preference}
                                onChange={(e) => setPreference(e.target.value)}
                                placeholder={t('aiPrompt')}
                                className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-lime-500 focus:border-lime-500 transition-colors"
                                rows={3}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !preference}
                                className="w-full mt-4 bg-lime-500 text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-lime-400 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Spinner /> : t('getSuggestion')}
                            </button>
                            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                        </form>
                    )}

                    {result && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            {recommendedItem && (
                                <Card className="p-0 overflow-hidden">
                                    <img src={recommendedItem.imageUrl} alt={recommendedItem.name[language]} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <p className="text-xs font-semibold text-lime-400 uppercase tracking-wider">{t('recommendation')}</p>
                                        <h3 className="text-xl font-bold text-white">{recommendedItem.name[language]}</h3>
                                    </div>
                                </Card>
                            )}
                            <p className="text-slate-300 bg-slate-900/50 p-3 rounded-lg">{result.recommendation.description}</p>
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                                <h4 className="font-bold text-lime-400">{result.pairing.name}</h4>
                                <p className="text-slate-300 text-sm">{result.pairing.description}</p>
                            </div>
                            <button
                                onClick={() => { setResult(null); setPreference(''); }}
                                className="w-full mt-4 bg-slate-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-slate-500 transition-colors duration-300"
                            >
                                {t('askAgain')}
                            </button>
                        </motion.div>
                    )}
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
            staggerChildren: 0.07,
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

const Menu = () => {
    const { t, language } = useLocalization();
    const { user, isLoading } = useUser(); // Get user from context
    const [isAiModalOpen, setAiModalOpen] = useState(false);

    const categories = useMemo(() => {
        return MENU_ITEMS.reduce((acc, item) => {
            const categoryName = item.category[language];
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push(item);
            return acc;
        }, {} as Record<string, MenuItem[]>);
    }, [language]);

    return (
        <>
            <AnimatePresence>
                {isAiModalOpen && user && <AIRecommenderModal user={user} onClose={() => setAiModalOpen(false)} />}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
            >
                <h1 className="text-4xl font-extrabold text-white mb-8 font-serif">{t('ourMenu')}</h1>

                {Object.entries(categories).map(([categoryName, items]) => (
                    <div key={categoryName} className="mb-12">
                        <h2 className="text-3xl font-bold text-lime-400 font-serif mb-6">{categoryName}</h2>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {items.map(item => (
                                <motion.div key={item.id} variants={itemVariants}>
                                    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:scale-105 hover:border-lime-500/50">
                                        <img src={item.imageUrl} alt={item.name[language]} className="w-full h-48 object-cover" />
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-white mb-2">{item.name[language]}</h3>
                                            <p className="text-slate-400 mb-4 flex-grow text-sm">{item.description[language]}</p>
                                            <div className="flex justify-between items-center mt-auto pt-2">
                                                <p className="text-2xl font-semibold text-lime-400">{item.price.toFixed(2)} zł</p>
                                                <div className="flex space-x-2">
                                                    {item.isVegan && <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full">VEGAN</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}

            </motion.div>

            <button
                onClick={() => setAiModalOpen(true)}
                title={t('aiRecommendation')}
                disabled={isLoading || !user}
                className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 h-16 w-16 bg-slate-800 text-lime-400 rounded-full shadow-lg border-2 border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:text-lime-300 hover:scale-110 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                <AIIcon className="w-8 h-8" />
            </button>
        </>
    );
};

export default Menu;