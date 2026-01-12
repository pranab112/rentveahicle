import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  CalendarDays, 
  Store, 
  ClipboardList, 
  Bell,
  Settings,
  Users,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTenant } from '../../hooks/useTenant';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { tenant } = useTenant();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/fleet', label: 'Vehicles', icon: Truck },
    { href: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/calendar', label: 'Calendar', icon: CalendarDays },
    { href: '/admin/marketplace', label: 'Partner Network', icon: Store },
    { href: '/admin/requests', label: 'Requests', icon: Bell },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col",
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center h-16">
          <Link to="/admin" className="flex items-center gap-2" onClick={onClose}>
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
              <Truck className="text-white h-5 w-5" />
            </div>
            <div className="overflow-hidden">
              <h1 className="text-lg font-bold text-slate-900 leading-tight truncate">FleetLink</h1>
              <p className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-wider">{tenant?.name || 'Operator'}</p>
            </div>
          </Link>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href || (pathname !== '/admin' && pathname.startsWith(item.href) && item.href !== '/admin');
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all",
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon size={18} className={cn(isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
             <LogOut size={18} />
             Logout
           </Link>
        </div>
      </aside>
    </>
  );
};