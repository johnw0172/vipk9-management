import React from "react";
import { format, eachDayOfInterval } from "date-fns";

interface BoardingCalendarProps {
  bookings: any[];
  kennels: any[];
  days: Date[];
  dogs?: any[];
  onKennelClick?: (kennelNumber: number, day: Date) => void;
}

const BoardingCalendar: React.FC<BoardingCalendarProps> = ({ 
  bookings, 
  kennels, 
  days, 
  dogs = [],
  onKennelClick 
}) => {
  return (
    <div className="max-h-screen overflow-y-auto">
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-yellow-400/30 p-3 bg-yellow-400/10 text-yellow-400 font-bold">
              Kennel
            </th>
            {days.map((day) => (
              <th key={day.toISOString()} className="border border-yellow-400/30 p-3 bg-yellow-400/10 text-yellow-400 font-bold">
                {format(day, "MMM d")}
                <br />
                <span className="text-xs text-gray-300">{format(day, "EEE")}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(20)].map((_, i) => {
            const kennelNum = i + 1;
            return (
              <tr key={kennelNum} className="hover:bg-yellow-400/5">
                <td className="border border-yellow-400/30 p-3 text-center font-semibold text-yellow-300 bg-black/60">
                  Kennel #{kennelNum}
                </td>
                {days.map((day) => {
                  const dayBookings = bookings.filter((booking: any) => {
                    if (!booking.startDate || !booking.endDate) return false;
                    if (booking.status === 'cancelled') return false;
                    
                    const bookingStart = new Date(booking.startDate);
                    const bookingEnd = new Date(booking.endDate);
                    const dayMidnight = new Date(day);
                    dayMidnight.setHours(0, 0, 0, 0);
                    
                    const startMidnight = new Date(bookingStart);
                    startMidnight.setHours(0, 0, 0, 0);
                    
                    const endMidnight = new Date(bookingEnd);
                    endMidnight.setHours(0, 0, 0, 0);
                    
                    return dayMidnight >= startMidnight && dayMidnight <= endMidnight;
                  });

                  const kennel = kennels.find((k: any) => k.number === kennelNum);
                  
                  const kennelBookings = dayBookings.filter((booking: any) => {
                    if (booking.kennelNumber && booking.kennelNumber === kennelNum) {
                      return true;
                    }
                    if (!booking.kennelNumber && kennelNum === 1) {
                      return true;
                    }
                    if (kennel && kennel.dogIds && kennel.dogIds.includes(booking.dogId)) {
                      return true;
                    }
                    return false;
                  });

                  const isOccupied = kennelBookings.length > 0;
                  const cellContent = isOccupied ? (
                    <div className="space-y-1">
                      {kennelBookings.slice(0, 2).map((booking: any) => {
                        const bookingStart = new Date(booking.startDate);
                        const bookingEnd = new Date(booking.endDate);
                        const isCheckInDay = format(bookingStart, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
                        const isCheckOutDay = format(bookingEnd, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
                        
                        let bgColor = "bg-orange-500/80";
                        if (isCheckInDay) bgColor = "bg-green-500/80";
                        if (isCheckOutDay) bgColor = "bg-red-500/80";
                        
                        const dog = dogs.find(d => d.id === booking.dogId);
                        return (
                          <div key={booking.id} className={`${bgColor} text-white px-2 py-1 rounded text-xs font-medium`}>
                            {dog?.name || `Dog ID: ${booking.dogId}`}
                          </div>
                        );
                      })}
                      {kennelBookings.length > 2 && (
                        <div className="text-yellow-400 text-xs">+{kennelBookings.length - 2} more</div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => onKennelClick?.(kennelNum, day)}
                      className="w-full h-full text-green-400 hover:bg-green-400/10 transition-colors duration-200 rounded font-medium"
                    >
                      Available
                    </button>
                  );

                  return (
                    <td key={`${kennelNum}-${day.toISOString()}`} className="border border-yellow-400/30 p-2 text-center min-h-[60px]">
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BoardingCalendar;