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
import { colors } from "react-select/dist/declarations/src/theme";

const YearlyPerformance = ({ height = 270 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const yearlyPerformanceSeries = [
    {
      name: "Target",
      data: [44, 55, 41],
      fillColor: 'greenGradient',

      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "dark", // Options: 'light' or 'dark'
      //     type: "horizontal", // Options: 'horizontal' or 'vertical'
      //     gradientToColors: ["#b48628"], // End color of the gradient
      //     stops: [0, 100], // Position of gradient color stops
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: "#fdbc42", // Start color
      //         opacity: 1,
      //       },
      //       {
      //         offset: 100,
      //         color: "#b48628", // End color
      //         opacity: 1,
      //       },
      //     ],
      //   },
      // },
    },
    {
      name: "Sale",
      data: [53, 32, 33],
      fillColor: 'greenGradient',
      // fill: {
      //   type: "gradient",
      //   gradient: {
      //     shade: "light",
      //     type: "horizontal",
      //     gradientToColors: ["#2bbd87"], // End color of the gradient for "Sale"
      //     stops: [0, 100],
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: "#35e7a7", // Start color for "Sale"
      //         opacity: 1,
      //       },
      //       {
      //         offset: 100,
      //         color: "#2bbd87", // End color for "Sale"
      //         opacity: 1,
      //       },
      //     ],
      //   },
      // },
    },
  ];

  const yearlyPerformanceOptions: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#fdbc42", "#2bbd87"],
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },

    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shade: "light",
    //     type: "vertical",
    //     gradientToColors: ["#e6a839", "#2bbd87"], // End colors for gradients
    //     stops: [0, 100],
    //     colorStops: [
    //       // Gradient for the first bar (yellow gradient)
    //       {
    //         offset: 0,
    //         color: "#fdbc42", // Start color for yellow gradient
    //         opacity: 1,
    //       },
    //       {
    //         offset: 100,
    //         color: "#e6a839", // End color for yellow gradient
    //         opacity: 1,
    //       },
    //       // Gradient for the second bar (green gradient)
    //       {
    //         offset: 0,
    //         color: "#35e7a7", // Start color for green gradient
    //         opacity: 1,
    //       },
    //       {
    //         offset: 100,
    //         color: "#2bbd87", // End color for green gradient
    //         opacity: 1,
    //       },
    //     ],
    //   },
    // },

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

  return (
    <>
      <ApexChart
        options={yearlyPerformanceOptions}
        series={yearlyPerformanceSeries}
        type="bar"
        height={height}

        // width={width}
      />
    </>
  );
};

export default YearlyPerformance;
