import Head from "next/head";
import Image from "next/image";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import { userState } from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { tagsState, tagsData } from "../atoms/tagsAtom";
import { handleTasksState, userTask } from "../atoms/taskAtom";
import { usersEntriesState } from "../atoms/adminAtom";
import ModalForm from "../components/ModalForm";
import DrawerPanel from "../components/Drawer";
import AdminMain from "../components/AdminMain";
export default function Home() {
  const [tasks, setTasks] = useRecoilState(userTask);

  const [enteriesState, setEntriesState] = useRecoilState(usersEntriesState);
  const [tagState, setTagsState] = useRecoilState(tagsState);
  const [tags, setTagsData] = useRecoilState(tagsData);
  const [user, setUser] = useRecoilState(userState);
  const [taskState, setTaskState] = useRecoilState(handleTasksState);
  const router = useRouter();
  useEffect(() => {
    if (user && !user?.isAdmin) {
      setTaskState(true);
      router.push(`/?nav=tasks`);
    } else if (user && user?.isAdmin) {
      setEntriesState(true);
      router.push(`/?nav=entries`);
    } else {
      router.push("/login");
      setTaskState(false);
    }
  }, [user]);
  useEffect(() => {
    //get tasks of the user
    if (user && taskState && !user?.isAdmin) {
      const fetchPosts = async () => {
        const response = await fetch(`/api/me/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await response.json();
        setTasks(data);
        setTaskState(false);
      };
      fetchPosts();
    }
  }, [taskState, user]);
  useEffect(() => {
    //gets tags of the user
    if (user && tagState && !user?.isAdmin) {
      const fetchTags = async () => {
        const response = await fetch(`/api/me/tags`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await response.json();
        setTagsData(data);
        setTagsState(false);
      };
      fetchTags();
    }
  }, [tagState]);
  return (
    <div className="overflow-hidden">
      <Head>
        <title>To Do</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <hr />
      <div className="flex h-[90vh] ">
        <DrawerPanel />
        {user?.isAdmin ? <AdminMain /> : <Main tasksData={tasks} />}
      </div>
      <ModalForm />
    </div>
  );
}
