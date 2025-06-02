import React, { useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, MapPin, Clock } from "lucide-react";

export default function ServiceCalendars() {
  const [dateOffset, setDateOffset] = useState(0);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [activeService, setActiveService] = useState('boarding');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState({
    serviceType: 'boarding',
    date: '',
    resourceId: 0, // kennel, trainer, or walker ID
    clientId: 0,
    dogIds: [] as number[],
    startTime: '',
    endTime: '',
    duration: 1 // for training sessions or walks
  });

  const { data: kennels = [] } = useQuery({ 
    queryKey: ["/api/kennels"],
    refetchInterval: 5000
  });
  const { data: staff = [] } = useQuery({ 
    queryKey: ["/api/staff"]
  });
  const { data: dogs = [] } = useQuery({ 
    queryKey: ["/api/dogs"]
  });
  const { data: clients = [] } = useQuery({ 
    queryKey: ["/api/clients"]
  });
  const { data: bookings = [] } = useQuery({ 
    queryKey: ["/api/bookings"],
    refetchInterval: 5000
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Calculate date range based on view mode
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + dateOffset);
  
  let days;
  if (viewMode === 'day') {
    days = [startDate];
  } else if (viewMode === 'week') {
    days = eachDayOfInterval({
      start: startDate,
      end: new Date(startDate.getTime() + 6 * 86400000),
    });
  } else { // month
    const monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const monthEnd = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  }

  // Filter bookings by service type
  const getServiceBookings = (serviceType: string) => {
    return (bookings as any[]).filter((booking: any) => 
      booking.serviceType === serviceType && booking.status !== 'cancelled'
    );
  };

  // Get available resources for each service
  const getServiceResources = (serviceType: string) => {
    switch (serviceType) {
      case 'boarding':
        return kennels.map((kennel: any) => ({
          id: kennel.id,
          name: `Kennel #${kennel.number}`,
          type: 'kennel'
        }));
      case 'training':
        return (staff as any[])
          .filter((s: any) => s.role.toLowerCase().includes('trainer') || s.role.toLowerCase().includes('head'))
          .map((trainer: any) => ({
            id: trainer.id,
            name: trainer.name,
            type: 'trainer'
          }));
      case 'walking':
        return (staff as any[])
          .filter((s: any) => s.role.toLowerCase().includes('walker') || s.role.toLowerCase().includes('trainer'))
          .map((walker: any) => ({
            id: walker.id,
            name: walker.name,
            type: 'walker'
          }));
      default:
        return [];
    }
  };

  // Booking creation mutation
  const createBookingMutation = useMutation({
    mutationFn: (bookingData: any) => apiRequest("POST", "/api/bookings", bookingData),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Booking created successfully with automatic estimate",
      });
      setShowBookingDialog(false);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
      queryClient.invalidateQueries({ queryKey: ["/api/estimates"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
    },
  });

  // Handle resource click for booking
  const handleResourceClick = (resourceId: number, date: Date, serviceType: string) => {
    setSelectedBookingData({
      serviceType,
      date: date.toISOString().split('T')[0],
      resourceId,
      clientId: 0,
      dogIds: [],
      startTime: serviceType === 'boarding' ? '' : '09:00',
      endTime: serviceType === 'boarding' ? '' : '10:00',
      duration: serviceType === 'training' ? 1 : serviceType === 'walking' ? 0.5 : 1
    });
    setShowBookingDialog(true);
  };

  // Submit booking
  const handleSubmitBooking = () => {
    const bookingData: any = {
      clientId: selectedBookingData.clientId,
      dogId: selectedBookingData.dogIds[0], // For now, single dog
      serviceType: selectedBookingData.serviceType,
      status: 'confirmed'
    };

    if (selectedBookingData.serviceType === 'boarding') {
      bookingData.startDate = selectedBookingData.date;
      bookingData.endDate = selectedBookingData.date; // Will be extended by user
      bookingData.kennelNumber = getServiceResources('boarding').find(r => r.id === selectedBookingData.resourceId)?.name?.split('#')[1];
    } else {
      bookingData.startDate = selectedBookingData.date;
      bookingData.endDate = selectedBookingData.date;
      bookingData.staffId = selectedBookingData.resourceId;
      bookingData.duration = selectedBookingData.duration;
    }

    createBookingMutation.mutate(bookingData);
  };

  // Render service-specific calendar
  const renderServiceCalendar = (serviceType: string) => {
    const resources = getServiceResources(serviceType);
    const serviceBookings = getServiceBookings(serviceType);

    return (
      <div className="space-y-4">
        {/* Service Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {serviceType === 'boarding' && <MapPin className="h-5 w-5 text-yellow-400" />}
            {serviceType === 'training' && <Users className="h-5 w-5 text-blue-400" />}
            {serviceType === 'walking' && <Clock className="h-5 w-5 text-green-400" />}
            <h3 className="text-xl font-bold text-yellow-400 capitalize">
              {serviceType} Calendar
            </h3>
          </div>
          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
            {serviceBookings.length} Active Bookings
          </Badge>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-yellow-400/30 p-3 bg-yellow-400/10 text-yellow-400 font-bold">
                  {serviceType === 'boarding' ? 'Kennel' : serviceType === 'training' ? 'Trainer' : 'Walker'}
                </th>
                {days.map((day) => (
                  <th key={day.toISOString()} className="border border-yellow-400/30 p-3 bg-yellow-400/10 text-yellow-400 font-bold min-w-[120px]">
                    {format(day, "MMM d")}
                    <br />
                    <span className="text-xs text-gray-300">{format(day, "EEE")}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map((resource: any) => (
                <tr key={resource.id} className="hover:bg-yellow-400/5">
                  <td className="border border-yellow-400/30 p-3 text-center font-semibold text-yellow-300 bg-black/60">
                    {resource.name}
                  </td>
                  {days.map((day) => {
                    // Find bookings for this resource on this day
                    const dayBookings = serviceBookings.filter((booking: any) => {
                      const bookingDate = new Date(booking.startDate);
                      const dayMidnight = new Date(day);
                      dayMidnight.setHours(0, 0, 0, 0);
                      bookingDate.setHours(0, 0, 0, 0);
                      
                      if (serviceType === 'boarding') {
                        const endDate = new Date(booking.endDate);
                        endDate.setHours(0, 0, 0, 0);
                        return bookingDate <= dayMidnight && dayMidnight <= endDate &&
                               booking.kennelNumber == resource.name.split('#')[1];
                      } else {
                        return bookingDate.getTime() === dayMidnight.getTime() &&
                               booking.staffId === resource.id;
                      }
                    });

                    const isOccupied = dayBookings.length > 0;
                    const isToday = day.toDateString() === new Date().toDateString();

                    return (
                      <td
                        key={day.toISOString()}
                        className={`border border-yellow-400/30 p-2 text-center cursor-pointer transition-colors ${
                          isOccupied 
                            ? 'bg-red-500/20 text-red-300' 
                            : isToday 
                            ? 'bg-yellow-400/10 hover:bg-yellow-400/20' 
                            : 'hover:bg-green-500/10'
                        }`}
                        onClick={() => !isOccupied && handleResourceClick(resource.id, day, serviceType)}
                      >
                        {isOccupied ? (
                          <div className="space-y-1">
                            {dayBookings.map((booking: any) => {
                              const dog = dogs.find((d: any) => d.id === booking.dogId);
                              const client = clients.find((c: any) => c.id === booking.clientId);
                              return (
                                <div key={booking.id} className="text-xs">
                                  <div className="font-bold">{dog?.name || 'Unknown'}</div>
                                  <div className="text-gray-400">{client?.name || 'Unknown'}</div>
                                  {serviceType !== 'boarding' && booking.duration && (
                                    <div className="text-yellow-400">{booking.duration}h</div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-xs">Available</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/30 text-white">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text">
            VIP Elite K9s - Service Calendars
          </h1>
        </div>

        {/* View Mode Controls */}
        <div className="flex justify-center items-center space-x-4">
          <div className="bg-black/40 rounded-lg p-1 border border-yellow-400/30">
            {(['day', 'week', 'month'] as const).map((mode) => (
              <Button
                key={mode}
                onClick={() => {
                  setViewMode(mode);
                  setDateOffset(0);
                }}
                className={`mx-1 px-4 py-2 font-semibold capitalize ${
                  viewMode === mode
                    ? 'bg-yellow-600 text-black'
                    : 'bg-transparent text-yellow-400 hover:bg-yellow-600/20'
                }`}
              >
                {mode}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => {
              if (viewMode === 'day') setDateOffset(dateOffset - 1);
              else if (viewMode === 'week') setDateOffset(dateOffset - 7);
              else setDateOffset(dateOffset - 30);
            }}
            className="bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 border border-yellow-400/50"
          >
            ← Previous
          </Button>
          
          <Button
            onClick={() => setDateOffset(0)}
            className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
          >
            Today
          </Button>
          
          <Button
            onClick={() => {
              if (viewMode === 'day') setDateOffset(dateOffset + 1);
              else if (viewMode === 'week') setDateOffset(dateOffset + 7);
              else setDateOffset(dateOffset + 30);
            }}
            className="bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-400 border border-yellow-400/50"
          >
            Next →
          </Button>
        </div>

        {/* Service Tabs */}
        <Card className="bg-black/80 backdrop-blur border-2 border-yellow-400">
          <CardContent className="p-6">
            <Tabs value={activeService} onValueChange={setActiveService}>
              <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-yellow-400/30">
                <TabsTrigger 
                  value="boarding" 
                  className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black"
                >
                  🏠 Boarding
                </TabsTrigger>
                <TabsTrigger 
                  value="training" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  🎓 Training
                </TabsTrigger>
                <TabsTrigger 
                  value="walking" 
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  🚶 Walking
                </TabsTrigger>
              </TabsList>

              <TabsContent value="boarding" className="mt-6">
                {renderServiceCalendar('boarding')}
              </TabsContent>

              <TabsContent value="training" className="mt-6">
                {renderServiceCalendar('training')}
              </TabsContent>

              <TabsContent value="walking" className="mt-6">
                {renderServiceCalendar('walking')}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent className="bg-black/90 border-yellow-400 text-white">
            <DialogHeader>
              <DialogTitle className="text-yellow-400">
                Book {selectedBookingData.serviceType} Service
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Client</Label>
                <Select 
                  value={selectedBookingData.clientId.toString()} 
                  onValueChange={(value) => setSelectedBookingData(prev => ({
                    ...prev, 
                    clientId: parseInt(value)
                  }))}
                >
                  <SelectTrigger className="bg-black/60 border-yellow-400/50 text-white">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-yellow-400">
                    {clients.map((client: any) => (
                      <SelectItem key={client.id} value={client.id.toString()}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dog</Label>
                <Select 
                  value={selectedBookingData.dogIds[0]?.toString() || ''} 
                  onValueChange={(value) => setSelectedBookingData(prev => ({
                    ...prev, 
                    dogIds: [parseInt(value)]
                  }))}
                >
                  <SelectTrigger className="bg-black/60 border-yellow-400/50 text-white">
                    <SelectValue placeholder="Select dog" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-yellow-400">
                    {dogs
                      .filter((dog: any) => dog.clientId === selectedBookingData.clientId)
                      .map((dog: any) => (
                        <SelectItem key={dog.id} value={dog.id.toString()}>
                          {dog.name} ({dog.breed})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedBookingData.serviceType !== 'boarding' && (
                <div>
                  <Label>Duration (hours)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={selectedBookingData.duration}
                    onChange={(e) => setSelectedBookingData(prev => ({
                      ...prev,
                      duration: parseFloat(e.target.value)
                    }))}
                    className="bg-black/60 border-yellow-400/50 text-white"
                  />
                </div>
              )}

              <Button 
                onClick={handleSubmitBooking}
                disabled={!selectedBookingData.clientId || selectedBookingData.dogIds.length === 0}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
              >
                Create Booking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}