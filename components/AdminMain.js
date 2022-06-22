import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  usersEntriesState,
  usersEntries,
  reportEntries1,
  reportEntries2,
  reportState,
  todayTasks,
} from "../atoms/adminAtom";
import { userState } from "../atoms/userAtom";
import Report from "./Report";
import Entries from "./Entries";
import toCaps from "../utils/toCaps";

function AdminMain() {
  const router = useRouter();
  const { nav } = router.query;
  const [title, setTitle] = useState("Entries");
  const [entriesState, setEntriesState] = useRecoilState(usersEntriesState);
  const [entries, setEntries] = useRecoilState(usersEntries);
  const [report1, setReport1] = useRecoilState(reportEntries1);
  const [report2, setReport2] = useRecoilState(reportEntries2);
  const [reportsState, setReportState] = useRecoilState(reportState);
  const [todayTask, setTodayTasks] = useRecoilState(todayTasks);
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    setTitle(toCaps(nav));
    if (nav === "entries" && entriesState) {
      const fetchUserTasks = async () => {
        const response = await fetch(`/api/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await response.json();
        setEntries(data);
        setEntriesState(false);
      };
      fetchUserTasks();
    }
    if (nav === "report" && reportsState) {
      const currentDate = new Date().toISOString();
      const weekBeforCurrDate = new Date(
        new Date().getTime() - 6 * 24 * 60 * 1000 * 60
      ).toISOString();
      const pastWeekDate = new Date(
        new Date().getTime() - 7 * 24 * 60 * 1000 * 60
      ).toISOString();
      const WeekBeforPastWeek = new Date(
        new Date().getTime() - 13 * 24 * 60 * 1000 * 60
      ).toISOString();
      const todayDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).toISOString();
      const tommorowDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1
      ).toISOString();

      const fetchReport = async () => {
        //fetches data for this week's tasks
        const response = await fetch(
          `/api/me/tasks?from=${weekBeforCurrDate}&to=${currentDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data1 = await response.json();
        setReport1(data1);
        //fetches data for past week's tasks
        const response2 = await fetch(
          `/api/me/tasks?from=${WeekBeforPastWeek}&to=${pastWeekDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data2 = await response2.json();
        setReport2(data2);
        //fetches data for this today's tasks
        const response3 = await fetch(
          `/api/me/tasks?from=${todayDate}&to=${tommorowDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data3 = await response3.json();
        setTodayTasks(data3);
        setReportState(false);
      };

      fetchReport();
    }
  }, [nav, reportState]);
  return (
    <div className="w-full px-10 mt-10 overflow-y-auto bg-white">
      <div className="text-3xl font-semibold">{title}</div>
      <div className="flex flex-col justify-center py-2 pb-10 space-y-2">
        {nav === "report" && <Report />}
        {nav === "entries" && <Entries />}
      </div>
    </div>
  );
}

export default AdminMain;
