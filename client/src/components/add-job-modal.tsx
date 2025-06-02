import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertJobSchema.extend({
  scheduledDate: z.string().min(1, "Date is required"),
});

interface AddJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddJobModal({ open, onOpenChange }: AddJobModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staff = [] } = useQuery({
    queryKey: ["/api/staff"],
  });

  const { data: dogs = [] } = useQuery({
    queryKey: ["/api/dogs"],
  });

  const { data: kennels = [] } = useQuery({
    queryKey: ["/api/kennels"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      description: "",
      assignedStaffId: undefined,
      dogId: undefined,
      kennelId: undefined,
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: "",
      notes: ""
    }
  });

  const createJobMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const jobData = {
        ...data,
        scheduledDate: new Date(data.scheduledDate),
        assignedStaffId: data.assignedStaffId || null,
        dogId: data.dogId || null,
        kennelId: data.kennelId || null,
        scheduledTime: data.scheduledTime || null,
        notes: data.notes || null
      };
      return apiRequest("POST", "/api/jobs", jobData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      toast({
        title: "Job created",
        description: "New job has been successfully assigned.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createJobMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Job Type</Label>
              <Select onValueChange={(value) => form.setValue("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk">Dog Walking</SelectItem>
                  <SelectItem value="training">Training Session</SelectItem>
                  <SelectItem value="feeding">Feeding</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                  <SelectItem value="cleaning">Kennel Cleaning</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-red-500">{form.formState.errors.type.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="assignedStaffId">Assign to Staff</Label>
              <Select onValueChange={(value) => form.setValue("assignedStaffId", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((member: any) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Describe the job details..."
              className="min-h-[80px]"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduledDate">Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                {...form.register("scheduledDate")}
              />
              {form.formState.errors.scheduledDate && (
                <p className="text-sm text-red-500">{form.formState.errors.scheduledDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="scheduledTime">Time (Optional)</Label>
              <Input
                id="scheduledTime"
                type="time"
                {...form.register("scheduledTime")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dogId">Dog (Optional)</Label>
              <Select onValueChange={(value) => form.setValue("dogId", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a dog" />
                </SelectTrigger>
                <SelectContent>
                  {dogs.map((dog: any) => (
                    <SelectItem key={dog.id} value={dog.id.toString()}>
                      {dog.name} - {dog.breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="kennelId">Kennel (Optional)</Label>
              <Select onValueChange={(value) => form.setValue("kennelId", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a kennel" />
                </SelectTrigger>
                <SelectContent>
                  {kennels.map((kennel: any) => (
                    <SelectItem key={kennel.id} value={kennel.id.toString()}>
                      Kennel {kennel.number} - {kennel.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...form.register("notes")}
              placeholder="Additional notes or instructions..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-royal-blue hover:bg-blue-700"
              disabled={createJobMutation.isPending}
            >
              {createJobMutation.isPending ? "Creating..." : "Create Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}