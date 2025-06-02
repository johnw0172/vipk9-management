import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  serviceType: 'boarding' | 'training' | 'walking';
  initialData?: any;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ open, onClose, serviceType, initialData }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [bookingData, setBookingData] = useState({
    clientId: initialData?.clientId || 0,
    dogIds: initialData?.dogIds || [],
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    startTime: initialData?.startTime || "09:00",
    endTime: initialData?.endTime || "10:00",
    duration: initialData?.duration || 1,
    kennelNumber: serviceType === "boarding" ? initialData?.kennelNumber || 0 : null,
    staffId: initialData?.staffId || null,
    notes: initialData?.notes || "",
    serviceType,
    trainingType: initialData?.trainingType || "1-on-1", // Default to 1-on-1 training
  });

  const { data: clients } = useQuery({ 
    queryKey: ["/api/clients"],
    refetchOnWindowFocus: true
  });
  
  const { data: dogs } = useQuery({ 
    queryKey: ["/api/dogs"],
    refetchOnWindowFocus: true
  });

  const { data: staff } = useQuery({ 
    queryKey: ["/api/staff"],
    refetchOnWindowFocus: true
  });

  const createBookingMutation = useMutation({
    mutationFn: (newBooking: any) => apiRequest("POST", "/api/bookings", newBooking),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/estimates"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
      
      toast({
        title: "Booking Created!",
        description: `${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} booking has been successfully created.`,
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
    }
  });

  const handleSave = () => {
    if (!bookingData.clientId || bookingData.dogIds.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select a client and at least one dog.",
        variant: "destructive",
      });
      return;
    }

    // Prepare booking data based on service type
    const bookingPayload = {
      ...bookingData,
      serviceType: serviceType, // ✅ Explicitly set the service type
      trainingType: bookingData.trainingType, // ✅ Explicitly pass the trainingType field
      dogId: bookingData.dogIds[0], // Use first dog for compatibility
      startDate: new Date(bookingData.startDate),
      endDate: serviceType === 'boarding' ? new Date(bookingData.endDate) : new Date(bookingData.startDate),
    };

    createBookingMutation.mutate(bookingPayload);
  };

  // Filter dogs by selected client
  const clientDogs = dogs?.filter((dog: any) => dog.clientId === bookingData.clientId) || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 backdrop-blur border-2 border-yellow-400 text-yellow-400 max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-yellow-400 text-xl font-bold">
            {serviceType === "boarding" ? "🏠 Boarding Booking" : 
             serviceType === "training" ? "🎓 Training Booking" : 
             "🚶 Walking Booking"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Client Selection */}
          <div>
            <Label className="text-yellow-300 font-semibold">Client</Label>
            <Select
              value={bookingData.clientId.toString()}
              onValueChange={(value) => setBookingData({ ...bookingData, clientId: Number(value), dogIds: [] })}
            >
              <SelectTrigger className="bg-black/40 border-yellow-400/50 text-yellow-400">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent className="bg-black border-yellow-400">
                {clients?.map((client: any) => (
                  <SelectItem key={client.id} value={client.id.toString()} className="text-yellow-400">
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dog Selection */}
          {bookingData.clientId > 0 && (
            <div>
              <Label className="text-yellow-300 font-semibold">Dogs</Label>
              <Select
                value={bookingData.dogIds[0]?.toString() || ""}
                onValueChange={(value) => setBookingData({ ...bookingData, dogIds: [Number(value)] })}
              >
                <SelectTrigger className="bg-black/40 border-yellow-400/50 text-yellow-400">
                  <SelectValue placeholder="Select Dog" />
                </SelectTrigger>
                <SelectContent className="bg-black border-yellow-400">
                  {clientDogs.map((dog: any) => (
                    <SelectItem key={dog.id} value={dog.id.toString()} className="text-yellow-400">
                      {dog.name} ({dog.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Boarding-specific fields */}
          {serviceType === "boarding" && (
            <>
              <div>
                <Label className="text-yellow-300 font-semibold">Kennel Number</Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={bookingData.kennelNumber || ""}
                  onChange={(e) => setBookingData({ ...bookingData, kennelNumber: Number(e.target.value) })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                  placeholder="Enter kennel number"
                />
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">Check-In Date</Label>
                <Input
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">Check-Out Date</Label>
                <Input
                  type="date"
                  value={bookingData.endDate}
                  onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
            </>
          )}

          {/* Training-specific fields */}
          {serviceType === "training" && (
            <>
              <div>
                <Label className="text-yellow-300 font-semibold">Training Type</Label>
                <Select 
                  value={bookingData.trainingType} 
                  onValueChange={(value) => setBookingData({ ...bookingData, trainingType: value })}
                >
                  <SelectTrigger className="bg-black/40 border-yellow-400/50 text-yellow-400">
                    <SelectValue placeholder="Select training type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-yellow-400/30">
                    <SelectItem value="1-on-1" className="text-yellow-400">1-on-1 Training (£45)</SelectItem>
                    <SelectItem value="group" className="text-yellow-400">Group Training (£40)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">Training Date</Label>
                <Input
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              {/* Start Time Field */}
              <div>
                <Label className="text-yellow-300 font-semibold">Start Time</Label>
                <Input
                  type="time"
                  value={bookingData.startTime}
                  onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              {/* End Time Field */}
              <div>
                <Label className="text-yellow-300 font-semibold">End Time</Label>
                <Input
                  type="time"
                  value={bookingData.endTime}
                  onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
            </>
          )}

          {/* Walking-specific fields */}
          {serviceType === "walking" && (
            <>
              <div>
                <Label className="text-yellow-300 font-semibold">Walking Date</Label>
                <Input
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">Start Time</Label>
                <Input
                  type="time"
                  value={bookingData.startTime}
                  onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">End Time</Label>
                <Input
                  type="time"
                  value={bookingData.endTime}
                  onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">Duration (Hours)</Label>
                <Input
                  type="number"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={bookingData.duration}
                  onChange={(e) => setBookingData({ ...bookingData, duration: Number(e.target.value) })}
                  className="bg-black/40 border-yellow-400/50 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-300 font-semibold">Assign Staff</Label>
                <Select
                  value={bookingData.staffId?.toString() || ""}
                  onValueChange={(value) => setBookingData({ ...bookingData, staffId: Number(value) })}
                >
                  <SelectTrigger className="bg-black/40 border-yellow-400/50 text-yellow-400">
                    <SelectValue placeholder="Select Staff Member" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-yellow-400">
                    {staff?.map((member: any) => (
                      <SelectItem key={member.id} value={member.id.toString()} className="text-yellow-400">
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Notes */}
          <div>
            <Label className="text-yellow-300 font-semibold">Notes</Label>
            <Textarea
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              className="bg-black/40 border-yellow-400/50 text-yellow-400"
              placeholder="Additional notes..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={createBookingMutation.isPending}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold hover:from-yellow-500 hover:to-yellow-700"
          >
            {createBookingMutation.isPending ? "Creating..." : "Create Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;