import React, { useEffect, useState } from "react";
import { format, eachDayOfInterval, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import BookingDialog from "@/components/BookingDialog";
import BoardingCalendar from "@/components/BoardingCalendar";
import TimeBasedCalendar from "@/components/TimeBasedCalendar";

export default function BookingCalendar() {
  const [, setLocation] = useLocation();
  const [dateOffset, setDateOffset] = useState(0);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  
  // Service type tabs
  const [activeServiceTab, setActiveServiceTab] = useState<'boarding' | 'training' | 'walking'>('boarding');
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    kennelNumber: 0,
    checkInDate: "",
    checkOutDate: "",
    clientId: 0,
    dogIds: [] as number[],
    serviceType: "boarding",
    startTime: "09:00",
    endTime: "10:00",
    duration: 1,
    staffId: null as number | null,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: kennels = [], refetch: refetchKennels } = useQuery({ 
    queryKey: ["/api/kennels"],
  });

  const { data: bookings = [], refetch: refetchBookings } = useQuery({ 
    queryKey: ["/api/bookings"],
  });

  const { data: clients = [] } = useQuery({ 
    queryKey: ["/api/clients"],
  });

  const { data: dogs = [] } = useQuery({ 
    queryKey: ["/api/dogs"],
  });

  const { data: staff = [] } = useQuery({ 
    queryKey: ["/api/staff"],
  });

  const { data: servicePricing = [] } = useQuery({ 
    queryKey: ["/api/service-pricing"],
  });

  // Filter bookings by service type
  const filteredBookings = bookings.filter((booking: any) => booking.serviceType === activeServiceTab);

  // Calculate days for the calendar view
  const today = new Date();
  const baseDate = new Date(today);
  baseDate.setDate(baseDate.getDate() + (dateOffset * (viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 30)));

  let days: Date[] = [];
  if (viewMode === 'day') {
    days = [baseDate];
  } else if (viewMode === 'week') {
    const startOfWeek = new Date(baseDate);
    startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
    days = eachDayOfInterval({
      start: startOfWeek,
      end: new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000)
    });
  } else {
    const startOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    const endOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
    days = eachDayOfInterval({ start: startOfMonth, end: endOfMonth });
  }

  const handleCellClick = (kennelNumber: number, day: Date) => {
    const checkInDate = format(day, 'yyyy-MM-dd');
    const checkOutDate = format(new Date(day.getTime() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    
    setBookingData({
      kennelNumber,
      checkInDate,
      checkOutDate,
      clientId: 0,
      dogIds: [],
      serviceType: activeServiceTab,
      startTime: "09:00",
      endTime: "10:00", 
      duration: 1,
      staffId: null,
    });
    setIsDialogOpen(true);
  };

  const handleBookingCreated = () => {
    refetchBookings();
    refetchKennels();
    setIsDialogOpen(false);
    toast({
      title: "Success!",
      description: "Booking created successfully",
    });
  };

  const handleServiceTabClick = (service: 'boarding' | 'training' | 'walking') => {
    setActiveServiceTab(service);
  };

  const handleCreateBooking = () => {
    setBookingData({
      kennelNumber: 0,
      checkInDate: format(new Date(), 'yyyy-MM-dd'),
      checkOutDate: format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      clientId: 0,
      dogIds: [],
      serviceType: activeServiceTab,
      startTime: "09:00",
      endTime: "10:00",
      duration: 1,
      staffId: null,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">
              VIP Elite K9s - Booking Calendar
            </h1>
            <p className="text-gray-300">
              Manage your bookings across all services
            </p>
          </div>
          <Button 
            onClick={() => setLocation('/admin-dashboard')}
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            ← Back to Dashboard
          </Button>
        </div>

        {/* Service Type Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => handleServiceTabClick('boarding')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeServiceTab === 'boarding'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🏠 Boarding
          </Button>
          <Button
            onClick={() => handleServiceTabClick('training')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeServiceTab === 'training'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🎓 Training
          </Button>
          <Button
            onClick={() => handleServiceTabClick('walking')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeServiceTab === 'walking'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            🚶 Walking
          </Button>
        </div>

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-32 bg-black/60 border-yellow-400/30 text-yellow-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-yellow-400/30">
                <SelectItem value="day" className="text-yellow-400">Day</SelectItem>
                <SelectItem value="week" className="text-yellow-400">Week</SelectItem>
                <SelectItem value="month" className="text-yellow-400">Month</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setDateOffset(dateOffset - 1)}
                variant="outline"
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
              >
                ← Previous
              </Button>
              <Button 
                onClick={() => setDateOffset(0)}
                variant="outline"
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
              >
                Today
              </Button>
              <Button 
                onClick={() => setDateOffset(dateOffset + 1)}
                variant="outline"
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
              >
                Next →
              </Button>
            </div>
          </div>

          <Button 
            onClick={handleCreateBooking}
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-6 py-2"
          >
            ➕ Create {activeServiceTab.charAt(0).toUpperCase() + activeServiceTab.slice(1)} Booking
          </Button>
        </div>

        {/* Service-Specific Calendar Display */}
        <Card className="bg-black/80 backdrop-blur border-2 border-yellow-400">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-xl">
              {activeServiceTab === "boarding" 
                ? `${viewMode === 'day' ? 'Daily' : viewMode === 'week' ? '7-Day' : 'Monthly'} Kennel Booking Overview`
                : `${activeServiceTab.charAt(0).toUpperCase() + activeServiceTab.slice(1)} Schedule`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Enhanced Calendar Display Logic */}
            <div className="calendar">
              {activeServiceTab === "boarding" && (
                <BoardingCalendar 
                  bookings={filteredBookings} 
                  kennels={kennels as any[]}
                  days={days}
                  dogs={dogs as any[]}
                  onKennelClick={handleCellClick}
                />
              )}
              {(activeServiceTab === "training" || activeServiceTab === "walking") && (
                <TimeBasedCalendar
                  bookings={filteredBookings}
                  showStaff={true} // Show staff assignments for Training/Walking
                  dogs={dogs as any[]}
                  staff={staff as any[]}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Booking Dialog */}
        <BookingDialog 
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          serviceType={activeServiceTab}
          initialData={bookingData}
          onBookingCreated={handleBookingCreated}
        />
      </div>
    </div>
  );
}