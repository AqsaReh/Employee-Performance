"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

import { users, columns, ColumnProps, UserProps } from "./data";
import Author from "@/public/images/all-img/Author.png";
import icon from "@/public/images/all-img/icon.png";
import doj from "@/public/images/all-img/doj.png";
import ed from "@/public/images/all-img/ed.png";
import layer from "@/public/images/all-img/layer.png";
import { MoreHorizontal } from "lucide-react";

import Phone from "@/components/svg/duel-tone/phone.svg";

import YearlyPerformance from "@/app/[lang]/dashboard/components/yearly-performance";
import PlanAdherence from "./components/planadherence";
import PlannedCoverage from "./components/plannedcoverage";
import DoctorList from "./components/doctorlist";
import Activities from "./components/activities";
import Expenses from "./components/expenses";
import Incentive from "./components/incentive";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StarSvg from "@/components/svg/star.svg";
import moment from "moment";
import { Graph } from "@/components/svg";

const Dashboard = () => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const [timeSpan, setTimeSpan] = React.useState("Month");

  const getCurrentMonth = () => moment().format("YYYY-MM");
  const [selectedDate, setSelectedDate] = useState(getCurrentMonth);

  const handleSelect = (value: any) => {
    setTimeSpan(value);
  };


  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem>Utility</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Dashboard</BreadcrumbItem>
      </Breadcrumbs>

      {/* Dropdown Section---------------------------------------------------- */}

      <div className="flex mt-3 justify-end">
        <div className="">
          <input
            type="month"
            value={selectedDate}
            max={getCurrentMonth()}
            onChange={(e) => handleDateChange(e.target.value)}
            className="bg-gray-50 border h-10 mr-5 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
        </div>

        {/* Select YTD, MTD, Quarter */}
        <div className="w-[140px]">
          <Select defaultValue="year">
            <SelectTrigger className="text-default-500 bg-transparent dark:bg-transparent">
              <Icon icon="heroicons:calendar-days" className="w-4 h-4" />
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">YEAR</SelectItem>
              <SelectItem value="quarter">QUARTER</SelectItem>
              <SelectItem value="month">MONTH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 1st Section ------------------------------------------------------------ */}

      <div className="mt-5 md:mb-5 border rounded-md w-full border-gray-300 profile-section-container">
        <div className="grid grid-cols-6">
          <div className="col-span-1 relative">
            <div className="w-full h-full relative overflow-hidden">
              {/* Top Right Circle */}
              <div className="h-24 w-24 absolute -left-8 -top-8 rounded-full ring-[1rem] bg-primary/50 ring-primary/20 dark:bg-primary dark:ring-primary/40"></div>
              {/* Star with Rating */}
              <div className="absolute top-1 left-1">
                <div className="relative">
                  <StarSvg width="44" height="44" />
                  <span className="absolute top-[10px] right-4 text-lg">5</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="absolute -bottom-8 right-6">
              <div className="h-50 w-50">
                <Image
                  src={Author}
                  alt="User Profile"
                  width={130}
                  className="rounded-full aspect-auto ring-1 border z-10 relative border-gray-300 ring-white ring-opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 mt-7 flex items-center ">
            <div className="pl-8">
              <h1 className="text-3xl font-semibold tracking-wider uppercase">
                Aqsa Rehman
              </h1>
              <h2 className="mt-1 text-base tracking-wider font-semibold uppercase">
                Software Engineer
              </h2>
              <div className="pb-3 flex flex-col gap-1 mt-2">
                <h3 className="flex items-center">
                  <div className="w-9">
                    <Image src={icon} alt="TT" className="w-8" />
                  </div>
                  <span className="uppercase font-medium tracking-wider text-base ml-3">
                    Team2 Gujrat-01
                  </span>
                </h3>

                <h3 className="flex items-center">
                  <div className="w-9">
                    <Image src={ed} alt="ED" className="w-5" />
                  </div>
                  <span className="uppercase font-medium tracking-wider text-base ml-3">
                    01-04-2024
                  </span>
                </h3>

                <h3 className="mb-1 flex items-center">
                  <div className="w-9">
                    <Image src={doj} alt="DOJ" className="w-5" />
                  </div>
                  <span className="uppercase font-medium tracking-wider text-base ml-3">
                    24-04-2024
                  </span>
                </h3>
              </div>
            </div>
          </div>

          <div className="col-span-1 flex  justify-between p-3 ml-7 "></div>

          <div className="col-span-2 relative ">
            <h2 className="top-0 absolute right-0 mt-5 mr-10 text-right flex text-base">
              <Graph  className="mr-2 w-4 h-4 mt-1 pt-[1px]"/>
              <span className=" text-lg font-medium tracking-wider mr-2">ACH :</span>
              <span className="font-medium text-lg">123 %</span>
            </h2>
            <div className="flex text-6xl mt-12 font-semibold justify-center items-center">
              <h1 className="flex top-10 m-5 items-center">
                <span className=" tracking-widest mr-16 font-medium">10,123</span>
              </h1>
            </div>

            {timeSpan === "Month" && (
              <div>
                <div className="flex justify-between mt-4">
                  <h2 className=" w-36 ml-5  text-base">
                    <span className="w-12 inline-block tracking-wider text-lg font-medium">
                      LY :
                    </span>
                    <span className="font-medium text-lg"> 123 </span>
                  </h2>
                  <h2 className="w-40 flex mr-7 text-base">
                    <span className="w-20 inline-block tracking-wider text-lg font-medium">
                      GOLY :
                    </span>
                    <span className="font-medium flex text-lg">
                      123 %
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                        className="-mr-3 "
                      >
                        <path
                          fill="currentColor"
                          d="m11.36 9.773l-3.199 3.636c-.395.45-.019 1.091.64 1.091H15.2c.659 0 1.035-.641.64-1.09l-3.2-3.637c-.32-.364-.959-.364-1.279 0"
                        />
                      </svg>
                    </span>
                  </h2>
                </div>
              </div>
            )}

            {timeSpan === "Quarter" && (
              <div>
                <div className="flex justify-between mt-7">
                  <h2 className=" w-36 ml-5  text-base">
                    <span className="w-16 inline-block tracking-wider text-base font-light">
                      LY :
                    </span>
                    <span className="font-medium"> 123 </span>
                  </h2>
                  <h2 className="w-36 mr-5 text-base">
                    <span className="w-16 inline-block tracking-wider text-base font-light">
                      GOLY :
                    </span>
                    <span className="font-medium">123 (2%)</span>
                  </h2>
                </div>
              </div>
            )}

            {timeSpan === "YTD" && (
              <div>
                <div className="flex justify-between mt-7">
                  <h2 className=" w-36 ml-5  text-base">
                    <span className="w-16 inline-block tracking-wider text-base font-light">
                      LY :
                    </span>
                    <span className="font-medium"> 123 </span>
                  </h2>
                  <h2 className="w-36 mr-5 text-base">
                    <span className="w-16 inline-block tracking-wider text-base font-light">
                      GOLY :
                    </span>
                    <span className="font-medium">123 (2%)</span>
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2nd Section ------------------------------------------------------------ */}

      <div className="grid grid-cols-8 gap-4 ">
        <div className=" bg-card shadow-sm overflow-hidden rounded-md relative text-card-foreground mt-5 p-5 bg-right-bottom bg-no-repeat col-span-5">
          <div className="top-56 -right-36 absolute">
            <Image src={layer} alt="Layer" />
          </div>
          <h1 className="font-semibold text-xl mb-4">Top Brands</h1>
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-[#b1c7f5] to-[#c2d3f7]  shadow-sm bg-opacity-10">
                {columns.map((column: ColumnProps, index: number) => {
                  let roundedClass = "";
                  if (index === 0) {
                    roundedClass = "rounded-tl-sm";
                  }
                  if (index === columns.length - 1) {
                    roundedClass = "rounded-tr-sm";
                  }
                  return (
                    <TableHead
                      className={`uppercase p-3 ${roundedClass}`}
                      key={column.key}
                    >
                      {column.label}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.slice(0, 5).map((item: UserProps) => (
                <TableRow key={item.sr} className="hover:bg-default-100 ">
                  <TableCell className=" p-3 mx-2">{item.sr}</TableCell>

                  <TableCell className="w-1/2">{item.brandname}</TableCell>
                  <TableCell>{item.sale}</TableCell>
                  <TableCell>{item.ach}</TableCell>
                  <TableCell>{item.growth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* bar chart----------------------------- */}
        <div className="grid bg-card shadow-sm rounded-md text-card-foreground border mt-5 col-span-3 w-full overflow-hidden">
          <h1 className="text-xl pt-5 px-5 font-semibold">
            Yearly Performance
          </h1>

          <YearlyPerformance />
        </div>
      </div>

      {/* 3rd Section ------------------------------------------------------------ */}

      <div className="grid mt-5">
        <h1 className="w-full my-4 text-xl font-semibold">SFA Performance</h1>

        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-md p-5 bg-card shadow-sm  text-card-foreground col-span-1">
            <h1 className="text-lg font-semibold">Call Rate</h1>

            <div className="flex mt-12 items-center">
              <Phone className="h-40 w-40 text-[#b1c7f5]  m-3" />
              <h1 className="text-8xl font-semibold mt-4 text-center">23</h1>
            </div>
          </div>

          <div className="relative border rounded-md bg-card shadow-sm p-5 col-span-1">
            <h1 className="text-lg font-semibold">Plan Adherence</h1>

            <PlanAdherence />
            <div className="absolute top-[43%] text-4xl font-semibold right-[46%]">
              21
            </div>
          </div>
          <div className=" relative border rounded-md bg-card shadow-sm p-5 col-span-1">
            <h1 className="text-lg font-semibold">Planned Coverage</h1>

            <PlannedCoverage />
            <div className="absolute top-[43%] text-4xl font-semibold right-[46%]">
              21
            </div>
          </div>
          <div className="border rounded-md bg-card shadow-sm p-5 col-span-1">
            <h1 className="text-lg font-semibold">Doctor List</h1>

            <DoctorList />
          </div>
        </div>
      </div>

      {/* 4th Section ------------------------------------------------------------ */}

      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="border bg-card shadow-sm p-5">
          <h1 className="text-lg mb-4 font-semibold">Expenses</h1>

          <Expenses />
        </div>

        {/* Incentive-------------------------------------------------------- */}

        <div className="border bg-card shadow-sm p-5">
          <h1 className="text-lg mb-4 font-semibold">Incentive</h1>

          <Incentive />
        </div>

        <div className="border bg-card shadow-sm p-5">
          <div className="flex justify-between">
            <h1 className="text-lg mb-4 font-semibold">Activities (23,300) </h1>
            <Button
              size="icon"
              className="group h-6 w-6 bg-transparent hover:bg-transparent  text-default-800 border border-default-200"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <Activities />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
