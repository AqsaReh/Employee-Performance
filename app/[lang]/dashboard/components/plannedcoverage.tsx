import React from "react";

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import ApexChart from "react-apexcharts";

const PlannedCoverage = ({ height = 300 }) => {
    
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const planCoverageSeries = [20, 80];
  const planCoverageLabels = [
    "Plan", "Actual"
 ];
  const planCoverageOptions: any = {
    labels : planCoverageLabels,
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
    colors: ["#826AF9", "#22C55E"],
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
        options={planCoverageOptions}
        series={planCoverageSeries}
        type="donut"
        height={height}
        width={"100%"}
      />
    </>
  );
};

export default PlannedCoverage;
