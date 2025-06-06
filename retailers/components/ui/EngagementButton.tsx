import React from 'react';

interface EngagementButtonProps {
  type: 'whatsapp' | 'sms';
  onClick: () => void;
}

const EngagementButton: React.FC<EngagementButtonProps> = ({ type, onClick }) => {
  const colors = {
    whatsapp: 'bg-green-500 hover:bg-green-600',
    sms: 'bg-blue-500 hover:bg-blue-600'
  };
  
  const icons = {
    whatsapp: 'WhatsApp',
    sms: 'SMS'
  };
  
  return (
    <button
      onClick={onClick}
      className={`${colors[type]} text-white px-4 py-2 rounded-lg flex items-center transition-colors`}
    >
      <span className="mr-2">{icons[type]}</span>
      Re-engage
    </button>
  );
};

export default EngagementButton;