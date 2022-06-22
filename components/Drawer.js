import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { userState } from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import {
  SunIcon,
  ArchiveIcon,
  CalendarIcon,
  TagIcon,
  StarIcon,
  PlusIcon,
  MenuAlt2Icon,
  DocumentReportIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import Tag from "./tag";
import { useForm } from "react-hook-form";
import { usersEntries } from "../atoms/adminAtom";
import { tagsState } from "../atoms/tagsAtom";
import { tagsData } from "../atoms/tagsAtom";

import toCaps from "../utils/toCaps";

export default function DrawerPanel() {
  const router = useRouter();
  const [entries, setEntries] = useRecoilState(usersEntries);
  const [user, setUser] = useRecoilState(userState);
  const [tagsstate, setTagsState] = useRecoilState(tagsState);
  const [tags, setTagsData] = useRecoilState(tagsData);
  const [state, setState] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    //To add the tag
    const response = await fetch(`/api/me/tags`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ tag: data.tag }),
    });
    setTagsState(true);

    resetField("tag");
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div className="mt-10">
      <Button className="" onClick={toggleDrawer(true)}>
        <MenuAlt2Icon className="w-8 text-black" />
      </Button>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {!user?.isAdmin && (
          <div className="pt-10  min-w-[250px] w-[15vw]">
            <div className="flex flex-col items-start justify-center pl-5">
              <div
                className="flex items-center justify-between space-x-10 cursor-pointer py-2 w-[10rem] flex-shrink-0"
                onClick={() => router.push(`/?nav=today`) && setState(false)}
              >
                <div className="flex items-center justify-start flex-shrink-0 space-x-2">
                  <SunIcon className="w-5" />
                  <h1>Today</h1>
                </div>
              </div>
              <div
                className="flex items-center justify-between space-x-10 cursor-pointer py-2 w-[10rem] flex-shrink-0"
                onClick={() => router.push(`/?nav=tasks`) && setState(false)}
              >
                <div className="flex items-center justify-start flex-shrink-0 space-x-2">
                  <BookOpenIcon className="w-5" />
                  <h1>Tasks</h1>
                </div>
              </div>
              <div
                className="flex items-center justify-between space-x-10 cursor-pointer py-2 w-[10rem] flex-shrink-0"
                onClick={() => router.push("/?nav=overdue") && setState(false)}
              >
                <div className="flex items-center justify-start flex-shrink-0 space-x-2">
                  <CalendarIcon className="w-5" />
                  <h1>Overdue</h1>
                </div>
              </div>
              <div
                className="flex items-center justify-between space-x-10 cursor-pointer py-2 w-[10rem] flex-shrink-0"
                onClick={() => router.push("/?nav=archive") && setState(false)}
              >
                <div className="flex items-center justify-start flex-shrink-0 space-x-2">
                  <ArchiveIcon className="w-5" />
                  <h1>Archive</h1>
                </div>
              </div>
            </div>
            <div className="w-[12rem] relative pl-5 pt-5">
              <hr />
            </div>
            <div className="flex flex-col items-start justify-center flex-1 pl-5">
              {tags?.tags?.map((tag) =>
                tag === "star" ? (
                  <Tag
                    malState={setState}
                    key={tag}
                    link={`/?nav=${tag}`}
                    title={`${toCaps(tag)}`}
                    Icon={StarIcon}
                  ></Tag>
                ) : (
                  <Tag
                    malState={setState}
                    key={tag}
                    link={`/?nav=${tag}`}
                    title={`${toCaps(tag)}`}
                    Icon={TagIcon}
                  ></Tag>
                )
              )}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center justify-start pl-5"
            >
              <PlusIcon className="w-5" />
              <input
                type="text"
                className="block max-w-[9rem] w-[75%] mt-1 border-none outline-none focus:ring-0"
                placeholder="New Tag"
                {...register("tag", { required: true })}
              />
            </form>
          </div>
        )}
        {user?.isAdmin && (
          <div className="pt-10 bg-white min-w-[250px] w-[15vw]">
            <div className="flex flex-col items-start justify-center pl-5">
              <div
                className="flex items-center justify-between space-x-10 cursor-pointer py-2 w-[10rem] flex-shrink-0"
                onClick={() => router.push(`/?nav=entries`) && setState(false)}
              >
                <div className="flex items-center justify-start flex-shrink-0 space-x-2">
                  <CalendarIcon className="w-5" />
                  <h1>All Entries</h1>
                </div>
                <h1>{entries?.length}</h1>
              </div>

              <div
                className="flex items-center justify-between space-x-10 cursor-pointer py-2 w-[10rem] flex-shrink-0"
                onClick={() => router.push(`/?nav=report`) && setState(false)}
              >
                <div className="flex items-center justify-start flex-shrink-0 space-x-2">
                  <DocumentReportIcon className="w-5" />
                  <h1>Report</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
