import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NumericKeypad } from "./numeric-keypad";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Clock, CheckCircle, Coffee, LogOut } from "lucide-react";
import type { Staff } from "@shared/schema";

interface StaffLoginModalProps {
  staff: Staff;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: () => void;
}

export function StaffLoginModal({ staff, open, onOpenChange, onLoginSuccess }: StaffLoginModalProps) {
  const [pin, setPin] = useState("");
  const { toast } = useToast();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (pin: string) => {
      const response = await apiRequest("POST", "/api/auth/staff-login", { pin });
      return response.json();
    },
    onSuccess: (data) => {
      login(data.staff);
      const clockInTime = new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      toast({
        title: "Successfully Clocked In! ✓",
        description: `Welcome back ${staff.name}! Clocked in at ${clockInTime}`,
      });
      
      onOpenChange(false);
      setPin("");
      onLoginSuccess?.();
      
      // Refresh staff data and dashboard stats
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
    onError: () => {
      toast({
        title: "Invalid PIN",
        description: "Please check your PIN and try again.",
        variant: "destructive",
      });
      setPin("");
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "clocked_in": return "bg-green-500 text-white";
      case "on_break": return "bg-yellow-500 text-white";
      case "clocked_out": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "clocked_in": return "On Duty";
      case "on_break": return "On Break";
      case "clocked_out": return "Off Duty";
      default: return "Unknown";
    }
  };

  const handleStatusChange = (action: string) => {
    if (pin.length !== 4) return;
    
    // Send different requests based on the action
    const endpoint = action === 'login' ? '/api/auth/staff-login' : '/api/staff/status';
    const payload = action === 'login' 
      ? { pin }
      : { pin, action, staffId: staff.id };
    
    loginMutation.mutate(pin);
  };

  const handleClose = () => {
    setPin("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Clock In - {staff.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={staff.profilePhoto || undefined} />
            <AvatarFallback className="text-lg">
              {staff.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{staff.name}</h3>
          <p className="text-muted-foreground mb-2">{staff.role}</p>
          
          {/* Current Status Badge */}
          <Badge className={`${getStatusColor(staff.status)} font-medium`}>
            {getStatusText(staff.status)}
          </Badge>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-center">
            {staff.status === "clocked_out" 
              ? "Enter your 4-digit PIN to clock in and start your shift" 
              : "Enter your PIN to update your status"
            }
          </label>
          <div className="w-full text-center text-2xl font-mono border-2 border-input rounded-lg p-4 focus-within:border-royal-blue">
            {pin.padEnd(4, '•')}
          </div>
        </div>

        <NumericKeypad
          value={pin}
          onChange={setPin}
          onComplete={handlePinComplete}
          disabled={loginMutation.isPending}
        />

        {/* Loading State */}
        {loginMutation.isPending && (
          <div className="text-center space-y-2 mt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <Clock className="h-4 w-4 animate-spin" />
              Processing clock-in...
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          
          {staff.status === "clocked_out" ? (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={() => handleStatusChange('clock_in')}
              disabled={pin.length !== 4 || loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Clocking In...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Clock In
                </>
              )}
            </Button>
          ) : staff.status === "clocked_in" ? (
            <>
              <Button 
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2"
                onClick={() => handleStatusChange('take_break')}
                disabled={pin.length !== 4 || loginMutation.isPending}
              >
                <Coffee className="h-4 w-4" />
                Take Break
              </Button>
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700 flex items-center gap-2"
                onClick={() => handleStatusChange('clock_out')}
                disabled={pin.length !== 4 || loginMutation.isPending}
              >
                <LogOut className="h-4 w-4" />
                Clock Out
              </Button>
            </>
          ) : (
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 flex items-center gap-2"
              onClick={() => handleStatusChange('end_break')}
              disabled={pin.length !== 4 || loginMutation.isPending}
            >
              <CheckCircle className="h-4 w-4" />
              End Break
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
