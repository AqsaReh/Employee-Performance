"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import ForgotPassword from "@/components/auth/forget-password";
import CardHeader from "@/components/auth/card-header";
import VerificationCodeInput from "@/components/auth/VerificationCodeInput";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum VerificationTypes {
  contactno = "contactno",
  personalno = "personalno",
  email = "email",
}

// Define the schema using zod

const schema_verify_employee = z.object({
  employeeNo: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") {
        return undefined; // Treat empty strings as undefined (trigger required error)
      }
      return Number(val); // Convert the input to a number
    },
    z
      .number({
        required_error: "Employee No is required",
        invalid_type_error: "Employee No must be a number",
      })
      .min(1, "Employee No must be greater than 0")
  ), // Ensure a positive number
});

const schema_verification_option = z.object({
  verificationOpt: z.enum(
    [
      VerificationTypes.contactno,
      VerificationTypes.personalno,
      VerificationTypes.email,
    ],
    {
      required_error: "Please select a verification option",
      invalid_type_error: "Invalid verification option selected",
    }
  ),
});

// for password Update

const schema_update_password = z.object({
  newPassword: z.string().min(6, { message: "Password is required" }),
  confirmPassword: z.string().min(6, { message: "Password is required" }),
});

const ForgotForm = () => {
  const [isUserValid, setIsUserValid] = useState(false);
  const [isOtpFound, setIsOtpFound] = useState(false);
  const [isOtpverify, setIsOtpVerify] = useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [verificationType, setVerificationType] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [intimationValue, setIntimationValue] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const user = {
    personal_mobile: "03068142339",
    official_contact: "03106101312",
    email: "fahadtariq476@gmail.com",
  };

  const {
    register: register_verify_employee,
    handleSubmit: handleSubmit_verify_employee,
    reset: reset_verify_employee,
    formState: { errors: errors_verify_employee },
  } = useForm({
    resolver: zodResolver(schema_verify_employee),
    mode: "all",
    defaultValues: {
      employeeNo: 7906,
    },
  });

  const {
    register: register_verification_option,
    handleSubmit: handleSubmit_verification_option,
    reset: reset_verification_option,
    setValue,
    trigger,
    formState: { errors: errors_verification_option },
  } = useForm({
    resolver: zodResolver(schema_verification_option),
    mode: "all",
  });

  // update_password

  const {
    register: register_update_password,
    handleSubmit: handleSubmit_update_password,
    reset: reset_update_password,
    formState: { errors: errors_update_password },
  } = useForm({
    resolver: zodResolver(schema_update_password),
    mode: "all",
  });

  const onSubmitVerifyEmployeeForm = (data: any) => {
    // is user valid
    setIsUserValid(true);
  };

  const submitFormVerification = (data: any) => {
    setIsOtpFound(true);
    setIsUserValid(false);
  };

  const handleSelectChange = (value: any) => {
    setValue("verificationOpt", value); // Set form value for verification option
    trigger("verificationOpt"); // Trigger validation to remove error message if valid

    setVerificationType(value); // Update verification type for conditional rendering

    if (VerificationTypes.contactno === value) {
      setIntimationValue(user.official_contact);
    } else if (VerificationTypes.personalno === value) {
      setIntimationValue(user.personal_mobile);
    } else if (VerificationTypes.email === value) {
      setIntimationValue(user.email);
    }

    setIsButtonDisabled(false); // Enable the button (if needed)
  };

  const handlePasswordSubmit = (data: any) => {
  };

  const handleVerifyPinClicked = () => {
    // Handle button click logic here
    alert("adeel called");
    setIsOtpFound(false);
    setIsOtpVerify(true);
  };

  return (
    <div className="w-full">
      {isUserValid ? (
        // 2. Verification option selection
        <div>
          <div className="2xl:mt-8 my-6 text-2xl font-bold text-default-900">
            Verification Code Selection
          </div>
          <form
            onSubmit={handleSubmit_verification_option(submitFormVerification)}
          >
            <Label className="mb-4 font-medium text-default-600">
              Select Options to Get Verification Code
            </Label>
            <Select
              onValueChange={(value) => handleSelectChange(value)}
              {...register_verification_option("verificationOpt")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={VerificationTypes.email}>
                  Use Email
                </SelectItem>
                <SelectItem value={VerificationTypes.contactno.toString()}>
                  Use Official Contact
                </SelectItem>
                <SelectItem value={VerificationTypes.personalno.toString()}>
                  Use Personal Contact
                </SelectItem>
              </SelectContent>
            </Select>

            {errors_verification_option.verificationOpt && (
              <div className="text-destructive mt-2">
                {errors_verification_option.verificationOpt.message as string}
              </div>
            )}

            <div className="">
              {verificationType == VerificationTypes.email && (
                <>
                  <Label className="my-4 font-medium text-default-600 ">
                    Enter Your Email
                  </Label>
                  <Input
                    value={intimationValue}
                    disabled={true}
                    type="email"
                    id="email"
                    className="disabled:text-gray-800 disabled:opacity-1"
                    placeholder="Enter Your Email"
                    size={!isDesktop2xl ? "lg" : "md"}
                  />
                </>
              )}

              {(verificationType == VerificationTypes.contactno ||
                verificationType == VerificationTypes.personalno) && (
                <>
                  <Label className="my-4 font-medium text-default-600">
                    Enter Your Contact Number
                  </Label>
                  <Input
                    value={intimationValue}
                    disabled={true}
                    type="number"
                    id="contactno"
                    className="disabled:text-gray-800 disabled:opacity-1"
                    size={!isDesktop2xl ? "lg" : "md"}
                    placeholder="Enter Your Phone Number"
                  />
                </>
              )}
            </div>

            <Button
              className="w-full mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
              type="submit"
            >
              Get Verification Code
            </Button>
          </form>
        </div>
      ) : isOtpFound ? (
        // otp verification
        <div className="w-full">
          <div className="2xl:mt-8 my-6 2xl:text-3xl text-2xl font-bold text-default-900">
            Verification Code
          </div>

          <label className="">
            Enter The Verification Code Sent To{" "}
            <span className="text-blue-500">{intimationValue}</span>{" "}
          </label>

          <VerificationCodeInput onClick={handleVerifyPinClicked} />
        </div>
      ) : isOtpverify ? (

        // Change password
        
        <>
          <CardHeader heading="Reset Your Password?" />

          <form onSubmit={handleSubmit_update_password(handlePasswordSubmit)}>
            <Label className="my-4 font-medium text-default-600 ">
              Enter New Password
            </Label>
            <Input
              type="password"
              id="newPassword"
             
              className=" "
              placeholder="New Password"
              {...register_update_password("newPassword", {
                required: "Password is required",
              })}
              onChange={(e) => setNewPassword(e.target.value)}
              size={!isDesktop2xl ? "lg" : "md"}
            />

            {errors_update_password.newPassword && (
              <div className="text-destructive mt-2">
                {errors_update_password.newPassword.message as string}
              </div>
            )}

            <Label className="my-4 font-medium text-default-600 ">
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
             
              className=" "
              placeholder="Confirm New Password"
              {...register_update_password("confirmPassword", {
                required: "Confirmation is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size={!isDesktop2xl ? "lg" : "md"}
            />

            {errors_update_password.confirmPassword && (
              <div className="text-destructive mt-2">
                {errors_update_password.confirmPassword.message as string}
              </div>
            )}

            <Button
              className="w-full mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
              // onClick={handleClick}
              type="submit"
            >
              Update Password
            </Button>
          </form>
        </>
      ) : (
        // 1. User validation
        <div>
          <CardHeader heading="Forget Your Password?" />

          <form
            onSubmit={handleSubmit_verify_employee(onSubmitVerifyEmployeeForm)}
          >
            <Label
              htmlFor="employeeNo"
              className="mb-4 font-medium text-default-600"
            >
              Enter Your Employee No
            </Label>

            <Input
              disabled={isPending}
              {...register_verify_employee("employeeNo")}
              type="text"
              id="employeeNo"
              className={cn("custom-number-input", {
                "border-destructive": errors_verify_employee.employeeNo,
              })}
              size={!isDesktop2xl ? "lg" : "md"}
              placeholder="Enter Your Employee No"
            />
            {errors_verify_employee.employeeNo && (
              <div className="text-destructive mt-2">
                {errors_verify_employee.employeeNo.message as string}
              </div>
            )}
            <Button
              className="w-full mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
              type="submit"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "sending..." : "Reset Password"}
            </Button>
          </form>
        </div>
      )}

      {/* Footer */}

      <div className="mt-8 text-center text-base text-default-600">
        Forget it. Send me back to{" "}
        <Link href="/auth/login" className="text-primary">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
