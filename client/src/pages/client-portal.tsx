import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertClientSchema, insertDogSchema } from "@shared/schema";
import { z } from "zod";
import { Dog, Plus, User, Calendar, FileText, CreditCard, Heart, Camera, Mail, Phone, MapPin } from "lucide-react";

// Extended schemas for forms
const clientRegistrationSchema = insertClientSchema.extend({
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const petSchema = insertDogSchema.extend({
  feedingTimes: z.array(z.string()).optional(),
  medicationSchedule: z.array(z.object({
    medication: z.string(),
    time: z.string(),
    dosage: z.string(),
  })).optional(),
  itemsBrought: z.array(z.string()).optional(),
});

export default function ClientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [showAddPet, setShowAddPet] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Login form
  const loginForm = useForm({
    resolver: zodResolver(z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Registration form
  const registrationForm = useForm({
    resolver: zodResolver(clientRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Pet form
  const petForm = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      breed: "",
      age: 0,
      weight: "",
      photo: "",
      feedingInstructions: "",
      medication: "",
      specialNotes: "",
      behaviorNotes: "",
      emergencyContact: "",
      vetInfo: "",
      allergies: "",
      exerciseRequirements: "",
    },
  });

  // Client pets query
  const { data: pets = [] } = useQuery({
    queryKey: ["/api/dogs", "client", currentClient?.id],
    queryFn: async () => {
      if (!currentClient?.id) return [];
      const response = await apiRequest("GET", `/api/dogs/client/${currentClient.id}`);
      return response.json();
    },
    enabled: !!currentClient?.id,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/client-login", data);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentClient(data.client);
      setIsLoggedIn(true);
      toast({
        title: "Welcome back! ✓",
        description: `Hello ${data.client.name}, great to see you again!`,
      });
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      const { confirmPassword, ...clientData } = data;
      const response = await apiRequest("POST", "/api/clients", clientData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful! ✓",
        description: "Welcome to VIP Elite K9s! You can now log in.",
      });
      setIsRegistering(false);
      registrationForm.reset();
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "Email might already be registered. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add pet mutation
  const addPetMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/dogs", {
        ...data,
        clientId: currentClient.id,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Pet Added Successfully! ✓",
        description: "Your furry friend has been added to your account.",
      });
      setShowAddPet(false);
      petForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/dogs"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add pet. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (data: any) => {
    loginMutation.mutate(data);
  };

  const handleRegistration = (data: any) => {
    registrationMutation.mutate(data);
  };

  const handleAddPet = (data: any) => {
    addPetMutation.mutate(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentClient(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Not logged in view
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-t-4 border-t-royal-blue shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Dog className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-royal-blue">
              {isRegistering ? "Join VIP Elite K9s" : "Welcome Back"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isRegistering ? "Create your account to get premium pet care" : "Sign in to manage your pets"}
            </p>
          </CardHeader>
          <CardContent>
            {isRegistering ? (
              <Form {...registrationForm}>
                <form onSubmit={registrationForm.handleSubmit(handleRegistration)} className="space-y-4">
                  <FormField
                    control={registrationForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your address" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a secure password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registrationForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-royal-blue hover:bg-blue-700 h-11"
                    disabled={registrationMutation.isPending}
                  >
                    {registrationMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11"
                    onClick={() => setIsRegistering(false)}
                  >
                    Already have an account? Sign In
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-royal-blue hover:bg-blue-700 h-11"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing In..." : "Sign In to Portal"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11"
                    onClick={() => setIsRegistering(true)}
                  >
                    New to VIP Elite K9s? Join Now
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Logged in client portal view
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-blue to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {currentClient.name}!</h1>
                <p className="text-blue-100">VIP Elite K9s Client Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-blue-100">
                  <Mail className="h-3 w-3" />
                  {currentClient.email}
                </div>
                {currentClient.phone && (
                  <div className="flex items-center gap-1 text-blue-100">
                    <Phone className="h-3 w-3" />
                    {currentClient.phone}
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-royal-blue"
                onClick={handleLogout}
              >
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* My Pets Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              My Beloved Pets
            </h2>
            <Dialog open={showAddPet} onOpenChange={setShowAddPet}>
              <DialogTrigger asChild>
                <Button className="bg-gold hover:bg-yellow-500 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Pet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">Add Your Furry Family Member</DialogTitle>
                  <p className="text-muted-foreground">
                    Tell us about your pet so we can provide the best possible care
                  </p>
                </DialogHeader>
                <Form {...petForm}>
                  <form onSubmit={petForm.handleSubmit(handleAddPet)} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={petForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your pet's name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={petForm.control}
                          name="breed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Breed *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Golden Retriever, Mixed" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={petForm.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age (years)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Enter age" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={petForm.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 45 lbs, 20 kg" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Care Instructions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Care Instructions</h3>
                      <FormField
                        control={petForm.control}
                        name="feedingInstructions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Feeding Instructions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Include feeding times, food brand, portions, special diet requirements..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={petForm.control}
                        name="medication"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medications & Dosage</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List all medications, dosages, and timing (e.g., 'Rimadyl 25mg twice daily with food')..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={petForm.control}
                        name="exerciseRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exercise & Activity Needs</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe exercise requirements, energy level, favorite activities, any restrictions..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Health & Behavior */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Health & Behavior</h3>
                      <FormField
                        control={petForm.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies & Sensitivities</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Food allergies, environmental allergies, medication sensitivities..."
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={petForm.control}
                        name="behaviorNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Behavior & Personality Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Temperament, likes/dislikes, fears, social behavior with people and other dogs..."
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={petForm.control}
                        name="specialNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Notes & Instructions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any other important information our staff should know..."
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Emergency Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b pb-2">Emergency Information</h3>
                      <FormField
                        control={petForm.control}
                        name="vetInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Veterinarian Information</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Vet clinic name, address, phone number, emergency contact..."
                                className="min-h-[60px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={petForm.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Alternative emergency contact name and phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-6 border-t">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowAddPet(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-royal-blue hover:bg-blue-700"
                        disabled={addPetMutation.isPending}
                      >
                        {addPetMutation.isPending ? "Adding Pet..." : "Add Pet to Family"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {pets.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet: any) => (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-royal-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={pet.photo || undefined} />
                        <AvatarFallback className="bg-royal-blue text-white text-2xl">
                          {pet.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-royal-blue">{pet.name}</h3>
                        <p className="text-muted-foreground font-medium">{pet.breed}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{pet.age} years old</Badge>
                          {pet.weight && <Badge variant="outline">{pet.weight}</Badge>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      {pet.allergies && (
                        <div className="p-2 bg-red-50 rounded border-l-2 border-red-300">
                          <div className="font-medium text-red-800">Allergies:</div>
                          <div className="text-red-700">{pet.allergies}</div>
                        </div>
                      )}
                      {pet.medication && (
                        <div className="p-2 bg-yellow-50 rounded border-l-2 border-yellow-300">
                          <div className="font-medium text-yellow-800">Medications:</div>
                          <div className="text-yellow-700">{pet.medication}</div>
                        </div>
                      )}
                      {pet.behaviorNotes && (
                        <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-300">
                          <div className="font-medium text-blue-800">Behavior Notes:</div>
                          <div className="text-blue-700">{pet.behaviorNotes}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 border-2 border-dashed">
              <CardContent>
                <div className="w-24 h-24 bg-royal-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Dog className="h-12 w-12 text-royal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No pets added yet</h3>
                <p className="text-muted-foreground mb-6">Add your first pet to get started with VIP Elite K9s services</p>
                <Button 
                  onClick={() => setShowAddPet(true)}
                  className="bg-royal-blue hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Pet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Services & Account Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-royal-blue"
            onClick={() => window.location.href = '/booking'}
          >
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-royal-blue/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-royal-blue" />
              </div>
              <h3 className="font-bold mb-2">Book Services</h3>
              <p className="text-sm text-muted-foreground">Schedule training, boarding, or walking sessions</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-green-500">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Daily Reports</h3>
              <p className="text-sm text-muted-foreground">View detailed daily care reports for your pets</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-gold">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-bold mb-2">Billing</h3>
              <p className="text-sm text-muted-foreground">Manage invoices and payment history</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-t-4 border-t-purple-500">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">My Account</h3>
              <p className="text-sm text-muted-foreground">Update profile and account settings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}