import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface NumericKeypadProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  maxLength?: number;
}

export function NumericKeypad({ 
  value, 
  onChange, 
  onComplete, 
  disabled = false,
  maxLength = 4 
}: NumericKeypadProps) {
  
  const addDigit = (digit: string) => {
    if (value.length < maxLength && !disabled) {
      const newValue = value + digit;
      onChange(newValue);
      
      if (newValue.length === maxLength && onComplete) {
        onComplete(newValue);
      }
    }
  };

  const removeDigit = () => {
    if (value.length > 0 && !disabled) {
      onChange(value.slice(0, -1));
    }
  };

  const clear = () => {
    if (!disabled) {
      onChange("");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
        <Button
          key={digit}
          variant="outline"
          className="h-12 text-lg font-semibold hover:bg-muted"
          onClick={() => addDigit(digit.toString())}
          disabled={disabled}
        >
          {digit}
        </Button>
      ))}
      
      <Button
        variant="outline"
        className="h-12 hover:bg-muted"
        onClick={clear}
        disabled={disabled}
      >
        Clear
      </Button>
      
      <Button
        variant="outline"
        className="h-12 text-lg font-semibold hover:bg-muted"
        onClick={() => addDigit("0")}
        disabled={disabled}
      >
        0
      </Button>
      
      <Button
        variant="outline"
        className="h-12 hover:bg-muted"
        onClick={removeDigit}
        disabled={disabled}
      >
        <Delete className="h-4 w-4" />
      </Button>
    </div>
  );
}
