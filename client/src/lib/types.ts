export interface DashboardStats {
  staffOnDuty: number;
  dogsBoarding: number;
  todaysJobs: number;
  revenue: string;
}

export interface KennelWithDog {
  id: number;
  number: number;
  status: "occupied" | "available" | "cleaning";
  dogId?: number;
  dog?: {
    id: number;
    name: string;
    breed: string;
    photo?: string;
  };
  checkInDate?: string;
  checkOutDate?: string;
}

export interface JobWithDetails {
  id: number;
  type: string;
  description: string;
  assignedStaffId?: number;
  dogId?: number;
  kennelId?: number;
  scheduledDate: string;
  scheduledTime?: string;
  status: "pending" | "in_progress" | "completed";
  notes?: string;
  completedAt?: string;
}

export interface StaffStatus {
  id: number;
  name: string;
  role: string;
  status: "clocked_in" | "on_break" | "clocked_out";
  clockInTime?: string;
  breakStartTime?: string;
  lastClockOut?: string;
}
