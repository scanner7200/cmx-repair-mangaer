import { Customer, Device, Ticket, User, Invoice, Appointment } from './types';

export class Store {
  private static instance: Store;
  
  customers: Customer[] = [];
  devices: Device[] = [];
  tickets: Ticket[] = [];
  invoices: Invoice[] = [];
  appointments: Appointment[] = [];
  users: User[] = [];
  currentUser: User | null = null;
  
  isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  public static getInstance(): Store {
    if (!Store.instance) Store.instance = new Store();
    return Store.instance;
  }

  private init() {
    const savedData = localStorage.getItem('CMX_DATA');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.customers = data.customers || [];
        this.devices = data.devices || [];
        this.tickets = data.tickets || [];
        this.invoices = data.invoices || [];
        this.appointments = data.appointments || [];
        this.users = data.users || [];
      } catch (e) {
        console.error("Failed to parse local data", e);
      }
    }

    // Default Admin for new installs
    if (this.users.length === 0) {
      this.users = [{ 
        id: 'u1', 
        name: 'Shop Owner', 
        role: 'Admin', 
        email: 'admin@cmx.com', 
        password: '1234' 
      }];
      this.save();
    }
    
    this.isInitialized = true;
  }

  save() {
    const data = {
      customers: this.customers,
      devices: this.devices,
      tickets: this.tickets,
      invoices: this.invoices,
      appointments: this.appointments,
      users: this.users
    };
    localStorage.setItem('CMX_DATA', JSON.stringify(data));
    if (this.currentUser) localStorage.setItem('CMX_SESSION', this.currentUser.id);
    return data;
  }

  setCurrentUser(userId: string | null) {
    this.currentUser = userId ? this.users.find(u => u.id === userId) || null : null;
    if (!userId) localStorage.removeItem('CMX_SESSION');
    this.save();
  }

  addCustomer(c: Omit<Customer, 'id' | 'createdAt'>) {
    const n = { ...c, id: 'c-' + Date.now(), createdAt: new Date().toISOString() };
    this.customers.push(n);
    this.save();
    return n;
  }

  updateCustomer(id: string, updates: Partial<Customer>) {
    const i = this.customers.findIndex(c => c.id === id);
    if (i !== -1) { 
      this.customers[i] = { ...this.customers[i], ...updates }; 
      this.save(); 
    }
  }

  addTicket(t: Omit<Ticket, 'id' | 'ticketNumber' | 'logs' | 'createdAt' | 'updatedAt'>) {
    const num = this.tickets.length ? Math.max(...this.tickets.map(tk => tk.ticketNumber)) + 1 : 1001;
    const now = new Date().toISOString();
    const n: Ticket = { 
      ...t, 
      id: 't-' + Date.now(), 
      ticketNumber: num, 
      createdAt: now, 
      updatedAt: now,
      logs: [{ 
        id: 'l1', 
        timestamp: now, 
        userId: this.currentUser?.id || 'sys', 
        userName: this.currentUser?.name || 'System', 
        message: 'Checked In', 
        isInternal: true 
      }]
    };
    this.tickets.push(n);
    this.save();
    return n;
  }

  updateTicketStatus(id: string, status: Ticket['status'], msg: string) {
    const t = this.tickets.find(x => x.id === id);
    if (t) {
      t.status = status;
      t.updatedAt = new Date().toISOString();
      t.logs.push({ 
        id: 'l-'+Date.now(), 
        timestamp: t.updatedAt, 
        userId: this.currentUser?.id || 'sys', 
        userName: this.currentUser?.name || 'System', 
        message: msg, 
        isInternal: false 
      });
      this.save();
    }
  }

  addInvoice(inv: Omit<Invoice, 'id' | 'createdAt'>) {
    const n = { ...inv, id: 'i-' + Date.now(), createdAt: new Date().toISOString() };
    this.invoices.push(n);
    this.save();
    return n;
  }

  updateInvoice(id: string, updates: Partial<Invoice>) {
    const i = this.invoices.findIndex(x => x.id === id);
    if (i !== -1) { 
      this.invoices[i] = { ...this.invoices[i], ...updates }; 
      this.save();
    }
  }

  addAppointment(a: Omit<Appointment, 'id'>) {
    const n = { ...a, id: 'a-' + Date.now() };
    this.appointments.push(n);
    this.save();
    return n;
  }

  addDevice(d: Omit<Device, 'id'>) {
    const n = { ...d, id: 'd-' + Date.now() };
    this.devices.push(n);
    this.save();
    return n;
  }

  addUser(u: Omit<User, 'id'>) {
    const n = { ...u, id: 'u-' + Date.now() };
    this.users.push(n);
    this.save();
    return n;
  }

  updateUser(id: string, updates: Partial<User>) {
    const i = this.users.findIndex(u => u.id === id);
    if (i !== -1) { 
      this.users[i] = { ...this.users[i], ...updates }; 
      this.save();
    }
  }

  deleteUser(id: string) {
    this.users = this.users.filter(u => u.id !== id);
    this.save();
  }

  async importData(json: string) {
    try {
      const data = JSON.parse(json);
      this.customers = data.customers || [];
      this.devices = data.devices || [];
      this.tickets = data.tickets || [];
      this.invoices = data.invoices || [];
      this.appointments = data.appointments || [];
      this.users = data.users || [];
      this.save();
      return true;
    } catch (e) { 
      return false; 
    }
  }
}

export const storeInstance = Store.getInstance();