// 'use client';

// import React, { useState } from 'react';
// import { Trash2, Plus, Minus, ShoppingCart, X, Check } from 'lucide-react';
// import { CartItem, CustomerFormData, Receipt } from '@/app/types/pos';
// import { useEnergy } from '../ui/EnergyProvider';
// import CustomerModal from './CustomerModal';
// import WhatsAppReceiptModal from './WhatsappReceptModal';

// interface CartPanelProps {
//   cart: CartItem[];
//   onUpdateQuantity: (id: string, quantity: number) => void;
//   onRemoveFromCart: (id: string) => void;
//   onClearCart: () => void;
// }

// export default function CartPanel({ 
//   cart, 
//   onUpdateQuantity, 
//   onRemoveFromCart,
//   onClearCart 
// }: CartPanelProps) {
//   const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
//   const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
//   const [currentReceipt, setCurrentReceipt] = useState<Receipt | null>(null);
//   const { energyMode } = useEnergy();
  
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const tax = subtotal * 0.16; // 16% VAT in Kenya
//   const total = subtotal + tax;
  
//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) {
//       onRemoveFromCart(id);
//       return;
//     }
//     onUpdateQuantity(id, quantity);
//   };

//   const handleProcessSale = (customerData: CustomerFormData) => {
//     // Create receipt
//     const receipt: Receipt = {
//       id: `RCP-${Date.now()}`,
//       customerName: customerData.name,
//       customerPhone: customerData.phone,
//       items: cart,
//       subtotal,
//       tax,
//       total,
//       timestamp: new Date().toISOString(),
//       boutiqueName: 'Zuriscale Boutique'
//     };

//     setCurrentReceipt(receipt);
//     setIsCustomerModalOpen(false);
//     setIsReceiptModalOpen(true);
//   };

//   const handleSaleComplete = () => {
//     // Clear cart and close modals
//     onClearCart();
//     setIsReceiptModalOpen(false);
//     setCurrentReceipt(null);
    
//     // Could trigger analytics or inventory updates here
//     console.log('Sale completed successfully');
//   };

//   const getTotalItems = () => {
//     return cart.reduce((sum, item) => sum + item.quantity, 0);
//   };
  
//   return (
//     <>
//       <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-emerald-50">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <ShoppingCart className="h-5 w-5 text-teal-700" />
//               <h2 className="text-lg font-bold text-gray-900">Current Sale</h2>
//             </div>
//             <div className="flex items-center gap-2">
//               {cart.length > 0 && (
//                 <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm px-3 py-1 rounded-full font-medium flex items-center gap-2">
//                   <span>{getTotalItems()} items</span>
//                   <div className="w-1 h-1 bg-white/70 rounded-full"></div>
//                   <span>KES {total.toLocaleString()}</span>
//                 </div>
//               )}
//               {cart.length > 0 && (
//                 <button 
//                   onClick={onClearCart}
//                   className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
//                   aria-label="Clear cart"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto">
//           {cart.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
//               <div className="relative mb-6">
//                 <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
//                   <ShoppingCart className="h-10 w-10 text-teal-600" />
//                 </div>
//                 <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
//                   <X className="h-5 w-5 text-white" />
//                 </div>
//               </div>
//               <h3 className="font-medium text-gray-900 text-lg mb-2">Your cart is empty</h3>
//               <p className="text-sm text-gray-500 text-center max-w-xs mb-6">
//                 Add products from the catalog to start a sale
//               </p>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="flex gap-1">
//                   {[...Array(3)].map((_, i) => (
//                     <div key={i} className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
//                   ))}
//                 </div>
//                 <span className="text-xs text-gray-500">Scroll down to see products</span>
//               </div>
//             </div>
//           ) : (
//             <div className="p-4 space-y-3">
//               {cart.map(item => (
//                 <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative group">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-900 text-sm leading-tight">
//                         {item.name}
//                       </h3>
//                       <p className="text-teal-700 font-semibold mt-1">
//                         KES {item.price.toLocaleString()}
//                       </p>
//                     </div>
                    
//                     <button 
//                       onClick={() => onRemoveFromCart(item.id)}
//                       className="text-red-500 hover:text-red-700 p-1 opacity-80 hover:opacity-100 transition-opacity"
//                       aria-label="Remove item"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <button 
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus className="h-4 w-4" />
//                       </button>
                      
//                       <span className="w-8 text-center font-medium text-gray-900">
//                         {item.quantity}
//                       </span>
                      
//                       <button 
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </button>
//                     </div>
                    
//                     <div className="text-right">
//                       <p className="font-bold text-gray-900">
//                         KES {(item.price * item.quantity).toLocaleString()}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {item.quantity} × KES {item.price.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Totals and Checkout */}
//         {cart.length > 0 && (
//           <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-white to-gray-50">
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="text-gray-900 font-medium">KES {subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Tax (16%)</span>
//                 <span className="text-gray-900 font-medium">KES {tax.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold">
//                 <span className="text-gray-900">Total</span>
//                 <span className="text-gray-900">KES {total.toLocaleString()}</span>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsCustomerModalOpen(true)}
//               className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all shadow-md hover:shadow-lg ${
//                 energyMode 
//                   ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
//                   : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700'
//               } flex items-center justify-center gap-2`}
//             >
//               <Check className="h-5 w-5" />
//               Process Sale
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Customer Modal */}
//       <CustomerModal
//         isOpen={isCustomerModalOpen}
//         onClose={() => setIsCustomerModalOpen(false)}
//         onComplete={handleProcessSale}
//       />
      
//       {/* Receipt Modal */}
//       {currentReceipt && (
//         <WhatsAppReceiptModal
//           isOpen={isReceiptModalOpen}
//           onClose={() => setIsReceiptModalOpen(false)}
//           receipt={currentReceipt}
//           onComplete={handleSaleComplete}
//         />
//       )}
//     </>
//   );
// }