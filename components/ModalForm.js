import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handleTasksState } from "../atoms/taskAtom";
import { userState } from "../atoms/userAtom";
import { tagsData } from "../atoms/tagsAtom";
import toCaps from "../utils/toCaps";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  ["@media (min-width:640px)"]: {
    width: 400,
  },
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
};

export default function ModalForm() {
  const [user, setUser] = useRecoilState(userState);
  const [open, setOpen] = useRecoilState(modalState);
  const [taskState, setTaskState] = useRecoilState(handleTasksState);
  const [tags, setTagsData] = useRecoilState(tagsData);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    resetField("text");
    resetField("tag");
    resetField("dueDate");

    setOpen(false);
  };
  const onSubmit = async (data) => {
    const dueDate = new Date(new Date(data.dueDate) - 5.5 * 60 * 1000 * 60);
    dueDate.setDate(dueDate.getDate() + 1); //set the due date to end of the day

    //to post a task
    const response = await fetch(`/api/me/tasks`, {
      method: "POST",
      body: JSON.stringify({
        user: "1",
        text: data.text,
        dueDate: dueDate,
        tag: data.tag,
        createdAt: new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const dataTask = await response.json();
    setTaskState(true);
    resetField("text");
    resetField("tag");
    resetField("dueDate");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="pb-5 text-xl font-semibold">Add Task</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6"
            >
              <label className="block">
                <span className="text-gray-700">What are you upto?</span>
                <input
                  type="text"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder=""
                  {...register("text", { required: true })}
                />
              </label>

              <label className="block">
                <span className="text-gray-700">
                  When do you want to complete it?
                </span>
                <input
                  type="date"
                  min={`${new Date().toISOString().split("T")[0]}`}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  {...register("dueDate", { required: true })}
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Tags</span>
                <select
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  {...register("tag", { required: true })}
                >
                  {tags?.tags?.map((tag) => (
                    <option key={tag} value={tag}>
                      {toCaps(tag)}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-center justify-around space-x-2">
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-black rounded-lg"
                >
                  Submit
                </button>
                <button
                  onClick={handleClose}
                  type="reset"
                  className="w-full py-2 border rounded-lg "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
