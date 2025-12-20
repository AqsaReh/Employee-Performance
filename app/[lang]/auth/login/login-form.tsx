"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CardHeader from "@/components/auth/card-header";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/use-media-query";


const schema = z.object({
  employeeNo: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() === "") {
      return undefined; // treat empty strings as missing values
    }
    return Number(val); // convert input to a number
  }, z.number({
    required_error: "Employee No is required",
    invalid_type_error: "Employee No must be a number",
  }).min(1, "Employee No must be greater than 0")), // ensure it's a valid positive number
  
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      employeeNo: 7906,
      password: "password",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const onSubmit = (data: any) => {
    startTransition(async () => {
      let response = await signIn("credentials", {
        employeeNo: data.employeeNo,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Login Successful");
        window.location.assign("/dashboard");
        reset();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  };
  return (
    <div className="w-full py-10">

      {/* Heading */}
      <CardHeader heading="Welcome Back 👋" />
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label
            htmlFor="employeeNo"
            className="mb-2 font-medium text-default-600"
          >
            Employee No
          </Label>
          <Input
            disabled={isPending}
            {...register("employeeNo")} // Convert value to number
            type="text"
            id="employeeNo"
            className={cn("", {
              "border-destructive": errors.employeeNo,
            })}
            size={!isDesktop2xl ? "lg" : "md"}
            placeholder="Enter Your Employee No"
          />
        </div>
        {errors.employeeNo && (
          <div className=" text-destructive mt-2">
            {errors.employeeNo.message}
          </div>
        )}

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600">
            Password
          </Label>
          
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className={cn("", {
                "border-destructive": errors.password,
              })}
              size={!isDesktop2xl ? "lg" : "md"}
              placeholder="Enter Your Password"
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>
        {errors.password && (
          <div className=" text-destructive mt-2">
            {errors.password.message}
          </div>
        )}

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex items-center gap-1.5 ">
            <Checkbox
              size="sm"
              className="border-default-300 mt-1"
              id="isRemebered"
            />
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              Remember me
            </Label>
          </div>
          <Link href="/auth/forget-password" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;
