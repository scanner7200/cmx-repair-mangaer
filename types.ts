
export type Role = 'Admin' | 'Technician' | 'Front Desk';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  password?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  tags: string[];
  membershipId?: string;
  createdAt: string;
}

export type DeviceType = 'Laptop' | 'Desktop' | 'Phone' | 'Tablet' | 'Console' | 'Other';

export interface Device {
  id: string;
  customerId: string;
  type: DeviceType;
  brand: string;
  model: string;
  serialNumber: string;
  os: string;
  password?: string;
  accessories: string;
  notes: string;
}

export type TicketStatus = 
  | 'Checked In' 
  | 'Diagnosing' 
  | 'Waiting for Approval' 
  | 'In Progress' 
  | 'Completed' 
  | 'Picked Up';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface TicketLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  message: string;
  isInternal: boolean;
}

export interface Ticket {
  id: string;
  ticketNumber: number;
  customerId: string;
  deviceId: string;
  problemDescription: string;
  technicianId?: string;
  status: TicketStatus;
  priority: Priority;
  internalNotes: string;
  customerNotes: string;
  logs: TicketLog[];
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  name: string;
  price: number;
  interval: 'Monthly' | 'Yearly';
  discountPercent: number;
  prioritySupport: boolean;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  type: 'Labor' | 'Part' | 'Flat Rate';
  isTaxable: boolean;
}

export interface Invoice {
  id: string;
  ticketId: string;
  customerId: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  isTaxEnabled?: boolean;
  discount: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Partially Paid' | 'Unpaid';
  amountPaid: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  ticketId?: string;
  title: string;
  date: string;
  time: string;
  notes: string;
}
