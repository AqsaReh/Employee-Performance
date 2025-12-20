"use client";
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import Author from "@/public/images/all-img/Author.png";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem>Utility</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Dashboard</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex justify-end -mt-3">
        <React.Fragment>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent text-black border-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                  />
                </svg>

                <Icon
                  icon="heroicons:chevron-down"
                  className=" h-5 w-5 ml-2 "
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[196px]" align="start">
              <DropdownMenuLabel>Time Span</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Yearly</DropdownMenuItem>
              <DropdownMenuItem>Quaterly</DropdownMenuItem>
              <DropdownMenuItem>Monthly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </React.Fragment>
      </div>

      <div className="main-container">
        {/* row -> 3 cards */}
        <div className="grid gap-4 grid-cols-10">
          <div className="bg-card rounded col-span-3">
            <div className="flex items-center gap-4 m-3">
              <div>
                <Image
                  src={Author}
                  alt="User Profile"
                  width={60}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">Hasnain Ali Zaidi</h2>
                <div className="flex items-center gap-4 justify-between bg-slate-500">
                  <h6 className="text-sm">Head of SFE</h6>
                  <h6 className="text-sm">Lahore, Pakistan</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card col-span-4">
            <h1>Card 2</h1>
          </div>
          <div className="bg-card col-span-3">
            <h1>Card 3</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
