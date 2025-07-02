// components/customers/WhatsAppButton.tsx
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  name: string;
  type?: 'follow-up' | 'promotion' | 'retention';
  inquiry?: string;
  className?: string;
  disabled?: boolean;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phone, 
  name, 
  type = 'follow-up', 
  inquiry = '', 
  className = '',
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getMessageTemplate = () => {
    const templates = {
      'follow-up': `Hi ${name}! I hope you're doing well. I wanted to follow up on your recent visit to our store${inquiry ? ` regarding "${inquiry}"` : ''}. Do you have any questions I can help with?`,
      'promotion': `Hi ${name}! We have exciting new arrivals that might interest you. Would you like to see our latest collection?`,
      'retention': `Hi ${name}! We miss you and would love to have you visit our store again. We have some great offers just for you!`
    };
    return templates[type];
  };

  const handleWhatsApp = async () => {
    if (!phone) {
      alert('No phone number available for this customer');
      return;
    }

    setIsLoading(true);
    
    try {
      // Here you would integrate with your WhatsApp messaging system
      // For now, we'll use the web WhatsApp URL as fallback
      const message = encodeURIComponent(getMessageTemplate());
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${message}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // TODO: Replace with your actual WhatsApp API call
      // await sendWhatsAppMessage(phone, getMessageTemplate());
      
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!phone) {
    return (
      <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-400 text-sm rounded-lg cursor-not-allowed">
        <MessageCircle className="w-4 h-4 mr-1" />
        No Phone
      </span>
    );
  }

  return (
    <button
      onClick={handleWhatsApp}
      disabled={disabled || isLoading}
      className={`inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <MessageCircle className="w-4 h-4 mr-1" />
          WhatsApp
        </>
      )}
    </button>
  );
};

export default WhatsAppButton;