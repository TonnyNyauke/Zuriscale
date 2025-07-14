// components/customers/AddProspectModal.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addProspect } from '@/app/actions/prospects/add-prospect';

interface AddProspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProspectAdded?: () => void;
}

const AddProspectModal: React.FC<AddProspectModalProps> = ({ 
  isOpen, 
  onClose, 
  onProspectAdded 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    inquiry: '',
    budget: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Clear any previous errors
    
    try {
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.phone.trim()) {
        throw new Error('Phone number is required');
      }
      if (!formData.inquiry.trim()) {
        throw new Error('Inquiry is required');
      }

      // Validate budget if provided
      const budget = formData.budget.trim() ? parseInt(formData.budget) : 0;
      if (formData.budget.trim() && (isNaN(budget!) || budget! < 0)) {
        throw new Error('Budget must be a valid positive number');
      }

      await addProspect({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        inquiry: formData.inquiry.trim(),
        budget: budget
      });
      
      // Reset form
      setFormData({ name: '', phone: '', inquiry: '', budget: '' });
      
      // Call the callback to refresh the prospects data
      if (onProspectAdded) {
        onProspectAdded();
      }
      
      onClose();
    } catch (error) {
      console.error('Error adding prospect:', error);
      
      // Handle different types of errors
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === 'object' && error !== null) {
        // Handle Supabase/PostgreSQL errors
        const dbError = error as any;
        if (dbError.message) {
          setError(dbError.message);
        } else if (dbError.details) {
          setError(dbError.details);
        } else if (dbError.hint) {
          setError(dbError.hint);
        } else {
          setError('An unexpected error occurred while adding the prospect');
        }
      } else {
        setError('An unexpected error occurred while adding the prospect');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', inquiry: '', budget: '' });
    setError(null); // Clear errors when closing
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Walk-in Customer</h2>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              placeholder="Enter customer name"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex">
              <div className="flex items-center justify-center px-4 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-600 font-medium">
                +254
              </div>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="712 345 678"
                className={'w-full px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-teal-500 transition-colors'}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inquiry/Interest <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.inquiry}
              onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              placeholder="What were they looking for?"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (KES)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              placeholder="e.g. 15000"
              min="0"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">Optional - helps with follow-up</p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Prospect'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProspectModal;