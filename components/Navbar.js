import { Avatar } from "@mui/material";
import { PlusIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { useRouter } from "next/router";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { userState } from "../atoms/userAtom";
import { userTask, handleTasksState } from "../atoms/taskAtom";
import { tagsState, tagsData } from "../atoms/tagsAtom";
import {
  reportEntries1,
  reportEntries2,
  reportState,
  usersEntries,
  usersEntriesState,
  todayTasks,
} from "../atoms/adminAtom";

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [openModal, setOpen] = useRecoilState(modalState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [taskState, setTaskState] = useRecoilState(handleTasksState);
  const [task, setTask] = useRecoilState(userTask);
  const [tags, setTags] = useRecoilState(tagsData);
  const [tagState, setTagState] = useRecoilState(tagsState);
  const [entriesState, setEntriesState] = useRecoilState(usersEntriesState);
  const [entries, setEntries] = useRecoilState(usersEntries);
  const [todayTask, setTodayTasks] = useRecoilState(todayTasks);
  const [reportS, setReportState] = useRecoilState(reportState);
  const [report1, setReport1] = useRecoilState(reportEntries1);
  const [report2, setReport2] = useRecoilState(reportEntries2);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    //to reset all the data stored in recoil state
    setUser(null);
    setTaskState(true);
    setTagState(true);
    setTags(null);
    setEntriesState(true);
    setEntries(null);
    setTodayTasks([]);
    setReportState(true);
    setReport1([]);
    setReport2([]);
    setTask([]);
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between px-10 py-4 h-[10vh] min-h-[4rem]">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <h1 className="text-xl font-bold">To Do</h1>
      </div>

      <div className="flex items-center justify-around sm:space-x-10">
        <button
          onClick={() => setOpen(!openModal)}
          className={`${
            user?.isAdmin ? "hidden" : ""
          }  flex items-center flex-shrink-0 px-2 py-2 space-x-2 text-white bg-black rounded-full sm:rounded-lg sm:px-4`}
        >
          <PlusIcon className="w-3 sm:w-5 " />
          <h1 className="hidden sm:block">New Tasks</h1>
        </button>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              className="w-7 h-7 sm:w-10 sm:h-10"
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
