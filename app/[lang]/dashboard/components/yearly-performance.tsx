"use client";

import React from "react";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

import ApexChart from "react-apexcharts";
import {
  getGridConfig,
  getLabel,
  getYAxisConfig,
} from "@/lib/appex-chart-options";

interface YearlyPerformanceProps {
  height?: number;
}

const YearlyPerformance: React.FC<YearlyPerformanceProps> = ({ height = 270 }) => {
  const { theme: config, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const yearlyPerformanceSeries = [
    {
      name: "Target",
      data: [44, 55, 41],
    },
    {
      name: "Sale",
      data: [53, 32, 33],
    },
  ];

  const yearlyPerformanceOptions: any = {
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
    fill: {
      type: "gradient",
      gradient: {
        shade: mode === "dark" ? "dark" : "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          [
            {
              offset: 0,
              color: "#22C55E", // Dark green
            },
            {
              offset: 100,
              color: "#86E9A6", // Light green
            },
          ],
          [
            {
              offset: 0,
              color: "#FACC15", // Dark yellow
            },
            {
              offset: 100,
              color: "#FFE380", // Light yellow
            },
          ],
        ],
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
    },
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
      categories: [2001, 2002, 2003],
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

  return (
    <ApexChart
      options={yearlyPerformanceOptions}
      series={yearlyPerformanceSeries}
      type="bar"
      height={height} // Dynamic height
      width="100%"
    />
  );
};

export default YearlyPerformance;
