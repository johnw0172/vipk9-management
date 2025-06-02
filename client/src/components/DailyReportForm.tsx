import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface DailyReportFormProps {
  dogId: number;
  dogName: string;
  kennelId: number;
  kennelNumber: number;
  staffId: number;
  onSubmit: () => void;
  onCancel: () => void;
}

export function DailyReportForm({
  dogId,
  dogName,
  kennelId,
  kennelNumber,
  staffId,
  onSubmit,
  onCancel
}: DailyReportFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Exercise section
    exerciseNotes: "",
    exerciseDuration: "",
    exerciseType: "",
    exerciseEnergyLevel: "",
    
    // Health section
    healthNotes: "",
    appetite: "",
    behaviorChanges: "",
    healthConcerns: "",
    
    // Feeding section
    feedingTime: "",
    feedingAmount: "",
    feedingAppetite: "",
    feedingNotes: "",
    
    // Bonding & Playing section
    bondingNotes: "",
    playPreferences: "",
    mood: "",
    
    // Training section
    trainingCommands: "",
    trainingProgress: "",
    trainingNotes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.exerciseNotes.trim()) {
        toast({
          title: "Validation Error",
          description: "Exercise notes are required",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.healthNotes.trim()) {
        toast({
          title: "Validation Error", 
          description: "Health notes are required",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.bondingNotes.trim()) {
        toast({
          title: "Validation Error",
          description: "Bonding notes are required", 
          variant: "destructive"
        });
        return;
      }

      const reportData = {
        dogId,
        kennelId,
        staffId,
        reportDate: new Date().toISOString().split('T')[0],
        ...formData
      };

      await apiRequest("POST", "/api/daily-reports", reportData);
      
      toast({
        title: "Success",
        description: `Daily report created for ${dogName}`,
      });
      
      onSubmit();
    } catch (error) {
      console.error("Error creating daily report:", error);
      toast({
        title: "Error",
        description: "Failed to create daily report",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Daily Report - {dogName} (Kennel {kennelNumber})
            </h2>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exercise Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">Exercise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="exerciseNotes">Exercise Notes *</Label>
                  <Textarea
                    id="exerciseNotes"
                    placeholder="Describe today's exercise activities..."
                    value={formData.exerciseNotes}
                    onChange={(e) => handleInputChange("exerciseNotes", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="exerciseDuration">Duration</Label>
                  <Input
                    id="exerciseDuration"
                    placeholder="e.g., 30 minutes"
                    value={formData.exerciseDuration}
                    onChange={(e) => handleInputChange("exerciseDuration", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="exerciseType">Exercise Type</Label>
                  <Select onValueChange={(value) => handleInputChange("exerciseType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exercise type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walk">Walk</SelectItem>
                      <SelectItem value="run">Run</SelectItem>
                      <SelectItem value="play">Play Time</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="yard-time">Yard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="exerciseEnergyLevel">Energy Level</Label>
                  <Select onValueChange={(value) => handleInputChange("exerciseEnergyLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select energy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="very-high">Very High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Health Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="healthNotes">Health Notes *</Label>
                  <Textarea
                    id="healthNotes"
                    placeholder="Overall health observations..."
                    value={formData.healthNotes}
                    onChange={(e) => handleInputChange("healthNotes", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="appetite">Appetite</Label>
                  <Select onValueChange={(value) => handleInputChange("appetite", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appetite level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="behaviorChanges">Behavior Changes</Label>
                  <Textarea
                    id="behaviorChanges"
                    placeholder="Any notable behavior changes..."
                    value={formData.behaviorChanges}
                    onChange={(e) => handleInputChange("behaviorChanges", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="healthConcerns">Health Concerns</Label>
                  <Textarea
                    id="healthConcerns"
                    placeholder="Any health concerns or issues..."
                    value={formData.healthConcerns}
                    onChange={(e) => handleInputChange("healthConcerns", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Feeding Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Feeding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="feedingTime">Feeding Time</Label>
                  <Input
                    id="feedingTime"
                    placeholder="e.g., 8:00 AM, 6:00 PM"
                    value={formData.feedingTime}
                    onChange={(e) => handleInputChange("feedingTime", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="feedingAmount">Amount</Label>
                  <Input
                    id="feedingAmount"
                    placeholder="e.g., 1 cup, 2 cups"
                    value={formData.feedingAmount}
                    onChange={(e) => handleInputChange("feedingAmount", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="feedingAppetite">Feeding Appetite</Label>
                  <Select onValueChange={(value) => handleInputChange("feedingAppetite", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How well did they eat?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate-all">Ate All</SelectItem>
                      <SelectItem value="ate-most">Ate Most</SelectItem>
                      <SelectItem value="ate-some">Ate Some</SelectItem>
                      <SelectItem value="barely-ate">Barely Ate</SelectItem>
                      <SelectItem value="refused">Refused Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="feedingNotes">Feeding Notes</Label>
                  <Textarea
                    id="feedingNotes"
                    placeholder="Any feeding observations..."
                    value={formData.feedingNotes}
                    onChange={(e) => handleInputChange("feedingNotes", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bonding & Playing Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-600">Bonding & Playing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bondingNotes">Bonding Notes *</Label>
                  <Textarea
                    id="bondingNotes"
                    placeholder="How did bonding and play time go..."
                    value={formData.bondingNotes}
                    onChange={(e) => handleInputChange("bondingNotes", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="playPreferences">Play Preferences</Label>
                  <Textarea
                    id="playPreferences"
                    placeholder="What activities does the dog enjoy..."
                    value={formData.playPreferences}
                    onChange={(e) => handleInputChange("playPreferences", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mood">Overall Mood</Label>
                  <Select onValueChange={(value) => handleInputChange("mood", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-happy">Very Happy</SelectItem>
                      <SelectItem value="happy">Happy</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="calm">Calm</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                      <SelectItem value="stressed">Stressed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Training Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="trainingCommands">Commands Practiced</Label>
                  <Input
                    id="trainingCommands"
                    placeholder="e.g., Sit, Stay, Come, Down"
                    value={formData.trainingCommands}
                    onChange={(e) => handleInputChange("trainingCommands", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="trainingProgress">Training Progress</Label>
                  <Textarea
                    id="trainingProgress"
                    placeholder="How well did the dog respond to training..."
                    value={formData.trainingProgress}
                    onChange={(e) => handleInputChange("trainingProgress", e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="trainingNotes">Training Notes</Label>
                  <Textarea
                    id="trainingNotes"
                    placeholder="Additional training observations and recommendations..."
                    value={formData.trainingNotes}
                    onChange={(e) => handleInputChange("trainingNotes", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Creating Report..." : "Create Daily Report"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}