import React from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import Menu from './components/pages/Menu';
import Locations from './components/pages/Locations';
import Rewards from './components/pages/Rewards';
import Scan from './components/pages/Scan';
import Allergens from './components/pages/Allergens';
import { LocalizationProvider, useLocalization } from './context/LocalizationContext';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import ScanIcon from './components/icons/ScanIcon';

// Icon components for MobileNav
const DashboardIcon = ({ className }: { className?: string }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>);
const MenuIcon = ({ className }: { className?: string }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>);
const LocationIcon = ({ className }: { className?: string }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>);
const RewardsIcon = ({ className }: { className?: string }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22 10h-4.21l-3.23-5.29-1.74 1.05L15.96 10H8.04l3.15-4.24-1.74-1.05L6.21 10H2v8h20v-8zM12 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg>);


const MobileNav = () => {
    const { t } = useLocalization();
    const navLinkClasses = "flex flex-col items-center justify-center text-slate-400 w-1/5 py-2 transition-colors duration-200";
    const activeLinkClasses = "text-lime-300";

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md border-t border-slate-800 z-50 flex justify-around items-center h-16">
            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                <DashboardIcon className="h-6 w-6 mb-1" />
                <span className="text-xs">{t('navDashboard')}</span>
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                <MenuIcon className="h-6 w-6 mb-1" />
                <span className="text-xs">{t('navMenu')}</span>
            </NavLink>
            <NavLink to="/scan" className={({ isActive }) => `flex items-center justify-center h-16 w-16 bg-lime-500 rounded-full -mt-8 border-4 border-gray-900 shadow-lg transition-all duration-300 hover:bg-lime-400 ${isActive ? 'ring-2 ring-lime-300' : ''}`}>
                <ScanIcon className="h-8 w-8 text-slate-900" />
            </NavLink>
            <NavLink to="/locations" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                <LocationIcon className="h-6 w-6 mb-1" />
                <span className="text-xs">{t('navLocations')}</span>
            </NavLink>
            <NavLink to="/rewards" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                <RewardsIcon className="h-6 w-6 mb-1" />
                <span className="text-xs">{t('navRewards')}</span>
            </NavLink>
        </nav>
    );
};

const Footer = () => {
    const { t } = useLocalization();
    return (
        <footer className="w-full text-center p-4 mt-auto border-t border-slate-800 hidden md:block">
            <div className="max-w-7xl mx-auto flex justify-center items-center">
                <NavLink to="/allergens" className="text-slate-400 hover:text-lime-300 text-sm transition-colors">
                    {t('navAllergens')}
                </NavLink>
            </div>
        </footer>
    )
}


const AppContent = () => {
    const location = useLocation();
    return (
        <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-slate-900 text-white flex flex-col">
            <Header />
            <main className="flex-grow pb-24 md:pb-0">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/scan" element={<Scan />} />
                        <Route path="/locations" element={<Locations />} />
                        <Route path="/rewards" element={<Rewards />} />
                        <Route path="/allergens" element={<Allergens />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
            <MobileNav />
        </div>
    );
};

const App = () => {
    return (
        <LocalizationProvider>
            <UserProvider> {/* Wrap AppContent with UserProvider */}
                <HashRouter>
                    <AppContent />
                </HashRouter>
            </UserProvider>
        </LocalizationProvider>
    );
};

export default App;