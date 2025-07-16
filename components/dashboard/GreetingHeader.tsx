
import React from 'react';
import { useLocalization } from '../../context/LocalizationContext';

interface GreetingHeaderProps {
  name: string;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({ name }) => {
  const { t } = useLocalization();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetingMorning');
    if (hour < 18) return t('greetingAfternoon');
    return t('greetingEvening');
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white">
        {getGreeting()}, <span className="text-lime-400">{name}!</span>
      </h1>
    </div>
  );
};

export default GreetingHeader;
