import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordChangeForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleShow = () => setShowPassword(!showPassword);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1.5 md:col-span-2">
         <label className="text-sm font-medium text-slate-700">Current Password</label>
         <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
         </div>
      </div>
      
      <div className="space-y-1.5">
         <label className="text-sm font-medium text-slate-700">New Password</label>
         <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
         </div>
      </div>

      <div className="space-y-1.5">
         <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
         <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
               type="button" 
               onClick={toggleShow} 
               className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
         </div>
      </div>
    </div>
  );
};