"use client"

import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export function AreaChart() {
  const data = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: [92, 93, 94, 91, 89, 93, 95, 94, 96],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        min: 80,
        max: 100,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="h-[300px]">
      <Line data={data} options={options} />
    </div>
  )
}

export function BarChart() {
  const data = {
    labels: ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    datasets: [
      {
        label: "Average Score",
        data: [78, 82, 76, 84, 79, 83, 88],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        min: 50,
        max: 100,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="h-[300px]">
      <Bar data={data} options={options} />
    </div>
  )
}

export function PieChart() {
  const data = {
    labels: ["Collected", "Pending", "Overdue"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(234, 179, 8, 0.8)", "rgba(239, 68, 68, 0.8)"],
        borderColor: ["rgb(34, 197, 94)", "rgb(234, 179, 8)", "rgb(239, 68, 68)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="h-[300px]">
      <Pie data={data} options={options} />
    </div>
  )
}
