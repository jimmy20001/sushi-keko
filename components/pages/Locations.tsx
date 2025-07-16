
import React from 'react';
import { motion } from 'framer-motion';
import { VENDING_MACHINES } from '../../constants';
import { useLocalization } from '../../context/LocalizationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Locations = () => {
  const { t, language } = useLocalization();

  return (
    <motion.div 
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Left Column: Image */}
            <motion.div 
              className="w-full h-80 lg:h-auto lg:col-span-2 bg-slate-800 rounded-2xl flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            >
               <div 
                className="w-full h-full bg-contain bg-no-repeat bg-center rounded-lg"
                style={{ backgroundImage: `url('https://i.imgur.com/k2eB9aE.png')`}}
               >
               </div>
            </motion.div>

            {/* Right Column: Text Content */}
            <div className="lg:col-span-3">
                <motion.h1 
                    className="text-4xl md:text-5xl font-extrabold text-[#F08080] mb-3 font-serif tracking-tight"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {t('automatySushi' as any)}
                </motion.h1>
                <motion.p 
                    className="text-slate-300 mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    {t('automatySushiDescription' as any)}
                </motion.p>
                
                <motion.div 
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {VENDING_MACHINES.map(machine => (
                        <motion.div 
                            key={machine.id} 
                            variants={itemVariants}
                            className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/80 rounded-xl p-3 flex items-center space-x-4 transition-all hover:border-slate-600 hover:bg-slate-800/60"
                        >
                            <div className="flex-shrink-0 h-10 w-10 bg-[#F08080] rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md">
                                {machine.id}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-white">{machine.name}</h3>
                                <p className="text-slate-400 text-sm">{machine.locationDescription[language]}</p>
                            </div>
                            <a 
                                href={`https://www.google.com/maps?q=${machine.latitude},${machine.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-lime-400 hover:text-lime-300 transition-colors font-semibold flex-shrink-0"
                            >
                                Map &rarr;
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
                 <motion.p 
                    className="text-slate-400 mt-8 text-sm italic"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.4 }}
                >
                    Jeżeli wybrany KeKomat nie spełnia Państwa oczekiwań, zapraszamy do skorzystania z innego urządzenia. W celu uzyskania informacji o dostępnych produktach zachęcamy do kontaktu telefonicznego.
                </motion.p>
            </div>
        </div>
    </motion.div>
  );
};

export default Locations;
