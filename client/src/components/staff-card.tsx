import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Staff } from "@shared/schema";

interface StaffCardProps {
  staff: Staff;
  onClick?: () => void;
  showStatus?: boolean;
}

export function StaffCard({ staff, onClick, showStatus = true }: StaffCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "clocked_in":
        return <Badge className="bg-green-500 text-white">On Duty</Badge>;
      case "on_break":
        return <Badge className="bg-yellow-500 text-white">On Break</Badge>;
      case "clocked_out":
        return <Badge className="bg-gray-400 text-white">Clocked Out</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIndicator = (status: string) => {
    const baseClasses = "status-indicator";
    switch (status) {
      case "clocked_in":
        return `${baseClasses} status-clocked-in`;
      case "on_break":
        return `${baseClasses} status-on-break`;
      case "clocked_out":
        return `${baseClasses} status-clocked-out`;
      default:
        return `${baseClasses} bg-gray-400`;
    }
  };

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <Card 
      className={`border border-gray-200 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={staff.profilePhoto || undefined} />
            <AvatarFallback>
              {staff.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{staff.name}</h4>
            <p className="text-sm text-muted-foreground">{staff.role}</p>
          </div>
          {showStatus && (
            <div className="flex items-center space-x-2">
              <div className={getStatusIndicator(staff.status)} />
              {getStatusBadge(staff.status)}
            </div>
          )}
        </div>
        
        {showStatus && (
          <div className="mt-3 text-xs text-muted-foreground">
            {staff.status === "clocked_in" && staff.clockInTime && (
              <span>Clocked in: {formatTime(staff.clockInTime.toString())}</span>
            )}
            {staff.status === "on_break" && staff.breakStartTime && (
              <span>Break started: {formatTime(staff.breakStartTime.toString())}</span>
            )}
            {staff.status === "clocked_out" && staff.lastClockOut && (
              <span>Last shift: {formatTime(staff.lastClockOut.toString())}</span>
            )}
            {staff.status === "clocked_out" && !staff.lastClockOut && (
              <span>Ready to clock in</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
