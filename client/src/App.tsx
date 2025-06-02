import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin-login";
import SimpleAdmin from "@/pages/simple-admin";
import BookingCalendar from "@/pages/BookingCalendar";
import PricingManagement from "@/pages/admin/pricing-management";
import TaskManagement from "@/pages/admin/TaskManagement";
import DailyReportsAdmin from "@/pages/admin/daily-reports";
import GroupTrainingManager from "@/pages/GroupTrainingManager";
import StaffPortal from "@/pages/StaffPortal";
import ClientPage from "@/pages/client-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin-dashboard" component={SimpleAdmin} />
      <Route path="/admin/bookings" component={BookingCalendar} />
      <Route path="/calendar" component={BookingCalendar} />
      <Route path="/admin/pricing-management" component={PricingManagement} />
      <Route path="/admin/task-management" component={TaskManagement} />
      <Route path="/admin/daily-reports" component={DailyReportsAdmin} />
      <Route path="/admin/group-training" component={GroupTrainingManager} />
      <Route path="/staff" component={StaffPortal} />
      <Route path="/staff-portal" component={StaffPortal} />
      <Route path="/client" component={ClientPage} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
