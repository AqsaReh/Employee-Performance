"use client";
import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import Author from "@/public/images/all-img/Author.png";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Location from "@/components/svg/duel-tone/location.svg";
import CalendarCheck from "@/components/svg/duel-tone/calender-check.svg";
import { CheckCircle } from "lucide-react";
import { AlertOctagon } from "lucide-react";
import Clipboard from "@/components/svg/duel-tone/clip-board2.svg";
import Graph from "@/components/svg/duel-tone/graph.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFill, Pages } from "@/components/svg";

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
        {/* Cards----------------------- */}
        <div className=" grid grid-cols-3 gap-5">
          <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-5 rounded-md ">
            <div className="flex items-center ">
              <div>
                <Image
                  src={Author}
                  alt="User Profile"
                  width={100}
                  className="rounded-full ring-1 ring-white ring-opacity-50"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-xl">Aqsa Rehman</h1>
                <h3>Software Engineer </h3>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}

          <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-md p-5">
            <h1 className="text-base font-medium text-default-900 tracking-wider">
              Basic Information
            </h1>
            <div className=" flex flex-col gap-2 mt-2">
              <div className="">
                <table>
                  <tbody>
                    <tr>
                      <td className="w-10 pb-2">
                        <Location className="h-6 w-6" />
                      </td>
                      <td className="w-32 pb-2">Territory:</td>
                      <td className="pb-2 font-medium">Lahore</td>
                    </tr>
                    <tr>
                      <td className="w-10 pb-2">
                        <CalendarCheck className="h-6 w-6" />
                      </td>
                      <td className="w-32 pb-2">Effective Date:</td>
                      <td className="pb-2 font-medium">1st April 2024</td>
                    </tr>
                    <tr>
                      <td className="w-10 ">
                        <Clipboard className="h-6 w-6" />
                      </td>
                      <td className="w-32 ">Date Of Joining:</td>
                      <td className=" font-medium">1st April 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-5 rounded-md">
            <h1 className="text-base font-medium text-default-900 tracking-wider">
              Trainings Level
            </h1>
            <div className="flex my-2 justify-center">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full border border-blue-200 flex justify-center items-center">
                  1
                </div>
                <div className="h-[1px] w-5 bg-gradient-to-r from-blue-200 to-cyan-200" />
              </div>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full border border-blue-200 flex justify-center items-center">
                  2
                </div>
                <div className="h-[1px] w-5 bg-gradient-to-r from-blue-200 to-cyan-200" />
              </div>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full border border-blue-200 flex justify-center items-center">
                  3
                </div>
                <div className="h-[1px] w-5 bg-gradient-to-r from-blue-200 to-cyan-200" />
              </div>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full border border-blue-200 flex justify-center items-center">
                  4
                </div>
                <div className="h-[1px] w-5 bg-gradient-to-r from-blue-200 to-cyan-200" />
              </div>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full border border-blue-200 flex justify-center items-center">
                  5
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <CheckCircle />
                <h3 className="font-medium">2024-01-01</h3>
              </div>
              <div className="flex gap-2 items-center">
                <Icon icon="heroicons:calendar" className="h-4 w-4 ml-5 mr-1" />
                <h3 className="font-medium">2025-01-01</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row ---------------------------------- */}

        <div className=" mt-5 grid grid-cols-3 gap-5">
          <div className="bg-primary/30 p-5 rounded-md relative overflow-hidden">
            <span className="h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 bg-primary/50 ring-primary/20 dark:bg-primary dark:ring-primary/40"></span>
            <div className="flex justify-between items-center">
              <h1 className="text-base font-medium text-default-900 flex-1 tracking-wider">
                Sales History
              </h1>
            </div>

            <div className="relative">
              <h1 className="text-3xl my-3 mr-12 tracking-widest font-medium">
                123,456
              </h1>
              <span className="text-primary bottom-6 right-6 h-12 w-12 flex justify-center absolute items-center rounded-full bg-primary bg-opacity-10">
                <Icon icon="heroicons:chart-bar" className="h-7 w-7" />
              </span>
            </div>

            {/* Grid Layout for Labels and Values */}
            <div className="">
              {/* row 1 */}
              <div className="flex justify-between">
                <div className="flex justify-between">
                  <div className="w-32 flex">
                    <div className="w-12">
                      <span className="text-default-700 text-sm">TGT:</span>
                    </div>
                    <div className="w-20">
                      <span className="text-sm font-medium">
                        30,000
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-32 flex">
                    <div className="w-12">
                      <span className="text-default-700 text-sm">ACH:</span>
                    </div>
                    <div className="w-20">
                      <span className="text-sm font-medium">
                        100%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* row 2 */}
              <div className="flex justify-between">
                <div className="flex justify-between">
                  <div className="w-32 flex">
                    <div className="w-12">
                      <span className="text-default-700  text-sm">GOLY:</span>
                    </div>
                    <div className="w-20">
                      <span className=" font-sm">
                        30,000
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-32 flex">
                    <div className="w-12">
                      <span className="text-default-700 text-sm">GOLM:</span>
                    </div>
                    <div className="w-20">
                      <span className="text-sm font-medium">
                        1001023912
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="h-1 my-2 border-1 border-gray" />
              {/* row 3 */}
              <div className="flex justify-between">
                <div className="flex justify-between">
                  <span className="text-default-700 text-sm mr-2">LM:</span>
                  <span className="text-sm font-medium">30,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-700 text-sm mr-2">LQ:</span>
                  <span className="text-sm font-medium">
                    1001023912
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-700 text-sm mr-2">LY:</span>
                  <span className="text-sm font-medium">
                    1001023912
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-100 p-5 rounded-md relative overflow-hidden">
            <span className="h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 bg-green-300 ring-green-200 dark:bg-green-300 dark:ring-green-400"></span>
            <div className="flex justify-between items-center pb-4">
              <h1 className="text-base font-medium text-default-900 flex-1 tracking-wider">
                Yearly Performance
              </h1>
            </div>

            <span className="text-success top-5 right-12 h-12 w-12 flex justify-center absolute items-center rounded-full bg-success bg-opacity-10">
              <Graph className="h-7 w-7 " />
            </span>

            <div className="relative">
              <table className="table mt-8 w-full">
                <thead>
                  <tr>
                    <th className="pb-2 text-left  font-medium">Year</th>
                    <th className="pb-2 text-right  font-medium">Target</th>
                    <th className="pb-2 text-right  font-medium">ACH %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left text-xs">2023</td>
                    <td className="text-right text-xs">30,000</td>
                    <td className="text-right text-xs">23,000</td>
                  </tr>
                  <tr>
                    <td className="text-left text-xs">2022</td>
                    <td className="text-right pt-1 text-xs">30,000</td>
                    <td className="text-right text-xs">23,000</td>
                  </tr>
                  <tr>
                    <td className="text-left pt-1 text-xs">2021</td>
                    <td className="text-right text-xs">30,000</td>
                    <td className="text-right text-xs">23,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-cyan-100 p-5 rounded-md relative overflow-hidden">
            <span className="h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 bg-cyan-300 ring-cyan-200 dark:bg-cyan-300 dark:ring-cyan-400"></span>
            <div className="flex justify-between items-center">
              <h1 className="text-base font-medium text-default-900 flex-1 tracking-wider">
                SFA Performance
              </h1>
            </div>

            <div className="relative flex -mt-6 justify-end">
              <span className="flex mr-7 text-cyan-500 top-5 right-12 h-12 w-12 bottom-3 justify-center items-center rounded-full bg-cyan-500 bg-opacity-10">
                <Pages className="h-7 w-7 " />
              </span>
            </div>

            <div className="relative">
              <div className="flex mt-3 justify-between">
                <div className="flex justify-between">
                  <div className="w-32 flex">
                    <div className="w-20">
                      <span className="text-default-700 text-xs">
                        Call Rate:
                      </span>
                    </div>
                    <div className="w-20">
                      <span className="text-xs font-medium">
                        30,000
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-44 flex ">
                    <div className="w-28">
                      <span className="text-default-700 text-xs">
                        Plan Adherence:
                      </span>
                    </div>
                    <div className="w-20">
                      <span className="text-xs font-medium">
                        100%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-44 flex my-1 ">
                <div className="w-36">
                  <span className="text-default-700 text-xs ">
                    A Class Coverage :
                  </span>
                </div>
                <div className="w-20">
                  <span className="text-xs font-medium">100%</span>
                </div>
              </div>

              <hr className="h-1 mt-4 mb-2 border-1 border-gray-300 border-line-50" />

              <div className="flex justify-between align-baseline">
                <h1>A Class : 10</h1>
                <h1>B Class : 20</h1>
                <h1>C Class : 10</h1>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
        </div>

        {/* 3rd Row ---------------------------------------- */}

        <div className=" mt-5 grid grid-cols-3 gap-5">
        
          <div className="bg-primary/30 p-5 rounded-md relative overflow-hidden">
            <span className="h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 bg-primary/50 ring-primary/20 dark:bg-primary dark:ring-primary/40"></span>
            <div className="flex justify-between items-center">
              <h1 className="text-base font-medium text-default-900 flex-1 tracking-wider">
                Activities
              </h1>
            </div>

            <div className="relative flex -mt-6 justify-end">
              <span className="flex mr-7 text-primary right-12 top-5 h-12 w-12 bottom-3 justify-center items-center rounded-full bg-primary bg-opacity-10">
                <ListFill className="h-7 w-7 " />
              </span>
            </div>

            {/* Grid Layout for Labels and Values */}
            <div className="">
              <div className="relative flex justify-evenly">
                <div className=" mt-2 text-center">
                  <h1>PFP</h1>

                  <hr className="h-1 my-2 border-1 border-gray-300 border-line-50" />
                  <h1>ESmart</h1>

                  <hr className="h-1 my-2 w-20 border-1 border-gray-300 border-line-50" />
                  <h1>Promotions</h1>
                </div>

                <div className=" text-center mt-2 ">
                  <h1>20,000</h1>

                  <hr className="h-1 my-2 w-20 border-1 border-gray-300 border-line-50" />
                  <h1>30,000</h1>

                  <hr className="h-1 my-2 border-1 border-gray-300 border-line-50" />
                  <h1>10,000</h1>
                </div>
          
              </div>
            </div>
          </div>

            

          <div className="bg-green-100 p-5 rounded-md relative overflow-hidden">
          <span className="h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 bg-success/50 ring-success/20 dark:bg-success dark:ring-primary/40"></span>
            <div className="flex justify-between items-center ">
              <h1 className="text-base font-medium text-default-900 flex-1 tracking-wider">
                Expenses
              </h1>
            </div>

            <div className="relative flex -mt-6 justify-end">
              <span className="flex  text-success right-12 mr-7 top-5 h-12 w-12 bottom-3 justify-center items-center rounded-full bg-success bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 48 48"
                  stroke-width="2"
                  className="w-7 h-7 "
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m16.517 14.344l7.705-4.8l10.274 8.688v12.566l-5.967 4.836V23.817zm9.541-5.086L31.9 5.646l10.46 7.293l-6.433 4.926m.277 10.748l6.296-5.14m-6.296 2.479l6.296-5.14m-6.296 2.48l6.296-5.14m-6.296 2.48l6.296-5.14" />
                    <path d="m35.314 14.172l2.723-2.077l-1.865-1.247l-1.498 1.131M5.5 31.954l13.543 10.4l7.423-5.91" />
                    <path d="m5.5 29.285l13.543 10.4l7.423-5.91" />
                    <path d="m5.604 26.616l13.543 10.401l7.423-5.91" />
                    <path d="m5.59 23.948l13.542 10.4l7.423-5.91m-6.32-4.688c-.226 1.027-1.694 1.554-3.278 1.175h0c-1.584-.378-2.685-1.517-2.459-2.545c.226-1.027 1.694-1.553 3.278-1.175s2.685 1.518 2.459 2.545" />
                    <path d="m15.051 15.826l-9.295 5.595l13.331 10.117l7.64-6.015" />
                  </g>
                </svg>
              </span>
            </div>

            <div className="relative flex justify-evenly">
              <div className=" mt-2 text-center">
                <h1>Sep</h1>

                <hr className="h-1 my-2 border-1 border-gray-300 border-line-50" />
                <h1>Aug</h1>

                <hr className="h-1 my-2 w-20 border-1 border-gray-300 border-line-50" />
                <h1>Jul</h1>
              </div>

              <div className=" text-center mt-2 ">
                <h1>20,000</h1>

                <hr className="h-1 my-2 w-20 border-1 border-gray-300 border-line-50" />
                <h1>30,000</h1>

                <hr className="h-1 my-2 border-1 border-gray-300 border-line-50" />
                <h1>10,000</h1>
              </div>
            </div>
          </div>

            

          <div className="bg-cyan-100 p-5 rounded-md relative overflow-hidden">

          <span className="h-10 w-10 rounded-full absolute -top-3 -right-3 ring-8 bg-cyan-300 ring-cyan-200 dark:bg-cyan-300 dark:ring-cyan-400"></span>
            <div className="flex justify-between items-center">
              <h1 className="text-base font-medium text-default-900 flex-1 tracking-wider">
                Incentive
              </h1>
            </div>

            <div className="relative flex -mt-6 justify-end">
              <span className="flex mr-7 text-cyan-500 right-12 top-5 h-12 w-12 bottom-3 justify-center items-center rounded-full bg-cyan-500 bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2s3 .895 3 2s-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"
                  />
                </svg>
              </span>
            </div>

            <div className="relative flex justify-evenly">
              <div className=" mt-2 text-center">
                <h1>Sep</h1>

                <hr className="h-1 my-2 border-1 border-gray-300 border-line-50" />
                <h1>Aug</h1>

                <hr className="h-1 my-2 w-20 border-1 border-gray-300 border-line-50" />
                <h1>Jul</h1>
              </div>

              <div className=" text-center mt-2 ">
                <h1>20,000</h1>

                <hr className="h-1 my-2 w-20 border-1 border-gray-300 border-line-50" />
                <h1>30,000</h1>

                <hr className="h-1 my-2 border-1 border-gray-300 border-line-50" />
                <h1>10,000</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
