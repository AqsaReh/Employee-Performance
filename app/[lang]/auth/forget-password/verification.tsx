"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import hnlLogo from "./../../../../public/images/logo/complete.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the schema using zod
const schema = z.object({
  employeeNo: z.coerce.number({
    required_error: "Employee No is required",
    invalid_type_error: "Employee No must be a number",
  }),
});

const ForgotForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: any) => {
    startTransition(async () => {
      toast.success("Password Reset code has been sent to your email");
      reset();
      router.push("/auth/create-password2");
    });
  };

  return (
    // const[show, setShow] = useState();

    <div className="w-full">
      <Link href="/dashboard" className="inline-block">
        <div className="h-10 w-32 2xl:w-36 2xl:h-14">
          <Image
            src={hnlLogo}
            alt="HNL Sun Logo"
            className="object-contain text-primary"
          />
        </div>
      </Link>
      <div className="2xl:mt-8 my-6 2xl:text-3xl text-2xl font-bold text-default-900">
        Verification Code Selection
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 xl:mt-7">
        <div>
          <Label
            htmlFor="employeeNo"
            className="mb-4 font-medium text-default-600"
          >
            Select Options to Get Verification Code
          </Label>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">Select Options to Get Verification Code</SelectItem>
              <SelectItem value="Use Email">Use Email</SelectItem>
              <SelectItem value="Use Official Contact">Use Official Contact</SelectItem>
              <SelectItem value="Use Personal Contact">Use Personal Contact</SelectItem>
              
            </SelectContent>
          </Select>
        </div>
        {errors.employeeNo && (
          <div className="text-destructive mt-2">
            {errors.employeeNo.message as string}
          </div>
        )}

        <Button className="w-full mt-6" size={!isDesktop2xl ? "xl" : "lg"}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "sending..." : "Get Verification Code"}
        </Button>
      </form>

      <div className="mt-8 text-center text-base text-default-600">
        Back to{" "}
        <Link href="/auth/login2" className="text-primary">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
