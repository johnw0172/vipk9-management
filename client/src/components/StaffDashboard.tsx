import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, PlayCircle, PauseCircle, LogOut, ClipboardList, ChevronDown, ChevronUp, Home, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DailyReportForm } from "@/components/DailyReportForm";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import type { staff } from "@shared/schema";

type Staff = typeof staff.$inferSelect;

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  assignedKennelId?: number;
  createdAt?: string;
  // Dog information fields
  dog_name?: string;
  dog_breed?: string;
  dog_age?: number;
  dog_special_notes?: string;
  dog_behavior_notes?: string;
  dog_feeding_instructions?: string;
  dog_medication?: string;
  dog_exercise_requirements?: string;
  kennel_number?: number;
  client_name?: string;
  booking_start_date?: string;
  booking_end_date?: string;
  booking_status?: string;
}

interface StaffDashboardProps {
  staff: Staff;
  onLogout: () => void;
}

export function StaffDashboard({ staff, onLogout }: StaffDashboardProps) {
  // Initialize state based on staff status from server
  const [clockedIn, setClockedIn] = useState(staff.status === 'clocked_in' || staff.status === 'on_break');
  const [onBreak, setOnBreak] = useState(staff.status === 'on_break');
  const [showDailyReportForm, setShowDailyReportForm] = useState(false);
  const [selectedDogForReport, setSelectedDogForReport] = useState<{
    dogId: number;
    dogName: string;
    kennelId: number;
    kennelNumber: number;
  } | null>(null);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [workingTime, setWorkingTime] = useState(0);
  const [expandedKennels, setExpandedKennels] = useState<Set<string>>(new Set());
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // Real-time timer for updating current time and working hours
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Toggle kennel expansion
  const toggleKennel = (kennelId: string) => {
    setExpandedKennels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(kennelId)) {
        newSet.delete(kennelId);
      } else {
        newSet.add(kennelId);
      }
      return newSet;
    });
  };

  // Fetch real tasks from database
  const { data: tasksData, isLoading, error } = useQuery({
    queryKey: ["/api/staff-tasks", staff.id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/staff-tasks?staffId=${staff.id}`);
      return await response.json();
    },
  });

  // Debug logging
  console.log("Staff Dashboard Debug:", {
    tasksData,
    isLoading,
    error,
    staffId: staff.id,
    isArray: Array.isArray(tasksData),
    dataLength: tasksData?.length
  });

  const tasks: Task[] = Array.isArray(tasksData) ? tasksData.map((task: any) => {
    console.log("Processing individual task:", task);
    
    // Build enhanced description with dog information
    let enhancedDescription = task.notes || "No description provided";
    
    if (task.dog_name) {
      enhancedDescription += `\n🐕 Dog: ${task.dog_name}`;
      if (task.dog_breed) enhancedDescription += ` (${task.dog_breed})`;
      if (task.dog_age) enhancedDescription += `, Age: ${task.dog_age}`;
      if (task.client_name) enhancedDescription += `\n👤 Owner: ${task.client_name}`;
      if (task.dog_special_notes) enhancedDescription += `\n⚠️ Special Notes: ${task.dog_special_notes}`;
      if (task.dog_feeding_instructions) enhancedDescription += `\n🍽️ Feeding: ${task.dog_feeding_instructions}`;
      if (task.dog_medication) enhancedDescription += `\n💊 Medication: ${task.dog_medication}`;
      if (task.dog_exercise_requirements) enhancedDescription += `\n🏃 Exercise: ${task.dog_exercise_requirements}`;
      if (task.dog_behavior_notes) enhancedDescription += `\n🎾 Behavior: ${task.dog_behavior_notes}`;
    }
    
    return {
      id: task.id,
      title: task.task_type || "Untitled Task",
      description: enhancedDescription,
      status: task.status,
      priority: task.admin_notes?.includes("Priority:") 
        ? task.admin_notes.split("Priority: ")[1] 
        : "medium",
      dueDate: task.scheduled_date,
      assignedKennelId: task.associated_kennel_id || task.kennel_number,
      createdAt: task.createdAt,
      // Preserve dog information fields
      dog_name: task.dog_name,
      dog_breed: task.dog_breed,
      dog_age: task.dog_age,
      dog_special_notes: task.dog_special_notes,
      dog_behavior_notes: task.dog_behavior_notes,
      dog_feeding_instructions: task.dog_feeding_instructions,
      dog_medication: task.dog_medication,
      dog_exercise_requirements: task.dog_exercise_requirements,
      kennel_number: task.kennel_number,
      client_name: task.client_name,
      booking_start_date: task.booking_start_date,
      booking_end_date: task.booking_end_date,
      booking_status: task.booking_status
    };
  }) : [];

  // Group tasks by kennel for better organization
  const groupTasksByKennel = (tasks: Task[]) => {
    const grouped = tasks.reduce((acc, task) => {
      if (task.assignedKennelId) {
        const kennelId = task.assignedKennelId;
        if (!acc[kennelId]) {
          acc[kennelId] = [];
        }
        acc[kennelId].push(task);
      } else {
        // Special tasks without kennel assignment
        if (!acc['special']) {
          acc['special'] = [];
        }
        acc['special'].push(task);
      }
      return acc;
    }, {} as Record<string | number, Task[]>);
    
    return grouped;
  };

  const groupedTasks = groupTasksByKennel(tasks);
  console.log("Grouped tasks by kennel:", groupedTasks);

  const handleClockIn = () => {
    setClockedIn(true);
    setClockInTime(new Date());
    toast({
      title: "Clocked In",
      description: "You're now on duty. Have a great shift!"
    });
  };

  // Clock out mutation
  const clockOutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("PATCH", `/api/staff/${staff.id}/clock-out`);
      return response.json();
    },
    onSuccess: () => {
      setClockedIn(false);
      setOnBreak(false);
      setClockInTime(null);
      toast({
        title: "Clocked Out",
        description: "Thanks for your hard work today!"
      });
      // Redirect back to login after clock out
      setTimeout(() => {
        onLogout();
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Clock Out Failed",
        description: "Unable to clock out. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Break management mutation
  const breakMutation = useMutation({
    mutationFn: async (action: 'start' | 'end') => {
      const response = await apiRequest("PATCH", `/api/staff/${staff.id}/break-${action}`);
      return response.json();
    },
    onSuccess: (data, action) => {
      setOnBreak(action === 'start');
      toast({
        title: action === 'start' ? "Break Started" : "Break Ended",
        description: action === 'start' ? "Enjoy your break!" : "Welcome back! You're now back on duty."
      });
    },
    onError: (error) => {
      toast({
        title: "Break Action Failed",
        description: "Unable to update break status. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleClockOut = () => {
    clockOutMutation.mutate();
  };

  const handleBreak = () => {
    breakMutation.mutate(onBreak ? 'end' : 'start');
  };

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: string }) =>
      apiRequest("PATCH", `/api/staff-tasks/${taskId}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff-tasks", staff.id] });
      toast({
        title: "Task Updated",
        description: "Task status has been updated"
      });
    },
  });

  const handleTaskStatusChange = (taskId: number, newStatus: Task["status"]) => {
    updateTaskStatusMutation.mutate({ taskId, status: newStatus });
  };

  const handleDailyReportSubmit = () => {
    setShowDailyReportForm(false);
    setSelectedDogForReport(null);
    // Refresh tasks to show updated data
    queryClient.invalidateQueries({ queryKey: ["/api/staff-tasks", staff.id] });
  };

  const handleDailyReportCancel = () => {
    setShowDailyReportForm(false);
    setSelectedDogForReport(null);
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "in_progress": return "bg-blue-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getWorkingHours = () => {
    // Use server clock-in time from staff status
    if (!clockedIn || staff.status === 'clocked_out') return "0:00";
    
    // Use clockInTime property from staff object
    let clockInTime = null;
    if (staff.clockInTime) {
      clockInTime = new Date(staff.clockInTime);
    }
    
    if (!clockInTime) return "0:00";
    
    const diff = currentTime.getTime() - clockInTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              VIP Elite K9s Staff Portal
            </h1>
            <p className="text-gray-300 mt-1">Welcome back, {staff.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Time Tracking Card */}
        <Card className="bg-black/80 backdrop-blur border-2 border-yellow-400 mb-6">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Time Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Current Time</p>
                <p className="text-2xl font-bold text-white">{getCurrentTime()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Status</p>
                <Badge className={`${
                  onBreak ? "bg-orange-500" : clockedIn ? "bg-green-500" : "bg-gray-500"
                } text-white`}>
                  {onBreak ? "On Break" : clockedIn ? "Clocked In" : "Clocked Out"}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Hours Worked</p>
                <p className="text-2xl font-bold text-white">{getWorkingHours()}</p>
              </div>
              <div className="flex gap-2">
                {!clockedIn ? (
                  <Button
                    onClick={handleClockIn}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Clock In
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleBreak}
                      variant="outline"
                      className={`flex-1 ${
                        onBreak 
                          ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-white" 
                          : "border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
                      }`}
                    >
                      <PauseCircle className="w-4 h-4 mr-2" />
                      {onBreak ? "End Break" : "Start Break"}
                    </Button>
                    <Button
                      onClick={handleClockOut}
                      variant="outline"
                      className="flex-1 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      Clock Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-yellow-400">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              My Tasks
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Today's Schedule
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Notes & Reports
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab - Tile-Based Layout */}
          <TabsContent value="tasks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(groupedTasks).map(([kennelId, kennelTasks]) => {
                const isExpanded = expandedKennels.has(kennelId);
                const firstTask = kennelTasks[0];
                const dogInfo = firstTask ? {
                  name: firstTask.dog_name,
                  breed: firstTask.dog_breed,
                  age: firstTask.dog_age,
                  client: firstTask.client_name,
                  feedingInstructions: firstTask.dog_feeding_instructions,
                  medication: firstTask.dog_medication,
                  exerciseRequirements: firstTask.dog_exercise_requirements,
                  behaviorNotes: firstTask.dog_behavior_notes
                } : null;

                // Debug logging for dog info
                console.log(`Kennel ${kennelId} dogInfo:`, dogInfo);

                return (
                  <Card 
                    key={kennelId} 
                    className={`bg-black/80 backdrop-blur border-2 cursor-pointer transition-all hover:scale-105 ${
                      kennelId === 'special' 
                        ? 'border-purple-400 hover:border-purple-300' 
                        : 'border-yellow-400 hover:border-yellow-300'
                    }`}
                    onClick={() => toggleKennel(kennelId)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className={`flex items-center ${
                          kennelId === 'special' ? 'text-purple-400' : 'text-yellow-400'
                        }`}>
                          {kennelId === 'special' ? (
                            <>
                              ⭐ Other Tasks
                              <Badge className="ml-2 bg-purple-500 text-white">{kennelTasks.length}</Badge>
                            </>
                          ) : (
                            <>
                              <Home className="w-5 h-5 mr-2" />
                              Kennel {kennelId}
                              <Badge className="ml-2 bg-amber-500 text-black">{kennelTasks.length}</Badge>
                            </>
                          )}
                        </CardTitle>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Dog Information (always visible when kennel has a dog) */}
                      {dogInfo && dogInfo.name && kennelId !== 'special' && (
                        <div className="mb-4 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                          <h4 className="text-yellow-300 font-semibold mb-2">🐕 {dogInfo.name}</h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <p><span className="text-yellow-400">Breed:</span> {dogInfo.breed}</p>
                            <p><span className="text-yellow-400">Age:</span> {dogInfo.age} years</p>
                            <p><span className="text-yellow-400">Owner:</span> {dogInfo.client}</p>
                            {dogInfo.feedingInstructions && (
                              <p><span className="text-yellow-400">Feeding:</span> {dogInfo.feedingInstructions}</p>
                            )}
                            {dogInfo.medication && (
                              <p><span className="text-red-400">Medication:</span> {dogInfo.medication}</p>
                            )}
                          </div>
                          
                          {/* Daily Report Button */}
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              const dogId = firstTask?.dog_name ? 1 : 0; // This would need proper dog ID from task
                              const kennelNumber = firstTask?.kennel_number || parseInt(kennelId);
                              setSelectedDogForReport({
                                dogId,
                                dogName: dogInfo.name || "Unknown",
                                kennelId: parseInt(kennelId),
                                kennelNumber
                              });
                              setShowDailyReportForm(true);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs w-full mt-2"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            Create Daily Report
                          </Button>
                        </div>
                      )}

                      {/* Task Summary */}
                      <div className="text-gray-300 text-sm mb-3">
                        <p>{kennelTasks.filter(t => t.status === 'pending').length} pending tasks</p>
                        <p>{kennelTasks.filter(t => t.status === 'in_progress').length} in progress</p>
                        <p>{kennelTasks.filter(t => t.status === 'completed').length} completed</p>
                      </div>

                      {/* Expanded Task List */}
                      {isExpanded && (
                        <div className="space-y-3 pt-3 border-t border-gray-600">
                          {kennelTasks.map((task) => (
                            <div key={task.id} className="bg-black/50 p-3 rounded-lg border border-gray-700">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge className={`${getStatusColor(task.status)} text-white text-xs`}>
                                    {task.priority}
                                  </Badge>
                                  <Badge variant="outline" className="border-yellow-400 text-yellow-400 text-xs">
                                    {task.status}
                                  </Badge>
                                </div>
                                <div className="flex gap-2">
                                  {task.status === "pending" && (
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleTaskStatusChange(task.id, "in_progress");
                                      }}
                                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1"
                                    >
                                      Start
                                    </Button>
                                  )}
                                  {task.status === "in_progress" && (
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleTaskStatusChange(task.id, "completed");
                                      }}
                                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1"
                                    >
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Click to Complete
                                    </Button>
                                  )}
                                  {task.status === "completed" && (
                                    <Badge className="bg-green-500 text-white text-xs">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Done
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <h5 className="text-white font-medium text-sm">{task.title}</h5>
                              {task.description && (
                                <p className="text-gray-400 text-xs mt-1">{task.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {!isExpanded && (
                        <p className="text-center text-gray-400 text-sm mt-2">
                          Click to view tasks
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {Object.keys(groupedTasks).length === 0 && (
                <div className="col-span-full">
                  <Card className="bg-black/80 backdrop-blur border border-gray-600">
                    <CardContent className="p-8 text-center">
                      <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No tasks assigned yet today.</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <ScheduleTimeline />
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card className="bg-black/80 backdrop-blur border border-gray-600">
              <CardHeader>
                <CardTitle className="text-white">Notes & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-400 py-8">
                    <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Daily reports and notes section</p>
                    <p className="text-sm">Track important information about dogs and facilities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Daily Report Form Modal */}
      {showDailyReportForm && selectedDogForReport && (
        <DailyReportForm
          dogId={selectedDogForReport.dogId}
          dogName={selectedDogForReport.dogName}
          kennelId={selectedDogForReport.kennelId}
          kennelNumber={selectedDogForReport.kennelNumber}
          staffId={staff.id}
          onSubmit={handleDailyReportSubmit}
          onCancel={handleDailyReportCancel}
        />
      )}
    </div>
  );
}