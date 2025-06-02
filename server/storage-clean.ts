import { 
  User, InsertUser, Staff, InsertStaff, Client, InsertClient, 
  Dog, InsertDog, Kennel, InsertKennel, Job, InsertJob,
  Booking, InsertBooking, DailyReport, InsertDailyReport,
  Invoice, InsertInvoice, TimeEntry, InsertTimeEntry,
  KennelLog, InsertKennelLog, ServicePricing, InsertServicePricing
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Staff
  getAllStaff(): Promise<Staff[]>;
  getStaff(id: number): Promise<Staff | undefined>;
  getStaffByPin(pin: string): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined>;

  // Clients
  getAllClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  getClientByEmail(email: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, updates: Partial<Client>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;

  // Dogs
  getAllDogs(): Promise<Dog[]>;
  getDog(id: number): Promise<Dog | undefined>;
  getDogsByClient(clientId: number): Promise<Dog[]>;
  createDog(dog: InsertDog): Promise<Dog>;
  updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined>;
  deleteDog(id: number): Promise<boolean>;

  // Kennels
  getAllKennels(): Promise<Kennel[]>;
  getKennel(id: number): Promise<Kennel | undefined>;
  getKennelByNumber(number: number): Promise<Kennel | undefined>;
  createKennel(kennel: InsertKennel): Promise<Kennel>;
  updateKennel(id: number, updates: Partial<Kennel>): Promise<Kennel | undefined>;

  // Jobs
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getJobsByStaff(staffId: number): Promise<Job[]>;
  getJobsByDate(date: string): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined>;

  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByClient(clientId: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;

  // Daily Reports
  getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined>;
  createDailyReport(report: InsertDailyReport): Promise<DailyReport>;
  updateDailyReport(id: number, updates: Partial<DailyReport>): Promise<DailyReport | undefined>;

  // Invoices
  getAllInvoices(): Promise<Invoice[]>;
  getInvoice(id: number): Promise<Invoice | undefined>;
  getInvoicesByClient(clientId: number): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: number): Promise<boolean>;

  // Estimates
  getAllEstimates(): Promise<any[]>;
  getEstimate(id: number): Promise<any | undefined>;
  createEstimate(estimate: any): Promise<any>;
  deleteEstimate(id: number): Promise<boolean>;

  // Time Entries
  getAllTimeEntries(): Promise<TimeEntry[]>;
  getTimeEntry(id: number): Promise<TimeEntry | undefined>;
  getTimeEntriesByStaff(staffId: number): Promise<TimeEntry[]>;
  getTimeEntriesByDate(date: string): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
  updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined>;

  // Kennel Logs
  getAllKennelLogs(): Promise<KennelLog[]>;
  getKennelLog(id: number): Promise<KennelLog | undefined>;
  getKennelLogsByKennel(kennelId: number): Promise<KennelLog[]>;
  getKennelLogsByDog(dogId: number): Promise<KennelLog[]>;
  getKennelLogsByStaff(staffId: number): Promise<KennelLog[]>;
  getKennelLogsByDate(date: string): Promise<KennelLog[]>;
  createKennelLog(kennelLog: InsertKennelLog): Promise<KennelLog>;
  updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined>;

  // Service Pricing
  getAllServicePricing(): Promise<ServicePricing[]>;
  getServicePricing(id: number): Promise<ServicePricing | undefined>;
  getServicePricingByType(serviceType: string): Promise<ServicePricing | undefined>;
  createServicePricing(pricing: InsertServicePricing): Promise<ServicePricing>;
  updateServicePricing(id: number, updates: Partial<ServicePricing>): Promise<ServicePricing | undefined>;
  deleteServicePricing(id: number): Promise<boolean>;
}

class CleanMemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private staff: Map<number, Staff> = new Map();
  private clients: Map<number, Client> = new Map();
  private dogs: Map<number, Dog> = new Map();
  private kennels: Map<number, Kennel> = new Map();
  private jobs: Map<number, Job> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private dailyReports: Map<number, DailyReport> = new Map();
  private invoices: Map<number, Invoice> = new Map();
  private timeEntries: Map<number, TimeEntry> = new Map();
  private kennelLogs: Map<number, KennelLog> = new Map();
  private servicePricing: Map<number, ServicePricing> = new Map();
  
  private currentId: number = 1;

  constructor() {
    // Only initialize admin user and staff - NO sample clients or dogs
    this.initializeAdmin();
    this.initializeServicePricing();
  }

  private initializeAdmin() {
    // Create admin user
    const adminUser: User = {
      id: this.currentId++,
      username: "admin",
      password: "admin123",
      role: "admin"
    };
    this.users.set(adminUser.id, adminUser);

    // Create sample staff members
    const staff1: Staff = {
      id: this.currentId++,
      name: "Emma Thompson",
      role: "Head Trainer",
      pin: "1234",
      profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      status: "clocked_out",
      clockInTime: null,
      breakStartTime: null,
      lastClockOut: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.staff.set(staff1.id, staff1);

    const staff2: Staff = {
      id: this.currentId++,
      name: "James Wilson",
      role: "Boarding Specialist",
      pin: "5678",
      profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      status: "clocked_out",
      clockInTime: null,
      breakStartTime: null,
      lastClockOut: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.staff.set(staff2.id, staff2);

    const staff3: Staff = {
      id: this.currentId++,
      name: "Sarah Chen",
      role: "Dog Walker",
      pin: "9012",
      profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
      status: "clocked_out",
      clockInTime: null,
      breakStartTime: null,
      lastClockOut: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.staff.set(staff3.id, staff3);

    // Initialize 20 empty kennels
    for (let i = 1; i <= 20; i++) {
      const kennel: Kennel = {
        id: this.currentId++,
        number: i,
        status: "available",
        dogId: null,
        checkInDate: null,
        checkOutDate: null,
        size: "medium",
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.kennels.set(kennel.id, kennel);
    }
  }

  private initializeServicePricing() {
    // Initialize default pricing for all VIP Elite K9s services
    const defaultPricing = [
      {
        serviceName: "Luxury Boarding",
        serviceType: "boarding",
        pricePerUnit: 5000, // £50.00 per night in pence
        unit: "per_night",
        description: "Premium overnight boarding with individual attention",
        isActive: true
      },
      {
        serviceName: "1-on-1 Training Session",
        serviceType: "training_1on1",
        pricePerUnit: 8000, // £80.00 per session in pence
        unit: "per_session",
        description: "Individual training session with expert trainer",
        isActive: true
      },
      {
        serviceName: "Group Training Class",
        serviceType: "training_group",
        pricePerUnit: 3500, // £35.00 per session in pence
        unit: "per_session",
        description: "Group training class with up to 6 dogs",
        isActive: true
      },
      {
        serviceName: "Professional Dog Walk",
        serviceType: "walking",
        pricePerUnit: 2500, // £25.00 per walk in pence
        unit: "per_walk",
        description: "Professional walking service with exercise report",
        isActive: true
      }
    ];

    defaultPricing.forEach(pricing => {
      const id = this.currentId++;
      const servicePricing: ServicePricing = {
        ...pricing,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.servicePricing.set(id, servicePricing);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Staff methods
  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values());
  }

  async getStaff(id: number): Promise<Staff | undefined> {
    return this.staff.get(id);
  }

  async getStaffByPin(pin: string): Promise<Staff | undefined> {
    return Array.from(this.staff.values()).find(staff => staff.pin === pin);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const id = this.currentId++;
    const staff: Staff = { 
      ...insertStaff, 
      id,
      status: "clocked_out",
      clockInTime: null,
      breakStartTime: null,
      lastClockOut: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.staff.set(id, staff);
    return staff;
  }

  async updateStaff(id: number, updates: Partial<Staff>): Promise<Staff | undefined> {
    const staff = this.staff.get(id);
    if (!staff) return undefined;
    
    const updatedStaff = { ...staff, ...updates, updatedAt: new Date() };
    this.staff.set(id, updatedStaff);
    return updatedStaff;
  }

  // Client methods
  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getClientByEmail(email: string): Promise<Client | undefined> {
    return Array.from(this.clients.values()).find(client => client.email === email);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentId++;
    const client: Client = { 
      ...insertClient, 
      id,
      phone: insertClient.phone || null,
      address: insertClient.address || null,
      emergencyContactName: insertClient.emergencyContactName || null,
      emergencyContactPhone: insertClient.emergencyContactPhone || null,
      emergencyContactRelationship: insertClient.emergencyContactRelationship || null,
      vetName: insertClient.vetName || null,
      vetPhone: insertClient.vetPhone || null,
      vetAddress: insertClient.vetAddress || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, updates: Partial<Client>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (client) {
      const updatedClient = { ...client, ...updates };
      this.clients.set(id, updatedClient);
      return updatedClient;
    }
    return undefined;
  }

  async deleteClient(id: number): Promise<boolean> {
    return this.clients.delete(id);
  }

  // Dog methods
  async getAllDogs(): Promise<Dog[]> {
    return Array.from(this.dogs.values());
  }

  async getDog(id: number): Promise<Dog | undefined> {
    return this.dogs.get(id);
  }

  async getDogsByClient(clientId: number): Promise<Dog[]> {
    return Array.from(this.dogs.values()).filter(dog => dog.clientId === clientId);
  }

  async createDog(insertDog: InsertDog): Promise<Dog> {
    const id = this.currentId++;
    const dog: Dog = { 
      ...insertDog, 
      id,
      age: insertDog.age || null,
      weight: insertDog.weight || null,
      photo: insertDog.photo || null,
      feedingInstructions: insertDog.feedingInstructions || null,
      exerciseRequirements: insertDog.exerciseRequirements || null,
      behaviorNotes: insertDog.behaviorNotes || null,
      allergies: insertDog.allergies || null,
      medication: insertDog.medication || null,
      specialNotes: insertDog.specialNotes || null,
      emergencyContact: insertDog.emergencyContact || null,
      weightUnit: insertDog.weightUnit || null,
      foodType: insertDog.foodType || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.dogs.set(id, dog);
    return dog;
  }

  async updateDog(id: number, updates: Partial<Dog>): Promise<Dog | undefined> {
    const dog = this.dogs.get(id);
    if (!dog) return undefined;
    
    const updatedDog = { ...dog, ...updates, updatedAt: new Date() };
    this.dogs.set(id, updatedDog);
    return updatedDog;
  }

  async deleteDog(id: number): Promise<boolean> {
    return this.dogs.delete(id);
  }

  // Kennel methods
  async getAllKennels(): Promise<Kennel[]> {
    return Array.from(this.kennels.values()).sort((a, b) => a.number - b.number);
  }

  async getKennel(id: number): Promise<Kennel | undefined> {
    return this.kennels.get(id);
  }

  async getKennelByNumber(number: number): Promise<Kennel | undefined> {
    return Array.from(this.kennels.values()).find(kennel => kennel.number === number);
  }

  async createKennel(insertKennel: InsertKennel): Promise<Kennel> {
    const id = this.currentId++;
    const kennel: Kennel = { 
      ...insertKennel, 
      id,
      status: "available",
      dogId: null,
      checkInDate: null,
      checkOutDate: null,
      size: insertKennel.size || "medium",
      notes: insertKennel.notes || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.kennels.set(id, kennel);
    return kennel;
  }

  async updateKennel(id: number, updates: Partial<Kennel>): Promise<Kennel | undefined> {
    const kennel = this.kennels.get(id);
    if (!kennel) return undefined;
    
    const updatedKennel = { ...kennel, ...updates, updatedAt: new Date() };
    this.kennels.set(id, updatedKennel);
    return updatedKennel;
  }

  // Job methods
  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsByStaff(staffId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.assignedStaffId === staffId);
  }

  async getJobsByDate(date: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => 
      job.scheduledDate.toISOString().split('T')[0] === date
    );
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentId++;
    const job: Job = { 
      ...insertJob, 
      id,
      status: "pending",
      dogId: insertJob.dogId || null,
      assignedStaffId: insertJob.assignedStaffId || null,
      kennelId: insertJob.kennelId || null,
      scheduledTime: insertJob.scheduledTime || null,
      notes: insertJob.notes || null,
      completedAt: null
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updates: Partial<Job>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updates };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  // Booking methods
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByClient(clientId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.clientId === clientId);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      status: "confirmed",
      notes: insertBooking.notes || null,
      endDate: insertBooking.endDate || null,
      duration: insertBooking.duration || null,
      totalAmount: insertBooking.totalAmount || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...updates };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Daily Report methods
  async getDailyReport(dogId: number, date: string): Promise<DailyReport | undefined> {
    return Array.from(this.dailyReports.values()).find(report => 
      report.dogId === dogId && report.date.toISOString().split('T')[0] === date
    );
  }

  async createDailyReport(insertReport: InsertDailyReport): Promise<DailyReport> {
    const id = this.currentId++;
    const report: DailyReport = { 
      ...insertReport, 
      id,
      createdAt: new Date(),
      behaviorNotes: insertReport.behaviorNotes || null,
      notes: insertReport.notes || null,
      activities: insertReport.activities || null,
      feeding: insertReport.feeding || null,
      exercise: insertReport.exercise || null,
      medications: insertReport.medications || null,
      staffNotes: insertReport.staffNotes || null,
      photos: insertReport.photos || null,
      overallWellbeing: insertReport.overallWellbeing || null,
      createdBy: insertReport.createdBy || null
    };
    this.dailyReports.set(id, report);
    return report;
  }

  async updateDailyReport(id: number, updates: Partial<DailyReport>): Promise<DailyReport | undefined> {
    const report = this.dailyReports.get(id);
    if (!report) return undefined;
    
    const updatedReport = { ...report, ...updates };
    this.dailyReports.set(id, updatedReport);
    return updatedReport;
  }

  // Invoice methods
  async getAllInvoices(): Promise<Invoice[]> {
    return Array.from(this.invoices.values());
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    return this.invoices.get(id);
  }

  async getInvoicesByClient(clientId: number): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(invoice => invoice.clientId === clientId);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = this.currentId++;
    const invoice: Invoice = { 
      ...insertInvoice, 
      id,
      estimateId: insertInvoice.estimateId || null,
      discountAmount: insertInvoice.discountAmount || 0,
      discountReason: insertInvoice.discountReason || null,
      paymentStatus: insertInvoice.paymentStatus || "unpaid",
      paymentDate: insertInvoice.paymentDate || null,
      paymentMethod: insertInvoice.paymentMethod || null,
      description: insertInvoice.description || null,
      bookingId: insertInvoice.bookingId || null,
      services: insertInvoice.services || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: number, updates: Partial<Invoice>): Promise<Invoice | undefined> {
    const invoice = this.invoices.get(id);
    if (!invoice) return undefined;
    
    const updatedInvoice = { ...invoice, ...updates, updatedAt: new Date() };
    this.invoices.set(id, updatedInvoice);
    return updatedInvoice;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    return this.invoices.delete(id);
  }

  // Time Entry methods
  async getAllTimeEntries(): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values());
  }

  async getTimeEntry(id: number): Promise<TimeEntry | undefined> {
    return this.timeEntries.get(id);
  }

  async getTimeEntriesByStaff(staffId: number): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values()).filter(entry => entry.staffId === staffId);
  }

  async getTimeEntriesByDate(date: string): Promise<TimeEntry[]> {
    return Array.from(this.timeEntries.values()).filter(entry => 
      entry.clockIn.toISOString().split('T')[0] === date
    );
  }

  async createTimeEntry(insertTimeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const id = this.currentId++;
    const timeEntry: TimeEntry = { 
      ...insertTimeEntry, 
      id,
      clockOut: insertTimeEntry.clockOut || null,
      breakStart: insertTimeEntry.breakStart || null,
      breakEnd: insertTimeEntry.breakEnd || null,
      totalHours: insertTimeEntry.totalHours || null,
      notes: insertTimeEntry.notes || null
    };
    this.timeEntries.set(id, timeEntry);
    return timeEntry;
  }

  async updateTimeEntry(id: number, updates: Partial<TimeEntry>): Promise<TimeEntry | undefined> {
    const timeEntry = this.timeEntries.get(id);
    if (!timeEntry) return undefined;
    
    const updatedTimeEntry = { ...timeEntry, ...updates };
    this.timeEntries.set(id, updatedTimeEntry);
    return updatedTimeEntry;
  }

  // Kennel Log methods
  async getAllKennelLogs(): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values());
  }

  async getKennelLog(id: number): Promise<KennelLog | undefined> {
    return this.kennelLogs.get(id);
  }

  async getKennelLogsByKennel(kennelId: number): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => log.kennelId === kennelId);
  }

  async getKennelLogsByDog(dogId: number): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => log.dogId === dogId);
  }

  async getKennelLogsByStaff(staffId: number): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => log.staffId === staffId);
  }

  async getKennelLogsByDate(date: string): Promise<KennelLog[]> {
    return Array.from(this.kennelLogs.values()).filter(log => 
      log.timestamp && log.timestamp.toISOString().split('T')[0] === date
    );
  }

  async createKennelLog(insertKennelLog: InsertKennelLog): Promise<KennelLog> {
    const id = this.currentId++;
    const kennelLog: KennelLog = { 
      ...insertKennelLog, 
      id,
      dogId: insertKennelLog.dogId || null,
      scheduledTime: insertKennelLog.scheduledTime || null,
      notes: insertKennelLog.notes || null,
      completed: insertKennelLog.completed ?? false,
      timestamp: insertKennelLog.timestamp || new Date()
    };
    this.kennelLogs.set(id, kennelLog);
    return kennelLog;
  }

  async updateKennelLog(id: number, updates: Partial<KennelLog>): Promise<KennelLog | undefined> {
    const kennelLog = this.kennelLogs.get(id);
    if (!kennelLog) return undefined;
    
    const updatedKennelLog = { ...kennelLog, ...updates };
    this.kennelLogs.set(id, updatedKennelLog);
    return updatedKennelLog;
  }

  // Service Pricing methods
  async getAllServicePricing(): Promise<ServicePricing[]> {
    return Array.from(this.servicePricing.values()).filter(pricing => pricing.isActive);
  }

  async getServicePricing(id: number): Promise<ServicePricing | undefined> {
    return this.servicePricing.get(id);
  }

  async getServicePricingByType(serviceType: string): Promise<ServicePricing | undefined> {
    return Array.from(this.servicePricing.values()).find(
      pricing => pricing.serviceType === serviceType && pricing.isActive
    );
  }

  async createServicePricing(insertPricing: InsertServicePricing): Promise<ServicePricing> {
    const id = this.currentId++;
    const pricing: ServicePricing = { 
      ...insertPricing, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.servicePricing.set(id, pricing);
    return pricing;
  }

  async updateServicePricing(id: number, updates: Partial<ServicePricing>): Promise<ServicePricing | undefined> {
    const pricing = this.servicePricing.get(id);
    if (!pricing) return undefined;
    
    const updatedPricing = { ...pricing, ...updates, updatedAt: new Date() };
    this.servicePricing.set(id, updatedPricing);
    return updatedPricing;
  }

  async deleteServicePricing(id: number): Promise<boolean> {
    const pricing = this.servicePricing.get(id);
    if (!pricing) return false;
    
    // Soft delete by setting isActive to false
    const updatedPricing = { ...pricing, isActive: false, updatedAt: new Date() };
    this.servicePricing.set(id, updatedPricing);
    return true;
  }
}

// Create and export the clean storage instance
export const storage = new CleanMemStorage();