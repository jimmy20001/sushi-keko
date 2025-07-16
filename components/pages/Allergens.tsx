import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalization } from '../../context/LocalizationContext';
import { ALLERGEN_DATA } from '../../constants';

// A helper function to highlight allergens in a text description
const HighlightedDescription = ({ text, highlights }: { text: string; highlights: string[] }) => {
    if (!highlights.length) return <>{text}</>;

    const regex = new RegExp(`(${highlights.join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) =>
                highlights.some(h => new RegExp(`^${h}$`, 'i').test(part)) ? (
                    <strong key={i} className="text-yellow-400 font-bold">
                        {part}
                    </strong>
                ) : (
                    part
                )
            )}
        </>
    );
};

const AllergenItem = ({ item, isExpanded, onToggle }: { item: typeof ALLERGEN_DATA[0], isExpanded: boolean, onToggle: () => void }) => {
    const { language } = useLocalization();

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden mb-3">
            <motion.header
                initial={false}
                onClick={onToggle}
                className="p-4 cursor-pointer flex justify-between items-center"
            >
                <h2 className="font-bold text-white text-lg">{item.name[language]}</h2>
                <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </motion.div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="px-4 pb-4"
                    >
                        <div className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed font-mono border-t border-slate-700/50 pt-4">
                            <HighlightedDescription text={item.description[language]} highlights={item.allergens} />
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    )
}

const Allergens = () => {
    const { t } = useLocalization();
    const [expanded, setExpanded] = useState<string | false>(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"
        >
            <h1 className="text-3xl font-bold text-white mb-6 font-serif">{t('allergenListTitle')}</h1>
            <p className="text-slate-400 mb-8">{t('allergenListDescription')}</p>
            <div>
                {ALLERGEN_DATA.map(item => (
                    <AllergenItem
                        key={item.id}
                        item={item}
                        isExpanded={expanded === item.id}
                        onToggle={() => setExpanded(expanded === item.id ? false : item.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Allergens;