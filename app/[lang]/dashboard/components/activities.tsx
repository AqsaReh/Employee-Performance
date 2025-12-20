import React from "react";

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

import ApexChart from "react-apexcharts";

const Activities = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const activitiesSeries = [51, 45, 41];
  const doctorListLabels = [
    "PFP", "Promotional ", "ESmart",
 ];
  const activitiesOptions: any = {
    labels: doctorListLabels,
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -30,
        }, 
      }
    },
    dataLabels: {
      enabled: true,
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

  return (
    <>
      <ApexChart
        options={activitiesOptions}
        series={activitiesSeries}
        type="pie"
        height={height}
        width={"100%"}
      />
    </>
  );
};

export default Activities;
