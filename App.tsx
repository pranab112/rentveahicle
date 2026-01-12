import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  CalendarDays, 
  Store, 
  ClipboardList, 
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { FleetManager } from './components/FleetManager';
import { BookingLog } from './components/BookingLog';
import { Marketplace } from './components/Marketplace';
import { RequestCenter } from './components/RequestCenter';
import { CalendarView } from './components/CalendarView';
import { Vehicle, Booking, VehicleRequest, RequestStatus, BookingStatus, VehicleType } from './types';
import { analyzeFleetAvailability } from './services/geminiService';

// MOCK DATA INITIALIZATION
const MOCK_MY_VEHICLES: Vehicle[] = [
  { id: '1', operatorId: 'me', make: 'Toyota', model: 'HiAce', plate: 'ABC-1234', type: VehicleType.VAN, imageUrl: 'https://picsum.photos/400/300?random=1', description: 'Reliable 14-seater van, perfect for group tours.' },
  { id: '2', operatorId: 'me', make: 'Hyundai', model: 'Accent', plate: 'XYZ-9876', type: VehicleType.SEDAN, imageUrl: 'https://picsum.photos/400/300?random=2', description: 'Fuel efficient sedan for city transfers.' },
];

const MOCK_PARTNER_VEHICLES: Vehicle[] = [
  { id: 'p1', operatorId: 'partner_1', make: 'Ford', model: 'Transit', plate: 'PRT-111', type: VehicleType.VAN, imageUrl: 'https://picsum.photos/400/300?random=3', description: 'Partner vehicle: High roof spacious van.' },
  { id: 'p2', operatorId: 'partner_2', make: 'Mercedes', model: 'Sprinter', plate: 'LUX-222', type: VehicleType.LUXURY, imageUrl: 'https://picsum.photos/400/300?random=4', description: 'Luxury transport for VIP clients.' },
];

const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', vehicleId: '1', customerName: 'John Doe', customerPhone: '555-0101', startDate: '2024-05-20', endDate: '2024-05-22', pickupLocation: 'Airport', dropLocation: 'Hotel', status: BookingStatus.CONFIRMED },
];

const App: React.FC = () => {
  // STATE
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [myVehicles, setMyVehicles] = useState<Vehicle[]>(MOCK_MY_VEHICLES);
  const [partnerVehicles] = useState<Vehicle[]>(MOCK_PARTNER_VEHICLES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [incomingRequests, setIncomingRequests] = useState<VehicleRequest[]>([
    { id: 'r1', vehicleId: '1', requestingOperatorName: 'City Transport Co.', startDate: '2024-06-01', endDate: '2024-06-02', status: RequestStatus.PENDING }
  ]);
  const [outgoingRequests, setOutgoingRequests] = useState<VehicleRequest[]>([]);
  const [aiInsight, setAiInsight] = useState<string>('');

  // HANDLERS
  const handleAddVehicle = (v: Vehicle) => setMyVehicles([...myVehicles, v]);
  const handleRemoveVehicle = (id: string) => setMyVehicles(myVehicles.filter(v => v.id !== id));
  
  const handleAddBooking = (b: Booking) => setBookings([...bookings, b]);
  const handleUpdateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleRequestVehicle = (vehicleId: string, vehicleDetails: string) => {
    const newReq: VehicleRequest = {
      id: Date.now().toString(),
      vehicleId: vehicleDetails,
      requestingOperatorName: 'Me',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: RequestStatus.PENDING
    };
    setOutgoingRequests([...outgoingRequests, newReq]);
    alert('Request sent to partner!');
  };

  const handleIncomingRequest = (id: string, action: 'accept' | 'reject') => {
    setIncomingRequests(incomingRequests.map(r => 
      r.id === id ? { ...r, status: action === 'accept' ? RequestStatus.ACCEPTED : RequestStatus.REJECTED } : r
    ));
  };

  const runAiAnalysis = async () => {
    setAiInsight("Analyzing fleet status...");
    const today = new Date().toISOString().split('T')[0];
    const result = await analyzeFleetAvailability(myVehicles, today);
    setAiInsight(result);
  };

  // NAVIGATION ITEMS
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'My Fleet', icon: Truck },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'marketplace', label: 'Partner Network', icon: Store },
    { id: 'bookings', label: 'Bookings', icon: ClipboardList },
    { id: 'requests', label: 'Requests', icon: Bell, badge: incomingRequests.filter(r => r.status === RequestStatus.PENDING).length },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">FleetLink</h1>
          <p className="text-xs text-slate-500 mt-1">Shared Inventory System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                {item.label}
              </div>
              {item.badge ? (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl">
             <p className="text-xs font-semibold text-slate-500 uppercase mb-2">AI Assistant</p>
             <p className="text-xs text-slate-600 mb-3 italic">{aiInsight || "Ready to analyze."}</p>
             <button onClick={runAiAnalysis} className="w-full bg-white border border-slate-200 text-slate-700 text-xs py-2 rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1">
               <Search size={12} /> Analyze Fleet
             </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-30 px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-indigo-600">FleetLink</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 pt-16 px-4 md:hidden">
          <nav className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  activeTab === item.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-xs font-medium uppercase">Total Fleet</p>
                 <p className="text-3xl font-bold text-slate-800 mt-2">{myVehicles.length}</p>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-xs font-medium uppercase">Active Bookings</p>
                 <p className="text-3xl font-bold text-slate-800 mt-2">{bookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.ONGOING).length}</p>
               </div>
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-xs font-medium uppercase">Pending Req</p>
                 <p className="text-3xl font-bold text-slate-800 mt-2">{incomingRequests.filter(r => r.status === RequestStatus.PENDING).length}</p>
               </div>
               <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 rounded-xl shadow-lg text-white">
                 <p className="text-indigo-100 text-xs font-medium uppercase">Partner Network</p>
                 <p className="text-3xl font-bold mt-2">{partnerVehicles.length} <span className="text-sm font-normal opacity-80">Vehicles Available</span></p>
               </div>
            </div>
            
            <CalendarView vehicles={myVehicles} bookings={bookings} />
          </div>
        )}

        {activeTab === 'fleet' && (
          <FleetManager 
            vehicles={myVehicles} 
            onAddVehicle={handleAddVehicle} 
            onRemoveVehicle={handleRemoveVehicle} 
          />
        )}

        {activeTab === 'bookings' && (
          <BookingLog 
            bookings={bookings} 
            vehicles={myVehicles} 
            onUpdateStatus={handleUpdateBookingStatus}
            onAddBooking={handleAddBooking}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace 
            partnerVehicles={partnerVehicles} 
            onRequestVehicle={handleRequestVehicle} 
          />
        )}

        {activeTab === 'requests' && (
          <RequestCenter 
            incomingRequests={incomingRequests} 
            outgoingRequests={outgoingRequests} 
            onHandleRequest={handleIncomingRequest} 
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView vehicles={myVehicles} bookings={bookings} />
        )}
      </main>
    </div>
  );
};

export default App;