import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('VIP Elite K9s Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-600">
                Oops! Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                We apologize for the inconvenience. The VIP Elite K9s system encountered an unexpected error.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-red-800 mb-2">
                    Error Details (Development):
                  </p>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {this.state.error.message}
                  </pre>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  onClick={this.handleRetry}
                  className="flex-1"
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={this.handleGoHome}
                  className="flex-1 bg-royal-blue hover:bg-blue-700"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground">
                If this problem persists, please contact VIP Elite K9s support.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for better UX
export function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin w-8 h-8 border-4 border-royal-blue border-t-transparent rounded-full mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

// Network error component
export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="h-6 w-6 text-yellow-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Connection Problem</h3>
      <p className="text-muted-foreground mb-4">
        Unable to connect to VIP Elite K9s servers. Please check your internet connection.
      </p>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  );
}

// Empty state component
export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action}
    </div>
  );
}