"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import Image from "next/image";
import Author from "@/public/images/all-img/Author.png";
import tt from "@/public/images/all-img/tt.png";
import doj from "@/public/images/all-img/doj.png";
import ed from "@/public/images/all-img/ed.png";
import Phone from "@/components/svg/duel-tone/phone.svg";
import { hslToHex, hexToRGB } from "@/lib/utils";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getGridConfig,
  getLabel,
  getYAxisConfig,
} from "@/lib/appex-chart-options";

import { users, columns, ColumnProps, UserProps } from "./data";

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Tooltip,
} from "recharts";
import { Bardata } from "./data";
import { Bar } from "react-chartjs-2";

import CustomTooltip from "./custom-tooltip";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  // end bar chart------------------------------

  // Yearly Performance bar CHart ----------------------------
  const yearlyseries = [
    {
      data: [44, 55, 41, 64, 22, 43],
    },
    {
      data: [53, 32, 33, 52, 13, 44],
    },
  ];
  const yearlyoptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -10,
      style: {
        fontSize: "12px",
        fontWeight: 700,
        colors: [
          `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel
          })`,
        ],
      },
    },
    stroke: {
      show: false,
      width: 1,
      colors: [
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
      ],
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
    ),
    xaxis: {
      categories: [2023, 2022, 2021, 2020, 2019, 2018],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: getLabel(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },

    legend: {
      labels: {
        colors: `hsl(${
          theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
  };

  // plan adherence Donut chart----------------------------

  const series = [41, 44];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      position: "bottom",
      formatter: function (val: number, opts: any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      theme: mode === "dark" || mode === "system" ? "dark" : "light",
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  // end plan adherence Donut chart----------------------------

  // Planned Coverage donut chart----------------------------

  const plannedseries = [44, 55];

  const plannedoptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      position: "bottom",
      formatter: function (val: number, opts: any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      theme: mode === "dark" || mode === "system" ? "dark" : "light",
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  // Doctor list pie chart

  const doctorseries = [44, 55, 45];

  const doctoroptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 0,
    },
    labels: ["A Class", "B Class", "C Class"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "20px",
      },
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    legend: {
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
  };

  // Activities pie chart ----------------------------

  const activityseries = [44, 55, 13, 43, 22];

  const activityoptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 0,
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "20px",
      },
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].muted})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    legend: {
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
  };


  // Expenses bar chart ---------------------------------------------


  const hslPrimary = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
    })`;
  const hslSuccess = `hsla(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success
    })`;

  const hexPrimary = hslToHex(hslPrimary);
  const hexSuccess = hslToHex(hslSuccess);

  const expensedata: any = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "data one",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(hexPrimary, 0.5),
        borderColor: hexToRGB(hexPrimary, 0.5),
        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
      {
        label: " data two",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(hexSuccess, 0.8),
        borderColor: hexToRGB(hexSuccess, 0.8),
        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
    ],
  };
  const expenseoptions: any = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel
            })`,
        },
      },
    },

    scales: {
      y: {
        grid: {
          drawTicks: false,
          color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`,
        },
        ticks: {
          color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        },
      },
      x: {
        grid: {
          drawTicks: false,
          color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`,
        },

        ticks: {
          color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
    },

    maintainAspectRatio: false,
  };

 
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem>Utility</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Dashboard</BreadcrumbItem>
      </Breadcrumbs>

      {/* 1st Section ------------------------------------------------------------ */}

      <div className="mt-5 border rounded-md w-full border-gray-300">
        <div className="grid grid-cols-6 ">
          <div className="col-span-4 flex items-center p-5">
            <div>
              <Image
                src={Author}
                alt="User Profile"
                width={100}
                className="rounded-full ring-1 ring-white ring-opacity-50"
              />
            </div>

            <div className="ml-4">
              <h1 className="text-xl font-semibold">Aqsa Rehman</h1>
              <h2 className="my-1 font-medium ">Software Engineer</h2>
              <h3 className="my-1 flex items-center">
                <span className="p-1">
                  <Image src={tt} alt="TT" className="w-5" />
                </span>
                Team2 Gujrat-01
              </h3>
              <h3 className="my-1 flex items-center">
                <span className="p-1">
                  <Image src={ed} alt="ED" className="w-5" />
                </span>
                01-04-2024
              </h3>
              <h3 className="my-1 flex items-center">
                <span className="p-1">
                  <Image src={doj} alt="DOJ" className="w-5" />
                </span>
                24-04-2024
              </h3>
            </div>
          </div>

          <div className="flex grid-cols-2 p-5">
            <div className="flex flex-col justify-between ">
              <h2 className="w-24">
                <span className=" font-semibold">YTD :</span> 123{" "}
              </h2>
              <h2 className="w-24">
                <span className=" font-semibold">MTD :</span> 123
              </h2>
            </div>
            <div className="flex text-4xl font-semibold justify-center items-center">
              <h1 className="flex items-end tracking-widest">
                {" "}
                10,123
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="-mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="m11.36 9.773l-3.199 3.636c-.395.45-.019 1.091.64 1.091H15.2c.659 0 1.035-.641.64-1.09l-3.2-3.637c-.32-.364-.959-.364-1.279 0"
                    />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m11.36 14.227l-3.199-3.636c-.395-.45-.019-1.091.64-1.091H15.2c.659 0 1.035.641.64 1.09l-3.2 3.637c-.32.364-.959.364-1.279 0"
                    />
                  </svg>
                </span>
              </h1>
            </div>
            <div className="flex flex-col justify-between ">
              <h2 className="w-24">
                <span className="w-16 font-semibold">ACH % :</span> 123{" "}
              </h2>
              <h2 className="w-24">
                <span className="w-16 font-semibold">GOLY :</span> 123
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Section ------------------------------------------------------------ */}

      <div className="grid grid-cols-4 gap-4">
        <div className="grid border mt-5 col-span-3">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column: ColumnProps) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 5).map((item: UserProps) => (
                <TableRow key={item.sr} className="hover:bg-default-100">
                  <TableCell>{item.sr}</TableCell>
                  <TableCell>{item.brandname}</TableCell>
                  <TableCell>{item.sale}</TableCell>
                  <TableCell>{item.ach}</TableCell>
                  <TableCell>{item.growth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* barchart----------------------------- */}
        <div className="grid border mt-5 col-span-1">
          <h1 className="text-xl p-3 font-semibold">Yearly Performance</h1>

          <Chart
            options={yearlyoptions}
            series={yearlyseries}
            type="bar"
            height={height}
            width={"100%"}
          />
        </div>
      </div>

      {/* 3rd Section ------------------------------------------------------------ */}

      <div className="grid mt-5">
        <h1 className="w-full my-4 text-xl font-semibold">SFA Performance</h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-md p-5 col-span-1">
            <h1 className="text-lg font-semibold">Call Rate</h1>

            <div className="flex">
              <Phone className="h-20 w-20 m-3" />
              <h1 className="text-6xl font-semibold mt-4 text-center">23</h1>
            </div>
          </div>
          <div className="border rounded-md p-5 col-span-1">
            <h1 className="text-lg font-semibold">Plan Adherence</h1>
            <Chart
              options={options}
              series={series}
              type="donut"
              width={"100%"}
            />
          </div>
          <div className="border rounded-md p-5 col-span-1">
            <h1 className="text-lg font-semibold">Planned Coverage</h1>

            <Chart
              options={plannedoptions}
              series={plannedseries}
              type="donut"
              width={"100%"}
            />
          </div>
          <div className="border rounded-md p-5 col-span-1">
            <h1 className="text-lg font-semibold">Doctor List</h1>

            <Chart
              options={doctoroptions}
              series={doctorseries}
              type="pie"
              width={"100%"}
            />
          </div>
        </div>
      </div>

      {/* 4th Section ------------------------------------------------------------ */}

      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="border p-5">
          <h1 className="text-lg mb-4 font-semibold">Expenses</h1>

         <Bar options = {expenseoptions} data={expensedata} height={height} /> 
          
        </div>

        {/* Incentive-------------------------------------------------------- */}

        <div className="border p-5">
          <h1 className="text-lg mb-4 font-semibold">Incentive</h1>

          

        </div>


        <div className="border p-5">
          <h1 className="text-lg mb-4 font-semibold">Activities</h1>

          <Chart
            options={activityoptions}
            series={activityseries}
            type="pie"
            width={"100%"}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
