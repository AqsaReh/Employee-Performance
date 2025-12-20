import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface VerificationCodeInputProps {
  onClick: () => void;
}

const VerificationCodeInput = ({ onClick }: VerificationCodeInputProps) => {
  const [values, setValues] = useState(Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPending, startTransition] = React.useTransition();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const input = e.target;
    const value = input.value;

    // Only allow one digit per input
    if (value.length > 1) {
      return;
    }

    // Update the values state
    const newValues = [...values];
    newValues[idx] = value;

    // Move to next input if one digit is entered
    if (value.length === 1) {
      const nextInput = input.nextElementSibling as HTMLInputElement;
      if (nextInput && nextInput.tagName === "INPUT") {
        nextInput.focus();
      }
    }

    setValues(newValues);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const input = e.target as HTMLInputElement;

    // Move to previous input if backspace is pressed and input is empty
    if (e.key === "Backspace" && input.value === "") {
      const prevInput = input.previousElementSibling as HTMLInputElement;
      if (prevInput && prevInput.tagName === "INPUT") {
        prevInput.focus();
      }
    }
  };

  const submitVerificationCode = (event: any) => {
    event.preventDefault();
    onClick();
  };

  useEffect(() => {
    // Check if all values are filled
    const allFilled = values.every((value) => value.length === 1);
    setIsButtonDisabled(!allFilled);
  }, [values]);

  return (
    <div>
      <form onSubmit={submitVerificationCode}>
        <div className="flex">
          {values.map((value, idx) => (
            <input
              key={idx}
              type="number"
              value={value}
              maxLength={1} // Limit to one digit
              className="custom-number-input mx-2 mt-4 w-8 pl-3 h-9 border border-gray-500 rounded-sm"
              onChange={(e) => handleInput(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              inputMode="numeric" // Suggests numeric keyboard on mobile
            />
          ))}
        </div>

        <Button
          className="w-full mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
          disabled={isButtonDisabled}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "sending..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
};

export default VerificationCodeInput;
