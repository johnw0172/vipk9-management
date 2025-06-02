import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface TimeBasedCalendarProps {
  bookings: any[];
  showStaff: boolean;
  dogs?: any[];
  staff?: any[];
}

const TimeBasedCalendar: React.FC<TimeBasedCalendarProps> = ({ bookings, showStaff, dogs = [], staff = [] }) => {
  // Group bookings by date
  const bookingsByDate = bookings.reduce((acc: any, booking: any) => {
    const dateKey = format(new Date(booking.startDate), "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(booking);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.keys(bookingsByDate).length === 0 ? (
        <Card className="bg-black/80 backdrop-blur border-2 border-yellow-400">
          <CardContent className="p-8 text-center">
            <p className="text-yellow-400 text-lg">
              No {bookings.length > 0 ? 'scheduled' : ''} sessions for this service type
            </p>
            <p className="text-gray-400 mt-2">
              Click "Create Booking" to schedule a new session
            </p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(bookingsByDate).map(([date, dayBookings]: [string, any]) => (
          <Card key={date} className="bg-black/80 backdrop-blur border-2 border-yellow-400">
            <CardContent className="p-4">
              <h3 className="text-yellow-400 font-bold text-lg mb-3">
                {format(new Date(date), "EEEE, MMMM d, yyyy")}
              </h3>
              <div className="space-y-2">
                {dayBookings.map((booking: any) => {
                  const dog = dogs.find(d => d.id === booking.dogId);
                  const staffMember = staff.find(s => s.id === booking.staffId);
                  
                  return (
                    <div 
                      key={booking.id}
                      className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-yellow-400 font-semibold">
                            {booking.serviceType === 'training' ? '🎓' : '🚶'} {booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}
                          </span>
                          <span className="text-white font-medium">
                            Dog: {dog?.name || `Unknown (ID: ${booking.dogId})`}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-300">
                          {booking.startTime && booking.endTime && (
                            <span>
                              ⏰ {booking.startTime} - {booking.endTime}
                            </span>
                          )}
                          {booking.duration && (
                            <span>
                              ⏱️ {booking.duration} {booking.duration === 1 ? 'hour' : 'hours'}
                            </span>
                          )}
                          {showStaff && booking.staffId && (
                            <span className="text-blue-300">
                              👤 {staffMember?.name || `Staff ID: ${booking.staffId}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">
                          {booking.serviceType === 'training' ? 
                            (booking.trainingType === 'group' ? '£40' : '£45') : 
                            '£20'
                          }
                        </div>
                        <div className="text-xs text-gray-400">
                          {booking.status || 'Confirmed'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TimeBasedCalendar;