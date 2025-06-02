import { Crown, Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface VIPHeaderProps {
  title?: string;
  subtitle?: string;
  showNavigation?: boolean;
}

export function VIPHeader({ 
  title = "VIP Elite K9s", 
  subtitle = "Premium Dog Care Excellence",
  showNavigation = true 
}: VIPHeaderProps) {
  const navigationItems = [
    { label: "Dashboard", href: "/" },
    { label: "Staff Management", href: "/staff" },
    { label: "Client Portal", href: "/client" },
    { label: "Booking System", href: "/booking" },
    { label: "Invoicing", href: "/invoicing" },
    { label: "Reports", href: "/reporting" },
  ];

  return (
    <div className="vip-header text-white relative z-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* VIP Elite K9s Logo & Branding */}
          <div className="flex items-center space-x-4">
            {/* Logo Container */}
            <div className="flex items-center space-x-3">
              {/* Crown Icon representing luxury */}
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-lg">
                <Crown className="h-8 w-8 text-royal-blue" />
              </div>
              
              {/* Brand Text */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {title}
                </h1>
                <p className="text-blue-100 text-sm font-medium tracking-wide">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation & User Actions */}
          <div className="flex items-center space-x-4">
            {showNavigation && (
              <>
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-white hover:text-gold transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Navigation */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="sm" className="text-white hover:text-gold">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {navigationItems.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <a href={item.href} className="w-full">
                          {item.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative text-white hover:text-gold">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>

                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:text-gold">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem>Account Preferences</DropdownMenuItem>
                    <DropdownMenuItem>Help & Support</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Premium Features Badge */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className="bg-gold text-royal-blue font-semibold px-3 py-1">
              ⭐ Premium Service
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 font-medium px-3 py-1">
              🏆 Elite Care Standards
            </Badge>
          </div>
          
          {/* Live Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100 text-sm font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-yellow-300 to-gold"></div>
    </div>
  );
}