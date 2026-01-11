
import { Customer, Device, Ticket, TicketStatus, TicketPriority, DeviceType, User, UserRole, Invoice } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@cmx.com', role: UserRole.ADMIN },
  { id: 'u2', name: 'John Tech', email: 'john@cmx.com', role: UserRole.TECHNICIAN },
  { id: 'u3', name: 'Sarah Front', email: 'sarah@cmx.com', role: UserRole.FRONT_DESK },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Alice Johnson',
    phone: '(555) 123-4567',
    email: 'alice.j@example.com',
    address: '123 Main St, Springfield',
    notes: 'Long-time customer, prefers calls over emails.',
    isClubCMX: true,
    memberSince: '2023-01-15',
    createdAt: '2023-01-10',
  },
  {
    id: 'c2',
    name: 'Robert Smith',
    phone: '(555) 987-6543',
    email: 'rob.smith@provider.com',
    address: '456 Oak Ave, Shelbyville',
    notes: 'Tends to bring in old vintage PCs.',
    isClubCMX: false,
    createdAt: '2023-05-20',
  }
];

export const MOCK_DEVICES: Device[] = [
  {
    id: 'd1',
    customerId: 'c1',
    type: DeviceType.LAPTOP,
    brand: 'Dell',
    model: 'XPS 15 9500',
    serialNumber: 'ABC-123-XYZ',
    os: 'Windows 11',
    password: 'password123',
    accessories: 'Charger, Mouse',
    notes: 'Battery seems to be swelling.',
  },
  {
    id: 'd2',
    customerId: 'c2',
    type: DeviceType.DESKTOP,
    brand: 'Custom Build',
    model: 'Gaming Rig',
    serialNumber: 'SN-GAMER-99',
    os: 'Windows 10',
    password: '',
    accessories: 'Power Cable',
    notes: 'BSOD on startup.',
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 't1',
    ticketNumber: 1001,
    customerId: 'c1',
    deviceId: 'd1',
    status: TicketStatus.IN_PROGRESS,
    priority: TicketPriority.HIGH,
    problemDescription: 'System freezing after 10 minutes of use. Fan making loud noise.',
    assignedTechId: 'u2',
    internalNotes: 'Fan appears clogged with dust. Possible thermal paste replacement needed.',
    customerNotes: 'We are looking into the thermal issues.',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-15T14:30:00Z',
    activityLog: [
      { id: 'a1', timestamp: '2024-05-15T10:00:00Z', user: 'Sarah Front', action: 'Created', details: 'Ticket opened' },
      { id: 'a2', timestamp: '2024-05-15T11:20:00Z', user: 'John Tech', action: 'Status Changed', details: 'Checked In -> Diagnosing' }
    ]
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'i1',
    ticketId: 't1',
    customerId: 'c1',
    status: 'Unpaid',
    items: [
      { id: 'li1', description: 'Standard Diagnostic', type: 'Labor', quantity: 1, unitPrice: 49.99, total: 49.99 },
      { id: 'li2', description: 'Thermal Paste Re-application', type: 'Labor', quantity: 1, unitPrice: 25.00, total: 25.00 }
    ],
    subtotal: 74.99,
    tax: 6.19,
    discount: 0,
    total: 81.18,
    createdAt: '2024-05-15T15:00:00Z'
  }
];
