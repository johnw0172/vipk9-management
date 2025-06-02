import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Coffee, Sun, Sunset, Moon } from "lucide-react";

interface ScheduleEvent {
  time: string;
  title: string;
  description?: string;
  type: 'feeding' | 'exercise' | 'cleaning' | 'training' | 'break' | 'medication';
  completed?: boolean;
}

interface ScheduleTimelineProps {
  events?: ScheduleEvent[];
  currentTime?: string;
}

export function ScheduleTimeline({ events = [], currentTime }: ScheduleTimelineProps) {
  // Standard daily schedule based on the poster
  const defaultEvents: ScheduleEvent[] = [
    { time: "06:00", title: "Morning Feed", description: "First feeding of the day", type: "feeding" },
    { time: "06:30", title: "Morning Exercise", description: "First walk and outdoor time", type: "exercise" },
    { time: "07:30", title: "Kennel Cleaning", description: "Clean all kennels", type: "cleaning" },
    { time: "09:00", title: "Training Session", description: "Individual training time", type: "training" },
    { time: "10:30", title: "Break Time", description: "Staff break", type: "break" },
    { time: "12:00", title: "Midday Exercise", description: "Extended outdoor play", type: "exercise" },
    { time: "13:30", title: "Lunch Feed", description: "Midday feeding", type: "feeding" },
    { time: "15:00", title: "Medication Round", description: "Administer medications", type: "medication" },
    { time: "16:30", title: "Afternoon Training", description: "Group activities", type: "training" },
    { time: "18:00", title: "Evening Feed", description: "Final feeding", type: "feeding" },
    { time: "19:00", title: "Evening Exercise", description: "Final walk and play", type: "exercise" },
    { time: "20:00", title: "Final Kennel Check", description: "Ensure all dogs settled", type: "cleaning" },
    { time: "21:00", title: "Day Complete", description: "All tasks finished", type: "break" }
  ];

  const scheduleEvents = events.length > 0 ? events : defaultEvents;
  const now = currentTime || new Date().toTimeString().slice(0, 5);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'feeding': return '🍽️';
      case 'exercise': return '🏃';
      case 'cleaning': return '🧹';
      case 'training': return '🎓';
      case 'break': return '☕';
      case 'medication': return '💊';
      default: return '⏰';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'feeding': return 'bg-orange-500';
      case 'exercise': return 'bg-green-500';
      case 'cleaning': return 'bg-blue-500';
      case 'training': return 'bg-purple-500';
      case 'break': return 'bg-gray-500';
      case 'medication': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTimeIcon = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return <Sun className="w-4 h-4 text-yellow-400" />;
    if (hour >= 12 && hour < 18) return <Clock className="w-4 h-4 text-orange-400" />;
    if (hour >= 18 && hour < 21) return <Sunset className="w-4 h-4 text-red-400" />;
    return <Moon className="w-4 h-4 text-blue-400" />;
  };

  const isEventCurrent = (eventTime: string) => {
    const eventHour = parseInt(eventTime.split(':')[0]);
    const eventMinute = parseInt(eventTime.split(':')[1]);
    const nowHour = parseInt(now.split(':')[0]);
    const nowMinute = parseInt(now.split(':')[1]);
    
    const eventTotalMinutes = eventHour * 60 + eventMinute;
    const nowTotalMinutes = nowHour * 60 + nowMinute;
    
    return nowTotalMinutes >= eventTotalMinutes && nowTotalMinutes < eventTotalMinutes + 90; // 1.5 hour window
  };

  const isEventPast = (eventTime: string) => {
    const eventHour = parseInt(eventTime.split(':')[0]);
    const eventMinute = parseInt(eventTime.split(':')[1]);
    const nowHour = parseInt(now.split(':')[0]);
    const nowMinute = parseInt(now.split(':')[1]);
    
    const eventTotalMinutes = eventHour * 60 + eventMinute;
    const nowTotalMinutes = nowHour * 60 + nowMinute;
    
    return nowTotalMinutes > eventTotalMinutes + 90; // Past the 1.5 hour window
  };

  return (
    <Card className="bg-black/80 backdrop-blur border-yellow-400/30">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Daily Schedule Timeline
        </CardTitle>
        <div className="text-gray-300 text-sm">
          Current Time: <Badge className="bg-yellow-500 text-black ml-2">{now}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {scheduleEvents.map((event, index) => {
            const isCurrent = isEventCurrent(event.time);
            const isPast = isEventPast(event.time);
            const isCompleted = event.completed || isPast;
            
            return (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg border transition-all ${
                  isCurrent 
                    ? 'bg-yellow-400/20 border-yellow-400 shadow-lg' 
                    : isCompleted
                    ? 'bg-gray-800/50 border-gray-600'
                    : 'bg-gray-900/50 border-gray-700 hover:bg-gray-800/50'
                }`}
              >
                {/* Time Column */}
                <div className="flex items-center min-w-[80px]">
                  {getTimeIcon(event.time)}
                  <span className={`ml-2 font-mono text-sm ${
                    isCurrent ? 'text-yellow-300 font-bold' : 'text-gray-300'
                  }`}>
                    {event.time}
                  </span>
                </div>

                {/* Event Icon */}
                <div className="mx-4 text-2xl">
                  {getEventIcon(event.type)}
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${
                      isCurrent ? 'text-yellow-300' : 'text-white'
                    }`}>
                      {event.title}
                    </h4>
                    <Badge className={`${getEventColor(event.type)} text-white text-xs`}>
                      {event.type}
                    </Badge>
                    {isCompleted && (
                      <Badge className="bg-green-500 text-white text-xs">
                        ✓ Complete
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge className="bg-yellow-500 text-black text-xs animate-pulse">
                        ⚡ Current
                      </Badge>
                    )}
                  </div>
                  {event.description && (
                    <p className="text-gray-400 text-sm">{event.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <h4 className="text-white font-semibold mb-2">Daily Progress</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-orange-400 font-bold text-lg">
                {scheduleEvents.filter(e => e.type === 'feeding').length}
              </div>
              <div className="text-gray-400">Feeding Times</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">
                {scheduleEvents.filter(e => e.type === 'exercise').length}
              </div>
              <div className="text-gray-400">Exercise Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-bold text-lg">
                {scheduleEvents.filter(e => e.type === 'training').length}
              </div>
              <div className="text-gray-400">Training Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-bold text-lg">
                {scheduleEvents.filter(e => e.type === 'cleaning').length}
              </div>
              <div className="text-gray-400">Cleaning Tasks</div>
            </div>
          </div>
          
          <div className="mt-3 bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all"
              style={{ 
                width: `${(scheduleEvents.filter(e => isEventPast(e.time)).length / scheduleEvents.length) * 100}%` 
              }}
            />
          </div>
          <div className="text-gray-400 text-xs mt-1 text-center">
            {scheduleEvents.filter(e => isEventPast(e.time)).length} of {scheduleEvents.length} tasks completed
          </div>
        </div>
      </CardContent>
    </Card>
  );
}