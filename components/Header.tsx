
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';
import { useLocalization } from '../context/LocalizationContext';
import { Language } from '../types';

const Header = () => {
  const { language, setLanguage, t } = useLocalization();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-lime-500/20 text-lime-300'
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <header className="bg-gray-900/70 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <LogoIcon className="h-12 w-auto" />
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClasses}>{t('navDashboard')}</NavLink>
              <NavLink to="/menu" className={navLinkClasses}>{t('navMenu')}</NavLink>
              <NavLink to="/locations" className={navLinkClasses}>{t('navLocations')}</NavLink>
              <NavLink to="/rewards" className={navLinkClasses}>{t('navRewards')}</NavLink>
            </div>
          </div>
          <div className="flex items-center">
             <div className="bg-slate-800 rounded-full p-1 flex">
                <button 
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-lime-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => handleLanguageChange('pl')}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${language === 'pl' ? 'bg-lime-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                >
                  PL
                </button>
              </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
