import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { CreditCard, DollarSign } from 'lucide-react';

interface PaymentCardProps {
  totalAmount: number;
  deposit?: number;
  discount?: number;
  paymentStatus?: 'Paid' | 'Unpaid' | 'Partial';
  onUpdate: (data: { deposit: number; discount: number; paymentStatus: 'Paid' | 'Unpaid' | 'Partial' }) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ totalAmount, deposit = 0, discount = 0, paymentStatus = 'Unpaid', onUpdate }) => {
  const [localDiscount, setLocalDiscount] = useState(discount);
  const [localDeposit, setLocalDeposit] = useState(deposit);
  const [isEditing, setIsEditing] = useState(false);

  const finalTotal = Math.max(0, totalAmount - localDiscount);
  const remaining = Math.max(0, finalTotal - localDeposit);

  const handleSave = () => {
    onUpdate({
        discount: localDiscount,
        deposit: localDeposit,
        paymentStatus: remaining === 0 ? 'Paid' : (localDeposit > 0 ? 'Partial' : 'Unpaid')
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-base font-bold flex items-center gap-2">
            <CreditCard size={18} className="text-slate-400" /> Payment Details
        </CardTitle>
        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
            paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
            paymentStatus === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
        }`}>
            {paymentStatus}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium">${totalAmount}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Discount</span>
            {isEditing ? (
                <div className="flex items-center w-24">
                   <span className="text-slate-400 mr-1">-$</span>
                   <input 
                     type="number" 
                     className="w-full p-1 border rounded text-right text-sm"
                     value={localDiscount}
                     onChange={e => setLocalDiscount(Number(e.target.value))}
                   />
                </div>
            ) : (
                <span className="text-red-500">-${discount}</span>
            )}
        </div>

        <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-900">Total</span>
            <span className="font-bold text-lg text-slate-900">${finalTotal}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">Paid / Deposit</span>
            {isEditing ? (
                <div className="flex items-center w-24">
                   <span className="text-slate-400 mr-1">$</span>
                   <input 
                     type="number" 
                     className="w-full p-1 border rounded text-right text-sm"
                     value={localDeposit}
                     onChange={e => setLocalDeposit(Number(e.target.value))}
                   />
                </div>
            ) : (
                <span className="font-medium text-green-600">${deposit}</span>
            )}
        </div>

        <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
            <span className="text-slate-600">Remaining</span>
            <span className="font-bold text-slate-900">${remaining}</span>
        </div>

        <div className="pt-2">
            {isEditing ? (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button size="sm" className="flex-1" onClick={handleSave}>Save</Button>
                </div>
            ) : (
                <Button size="sm" variant="secondary" className="w-full" onClick={() => setIsEditing(true)}>
                    Edit Payment
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
};