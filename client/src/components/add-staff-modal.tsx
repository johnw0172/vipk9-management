import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStaffSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertStaffSchema.extend({
  pin: z.string().length(4, "PIN must be exactly 4 digits").regex(/^\d+$/, "PIN must contain only numbers")
});

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStaffModal({ open, onOpenChange }: AddStaffModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      pin: "",
      profilePhoto: ""
    }
  });

  const createStaffMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest("POST", "/api/staff", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({
        title: "Staff member added",
        description: "New staff member has been successfully created.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create staff member. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createStaffMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Enter full name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => form.setValue("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Head Trainer">Head Trainer</SelectItem>
                <SelectItem value="Boarding Specialist">Boarding Specialist</SelectItem>
                <SelectItem value="Dog Walker">Dog Walker</SelectItem>
                <SelectItem value="Groomer">Groomer</SelectItem>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
                <SelectItem value="Veterinary Assistant">Veterinary Assistant</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="pin">4-Digit PIN</Label>
            <Input
              id="pin"
              {...form.register("pin")}
              placeholder="Enter 4-digit PIN"
              maxLength={4}
              type="password"
            />
            {form.formState.errors.pin && (
              <p className="text-sm text-red-500">{form.formState.errors.pin.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="profilePhoto">Profile Photo URL (Optional)</Label>
            <Input
              id="profilePhoto"
              {...form.register("profilePhoto")}
              placeholder="https://example.com/photo.jpg"
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
              disabled={createStaffMutation.isPending}
            >
              {createStaffMutation.isPending ? "Adding..." : "Add Staff"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}