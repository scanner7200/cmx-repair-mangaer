
import React, { useState, useEffect } from 'react';
import { 
  Users, Ticket as TicketIcon, FileText, Calendar, Settings, LayoutDashboard, 
  LogOut, Search, Smartphone
} from 'lucide-react';
import { storeInstance } from './store';
import { User } from './types';

import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import TicketsView from './components/TicketsView';
import InvoicesView from './components/InvoicesView';
import AppointmentsView from './components/AppointmentsView';
import DevicesView from './components/DevicesView';
import SettingsView from './components/SettingsView';
import LoginView from './components/LoginView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customers' | 'tickets' | 'invoices' | 'appointments' | 'devices' | 'settings'>('dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey(k => k + 1);

  useEffect(() => {
    const session = localStorage.getItem('CMX_SESSION');
    if (session) {
      const u = storeInstance.users.find(x => x.id === session);
      if (u) setCurrentUser(u);
    }
  }, []);

  if (!currentUser) return <LoginView onLogin={(u) => { storeInstance.setCurrentUser(u.id); setCurrentUser(u); }} />;

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'tickets', label: 'Workbench', icon: TicketIcon },
    { id: 'devices', label: 'Inventory', icon: Smartphone },
    { id: 'invoices', label: 'Billing', icon: FileText },
    { id: 'appointments', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-full bg-gray-50 overflow-hidden no-print">
      <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-xl">CMX</div>
          <div>
            <h1 className="font-black text-xs uppercase tracking-tighter leading-none">Computer</h1>
            <h1 className="font-bold text-[9px] text-gray-500 uppercase tracking-[0.2em]">Mechanix</h1>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                activeTab === item.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-center gap-3 mb-4 bg-gray-800/50 p-3 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-black text-xs">{currentUser.name[0]}</div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">{currentUser.name}</p>
              <p className="text-[9px] text-gray-500 uppercase font-black">{currentUser.role}</p>
            </div>
          </div>
          <button onClick={() => { storeInstance.setCurrentUser(null); setCurrentUser(null); }} className="w-full flex items-center gap-3 px-4 text-gray-500 hover:text-red-500 transition-colors font-bold text-xs uppercase tracking-widest">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-10 justify-between shrink-0">
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            <input type="text" placeholder="Quick search..." className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-xs outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-white transition-all" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          {activeTab === 'dashboard' && <DashboardView onAction={triggerRefresh} />}
          {activeTab === 'customers' && <CustomersView refreshTrigger={refreshKey} onUpdate={triggerRefresh} />}
          {activeTab === 'tickets' && <TicketsView refreshTrigger={refreshKey} onUpdate={triggerRefresh} />}
          {activeTab === 'devices' && <DevicesView refreshTrigger={refreshKey} onUpdate={triggerRefresh} />}
          {activeTab === 'invoices' && <InvoicesView refreshTrigger={refreshKey} onUpdate={triggerRefresh} />}
          {activeTab === 'appointments' && <AppointmentsView refreshTrigger={refreshKey} onUpdate={triggerRefresh} />}
          {activeTab === 'settings' && <SettingsView refreshTrigger={refreshKey} onUpdate={triggerRefresh} />}
        </div>
      </main>
    </div>
  );
};

export default App;
