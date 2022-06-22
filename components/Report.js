import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useRecoilState } from "recoil";
import {
  reportEntries1,
  reportEntries2,
  usersEntries,
  todayTasks,
} from "../atoms/adminAtom";
ChartJS.register(ArcElement, Tooltip, Legend);

function Report() {
  const [report1, setReportEntries1] = useRecoilState(reportEntries1);
  const [report2, setReportEntries2] = useRecoilState(reportEntries2);
  const [todayTask, setTodayTasks] = useRecoilState(todayTasks);
  const [users, setUsers] = useRecoilState(usersEntries);
  let data = {
    labels: ["This week", "Last week", "Today"],
    datasets: [
      {
        label: "# of Tasks",
        data: [report1.length, report2.length, todayTask.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-start sm:items-center w-full space-y-5  sm:space-y-10">
      <h1 className="text-xl  sm:text-5xl font-light">Added Entries</h1>
      <div className="w-[15rem]  sm:w-[20rem]">
        <Pie data={data} />
      </div>
      <hr />
      <div>
        <div className="flex text-xl font-light">
          <h1>
            Average number of tasks added per user for the last 7 days:
            <span className="px-2 font-semibold">
              {Math.round(report1.length / users.length)}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Report;
