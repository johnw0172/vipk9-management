import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Staff {
  id: number;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  pin?: string;
  profilePhoto?: string;
}

interface StaffLoginProps {
  onLogin: (staff: Staff) => void;
}

export function StaffLogin({ onLogin }: StaffLoginProps) {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch real staff data from the database
  const { data: staffMembers = [], isLoading: isLoadingStaff } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff);
    setPin("");
  };

  const handlePinDigit = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleClearPin = () => {
    setPin("");
  };

  const handleLogin = async () => {
    if (pin.length !== 4 || !selectedStaff) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/staff/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          staffId: selectedStaff.id,
          pin: pin
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Login Successful",
          description: `Welcome ${data.staff.name}!`
        });
        // Pass the updated staff data from server response, not the original selectedStaff
        onLogin(data.staff);
      } else {
        toast({
          title: "Invalid PIN",
          description: data.message || "Please try again",
          variant: "destructive"
        });
        setPin("");
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Unable to authenticate. Please try again.",
        variant: "destructive"
      });
      setPin("");
    }
    
    setIsLoading(false);
  };

  if (!selectedStaff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </Button>
              <div></div>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-2">
              VIP Elite K9s
            </h1>
            <p className="text-xl text-gray-300">Staff Portal</p>
          </div>
          
          {isLoadingStaff ? (
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-300">Loading staff members...</p>
            </div>
          ) : staffMembers.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-300 mb-4">No staff members found. Please contact your administrator.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {staffMembers.map((staff) => (
                <Card 
                  key={staff.id}
                  className="bg-black/80 backdrop-blur border-2 border-yellow-400 cursor-pointer hover:border-yellow-300 transition-colors"
                  onClick={() => handleStaffSelect(staff)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-2xl">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{staff.name}</h3>
                    <p className="text-gray-400 text-sm">{staff.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-black"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedStaff(null)}
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Back to Staff Selection
          </Button>
        </div>
        <Card className="bg-black/80 backdrop-blur border-2 border-yellow-400">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-yellow-400">
              Welcome, {selectedStaff.name}
            </CardTitle>
            <p className="text-gray-300">{selectedStaff.role}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-white mb-4">Enter your 4-digit PIN</p>
              <div className="flex justify-center space-x-2 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="w-12 h-12 border-2 border-yellow-400 rounded-lg flex items-center justify-center text-yellow-400 text-xl font-bold"
                  >
                    {pin[index] ? "●" : ""}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  className="h-12 text-lg font-bold border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  onClick={() => handlePinDigit(num.toString())}
                  disabled={pin.length >= 4}
                >
                  {num}
                </Button>
              ))}
              <Button
                variant="outline"
                className="h-12 text-lg font-bold border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                onClick={handleClearPin}
              >
                Clear
              </Button>
              <Button
                variant="outline"
                className="h-12 text-lg font-bold border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                onClick={() => handlePinDigit("0")}
                disabled={pin.length >= 4}
              >
                0
              </Button>
              <Button
                className="h-12 text-lg font-bold bg-yellow-400 text-black hover:bg-yellow-500"
                onClick={handleLogin}
                disabled={pin.length !== 4 || isLoading}
              >
                Login
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
              onClick={() => setSelectedStaff(null)}
            >
              Back to Staff Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}