export enum VehicleType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  VAN = 'Van',
  LUXURY = 'Luxury',
  BUS = 'Bus'
}

export enum BookingStatus {
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

export interface Vehicle {
  id: string;
  operatorId: string; // 'me' or 'partner_1', etc.
  make: string;
  model: string;
  plate: string;
  type: VehicleType;
  imageUrl: string;
  photos?: string[]; // Optional array for multiple photos
  description: string;
}

export interface Booking {
  id: string;
  vehicleId: string;
  customerName: string;
  customerPhone: string;
  startDate: string; // ISO String
  endDate: string; // ISO String
  pickupLocation: string;
  dropLocation: string;
  status: BookingStatus;
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
}