import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Home, Fan, Dog, Utensils, Activity, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { Kennel } from "@shared/schema";

interface KennelGridProps {
  kennels: (Kennel & { dog?: any })[];
}

export function KennelGrid({ kennels }: KennelGridProps) {
  const [selectedKennel, setSelectedKennel] = useState<(Kennel & { dog?: any }) | null>(null);
  const [activityType, setActivityType] = useState("");
  const [notes, setNotes] = useState("");
  const { staff } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const logActivityMutation = useMutation({
    mutationFn: async (data: { kennelId: number; dogId?: number; activityType: string; notes: string }) => {
      const response = await apiRequest("POST", "/api/kennel-logs", {
        ...data,
        staffId: staff?.id,
        completed: true
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Activity Logged ✓",
        description: "Kennel activity has been recorded successfully",
      });
      setSelectedKennel(null);
      setActivityType("");
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to log activity. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateKennelMutation = useMutation({
    mutationFn: async (data: { kennelId: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/kennels/${data.kennelId}`, {
        status: data.status
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Kennel Updated ✓",
        description: "Kennel status has been updated",
      });
      setSelectedKennel(null);
      queryClient.invalidateQueries({ queryKey: ["/api/kennels"] });
    }
  });

  const getKennelClasses = (status: string) => {
    const baseClasses = "kennel-card cursor-pointer hover:scale-105 transition-transform";
    switch (status) {
      case "occupied":
        return `${baseClasses} kennel-occupied`;
      case "cleaning":
        return `${baseClasses} kennel-cleaning`;
      default:
        return `${baseClasses} kennel-available`;
    }
  };

  const renderKennelContent = (kennel: Kennel & { dog?: any }) => {
    switch (kennel.status) {
      case "occupied":
        // Check if multiple dogs are assigned
        const dogCount = kennel.dogIds?.length || (kennel.dogId ? 1 : 0);
        const displayName = kennel.dog?.name || 'Occupied';
        
        return (
          <>
            <div className="text-xs font-medium text-green-800 mb-1">K{kennel.number}</div>
            <div className="w-8 h-8 mx-auto mb-1">
              {kennel.dog?.photo ? (
                <Avatar className="w-full h-full">
                  <AvatarImage src={kennel.dog.photo} />
                  <AvatarFallback className="text-xs">
                    {kennel.dog.name?.[0]?.toUpperCase() || 'D'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-full h-full bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-green-700 font-medium">
                    {dogCount > 1 ? dogCount : (kennel.dog?.name?.[0]?.toUpperCase() || 'D')}
                  </span>
                </div>
              )}
            </div>
            <div className="text-xs text-green-700 truncate">
              {dogCount > 1 ? `${dogCount} Dogs` : displayName}
            </div>
          </>
        );
      
      case "cleaning":
        return (
          <>
            <div className="text-xs font-medium text-yellow-800 mb-1">K{kennel.number}</div>
            <div className="w-8 h-8 mx-auto mb-1 bg-yellow-200 rounded-full flex items-center justify-center">
              <Fan className="text-yellow-600 h-4 w-4" />
            </div>
            <div className="text-xs text-yellow-700">Cleaning</div>
          </>
        );
      
      default:
        return (
          <>
            <div className="text-xs font-medium text-gray-600 mb-1">K{kennel.number}</div>
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-200 rounded-full flex items-center justify-center">
              <Home className="text-gray-400 h-4 w-4" />
            </div>
            <div className="text-xs text-gray-500">Empty</div>
          </>
        );
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
      {kennels.map((kennel) => (
        <div
          key={kennel.id}
          className={getKennelClasses(kennel.status)}
          title={`Kennel ${kennel.number} - ${kennel.status}${kennel.dog ? ` - ${kennel.dog.name}` : ''}`}
        >
          {renderKennelContent(kennel)}
        </div>
      ))}
    </div>
  );
}
