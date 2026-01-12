import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { useTenant } from '../../hooks/useTenant';

interface AdminHeaderProps {
  title: string;
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onMenuClick }) => {
  const { tenant } = useTenant();

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-slate-600 hover:text-slate-900">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 hidden md:block">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm text-slate-600 w-48 placeholder:text-slate-400"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-900">{tenant?.name || 'Operator'}</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
            {tenant?.name?.charAt(0) || 'O'}
          </div>
        </div>
      </div>
    </header>
  );
};