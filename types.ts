export enum VehicleType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  VAN = 'Van',
  LUXURY = 'Luxury',
  BUS = 'Bus'
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export enum RequestStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected'
}

export enum VehicleStatus {
  ACTIVE = 'Active',
  MAINTENANCE = 'Maintenance',
  INACTIVE = 'Inactive'
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  primaryColor: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  isVerified: boolean;
  documents?: string[];
  address?: string;
}

export interface Vehicle {
  id: string;
  operatorId: string;
  make: string;
  model: string;
  year?: number;
  plate: string;
  type: VehicleType;
  status?: VehicleStatus;
  imageUrl: string;
  photos?: string[];
  description: string;
  dailyRate?: number;
  features?: string[];
  seats?: number;
  transmission?: 'Automatic' | 'Manual';
  fuelType?: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
}

export interface Booking {
  id: string;
  vehicleId: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  startDate: string; // ISO Date String YYYY-MM-DD
  endDate: string;   // ISO Date String YYYY-MM-DD
  pickupLocation: string;
  dropLocation: string;
  pickupTime?: string;
  status: BookingStatus;
  totalAmount?: number;
  createdAt?: string;
  specialRequests?: string;
  paymentStatus?: 'Paid' | 'Unpaid' | 'Partial';
  source?: 'Website' | 'Phone' | 'Walk-in';
  deposit?: number;
  discount?: number;
  notes?: string;
}

export interface VehicleRequest {
  id: string;
  vehicleId: string;
  requestingOperatorName: string;
  startDate: string;
  endDate: string;
  status: RequestStatus;
  message?: string;
}

export interface Operator {
  id: string;
  name: string;
  company: string;
  email: string;
}