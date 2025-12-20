"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Loader2 } from "lucide-react";


const ForgotPassword = (data: any, handlemysubmit:any) => {

  const[verification, setVerification] = useState(false);
  const [isPending, startTransition] = React.useTransition();
  console.log("data", data);
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const submitForm = (event: any) => {
    event.preventDefault()
    handlemysubmit()
  }

  return (
    <div>
      <div className="2xl:mt-8 my-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Forget Your Password?
      </div>
      <form onSubmit={submitForm}>
        <Label
          htmlFor="employeeNo"
          className="mb-4 font-medium text-default-600"
        >
          Enter Your Employee No
        </Label>
        <Input
          required
          type="number"
          id="employeeNo"
          className="border-destructive"
          size="xl"
        />
        <Button
          className="w-full mt-6"
          size={!isDesktop2xl ? "xl" : "lg"}
          type="submit"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "sending..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};
export default ForgotPassword;
