import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, Users, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface GroupTrainingSession {
  id: number;
  sessionName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  staffId: number | null;
  pricePerDog: number;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Staff {
  id: number;
  name: string;
  role: string;
}

export default function GroupTrainingManager() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<GroupTrainingSession | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // Fetch group training sessions
  const { data: sessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ['/api/group-training-sessions'],
  });

  // Fetch staff for trainer assignment
  const { data: staff = [] } = useQuery({
    queryKey: ['/api/staff'],
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: (sessionData: any) => apiRequest('POST', '/api/group-training-sessions', sessionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/group-training-sessions'] });
      setIsCreateOpen(false);
      toast({
        title: "Success!",
        description: "Group training session created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create group training session",
        variant: "destructive",
      });
    },
  });

  // Update session mutation
  const updateSessionMutation = useMutation({
    mutationFn: ({ id, ...data }: any) => apiRequest('PUT', `/api/group-training-sessions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/group-training-sessions'] });
      setEditingSession(null);
      toast({
        title: "Success!",
        description: "Group training session updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update group training session",
        variant: "destructive",
      });
    },
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/group-training-sessions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/group-training-sessions'] });
      toast({
        title: "Success!",
        description: "Group training session deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete group training session",
        variant: "destructive",
      });
    },
  });

  const handleCreateSession = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    
    const sessionData = {
      sessionName: formData.get('sessionName'),
      sessionDate: formData.get('sessionDate'),
      startTime: formData.get('startTime'),
      endTime: formData.get('endTime'),
      maxParticipants: parseInt(formData.get('maxParticipants') as string) || 6,
      staffId: formData.get('staffId') ? parseInt(formData.get('staffId') as string) : null,
      pricePerDog: parseInt(formData.get('pricePerDog') as string) || 40,
      notes: formData.get('notes'),
    };

    createSessionMutation.mutate(sessionData);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (loadingSessions) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 border-2 border-yellow-400 bg-yellow-400/10 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                🎓 Group Training Manager
              </h1>
              <p className="text-gray-300">
                Create and manage custom group training time slots for your VIP Elite K9s clients
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setLocation("/admin-dashboard")}
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-semibold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Time Slot
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-yellow-400 text-white max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-yellow-400">Create Group Training Session</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateSession} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sessionName">Session Name</Label>
                        <Input
                          id="sessionName"
                          name="sessionName"
                          placeholder="e.g., Saturday Morning Group Class"
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="sessionDate">Date</Label>
                        <Input
                          id="sessionDate"
                          name="sessionDate"
                          type="date"
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          name="startTime"
                          type="time"
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          name="endTime"
                          type="time"
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxParticipants">Max Dogs</Label>
                        <Input
                          id="maxParticipants"
                          name="maxParticipants"
                          type="number"
                          min="1"
                          max="20"
                          defaultValue="6"
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="staffId">Assigned Trainer</Label>
                        <Select name="staffId">
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Select trainer" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {(staff as Staff[]).map((member: Staff) => (
                              <SelectItem key={member.id} value={member.id.toString()}>
                                {member.name} - {member.role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pricePerDog">Price per Dog (£)</Label>
                        <Input
                          id="pricePerDog"
                          name="pricePerDog"
                          type="number"
                          min="1"
                          defaultValue="40"
                          className="bg-gray-800 border-gray-700"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Session details, requirements, etc."
                        className="bg-gray-800 border-gray-700"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateOpen(false)}
                        className="border-gray-600"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                        disabled={createSessionMutation.isPending}
                      >
                        {createSessionMutation.isPending ? 'Creating...' : 'Create Session'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(sessions as GroupTrainingSession[]).map((session: GroupTrainingSession) => (
            <Card key={session.id} className="bg-gray-900 border-yellow-400 text-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-yellow-400 text-lg">{session.sessionName}</CardTitle>
                  <Badge className={`${getStatusColor(session.status)} text-white`}>
                    {session.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-300">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {formatDate(session.sessionDate)}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    {session.startTime} - {session.endTime}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-2" />
                    {session.currentParticipants}/{session.maxParticipants} dogs booked
                  </div>
                </div>
                
                <div className="text-center py-2 border border-yellow-400 rounded bg-yellow-400/10">
                  <span className="text-yellow-400 font-semibold text-lg">
                    £{session.pricePerDog} per dog
                  </span>
                </div>
                
                {session.notes && (
                  <p className="text-gray-400 text-sm italic">
                    {session.notes}
                  </p>
                )}
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingSession(session)}
                    className="flex-1 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteSessionMutation.mutate(session.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    disabled={deleteSessionMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(sessions as GroupTrainingSession[]).length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-400 mb-4">No group training sessions yet</h3>
            <p className="text-gray-500 mb-6">Create your first group training time slot to get started!</p>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Session
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}