"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { hslToHex, hexToRGB } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Expenses = ({ height = 300 }: { height?: number }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const hslInfo = `hsla(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].info
  })`;
  const hslSuccess = `hsla(${
    theme?.cssVars[mode === "dark" ? "dark" : "light"].success
  })`;

  const hexAccent = hslToHex(hslInfo);
  const hexSuccess = hslToHex(hslSuccess);


  const expensesData: any = {
    labels: ["April", "May", "June", "July", "Auguest", "September", "Octuber"],
    datasets: [
      {
         label: "Expense",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        // backgroundColor: hexToRGB(hexAccent, 0.5),
        // borderColor: hexToRGB(hexAccent, 0.5),
        backgroundColor: "rgba(199, 187, 252, 1)",
        borderColor: "rgba(160, 141, 248, 1)",
        borderWidth: 2,
        borderRadius: "15",
        borderSkipped: "bottom",
        barThickness: 25,
      },
    ],
  };
  const expensesOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    datalabels: {
      enabled: false,
      anchor: "end",
      align: "top",
      color: "#6f89af",
      font: {
        size: 12,
      },
    },

    plotOptions: {
      bar: {
        vertical: true,
      },
    },

    scales: {
      y: {
        grid: {
          drawTicks: false,
          color: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird
          })`,
        },
        ticks: {
          color: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel
          })`,
        },
      },
      x: {
        grid: {
          drawTicks: false,
          color: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird
          })`,
        },

        ticks: {
          color: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel
          })`,
        },
      },
    },

    maintainAspectRatio: false,
  };

  return (
    <div>
      <Bar options={expensesOptions} data={expensesData} height={height} />
    </div>
  );
};

export default Expenses;
