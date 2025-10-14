import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { AlertDialog } from "@base-ui-components/react/alert-dialog"
import FormContext from './FormCont'

const Edit = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(FormContext);
  
  const [progressValue, setProgressValue] = useState(0);
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", priority: "" });


  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("formData")) || [];
    const currentTask = allTasks[index];
    if (currentTask) setTask(currentTask);
  }, [index]);

  function Progress(prg) {
    switch (prg.toLowerCase()) {
      case "beginning": return 20;
      case "in progress": return 50;
      case "near complition": return 80;
      case "completed": return 100;
      default: return 0;
    }
  }

  const handleProgressChange = (e) => {
    const value = e.target.value;
    setProgressValue(Progress(value));
    setTask({ ...task, status: value }); 
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#14F3DC',
    },
  }));


  const handleEditSave = () => {
    const storedTasks = JSON.parse(localStorage.getItem("formData")) || [];
    storedTasks[index] = task; 
    localStorage.setItem("formData", JSON.stringify(storedTasks));
    setTasks(storedTasks);
    navigate("/all-tasks"); 
  };

  return (
    <div>
      <form>
        <h1 className="p-9 ml-30 font-bold text-[30px]">Edit Task</h1>

        <p className="ml-40 text-xl font-medium">Title</p>
        <div className="pt-5">
          <input
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="font-bold border-1 rounded-2xl h-[35px] ml-40 w-[700px] p-2"
            type="text"
            name="title"
            placeholder="Task title"
          />
        </div>

        <h1 className="ml-40 pt-5 text-xl font-medium">Description</h1>
        <div className="pt-5">
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="font-bold border-1 h-[190px] rounded-2xl ml-40 w-[700px] p-2"
            name="description"
            placeholder="Add details about the task"
          ></textarea>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col">
            <h1 className="ml-40 text-xl font-medium">Due date</h1>
            <input
              value={task.dueDate || ""}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="font-bold border-1 w-[270px] rounded-2xl ml-40 p-2"
              type="date"
              name="dueDate"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="ml-40 text-xl font-medium">Priority</h1>
            <select
              value={task.priority || ""}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              className="font-bold border-1 w-[270px] rounded-2xl ml-40 p-2"
              name="priority"
            >
              <option value="">No Priority</option>
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="mt-7">
          <select
            value={task.status || ""}
            onChange={handleProgressChange}
            className="font-bold border-1 w-[700px] rounded-2xl ml-40 p-2"
            name="progress"
          >
            <option value="">Select progress</option>
            <option value="beginning">Beginning</option>
            <option value="in progress">In Progress</option>
            <option value="near complition">Near Completion</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="mt-5 flex ml-40">
          <BorderLinearProgress sx={{ width: "700px" }} variant="determinate" value={progressValue} />
        </div>

        <div className="flex flex-row gap-3 mt-9 ml-40">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#E5E7EB", borderRadius: "20px", color: "#374151" }}
            onClick={() => navigate("/all-tasks")}
          >
            Cancel
          </Button>

          <AlertDialog.Root>
            <AlertDialog.Trigger className="flex h-10 items-center justify-center rounded-4xl border border-gray-200 bg-[#14F3DC] px-3.5 text-base font-medium text-[#FFFFFF] hover:bg-[#0D9488]">
              Save Edit
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
              <AlertDialog.Backdrop className="fixed inset-0 bg-black opacity-20" />
              <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6">
                <AlertDialog.Title className="text-lg font-medium">Save Changes</AlertDialog.Title>
                <AlertDialog.Description className="mb-6 text-base text-gray-600">
                  Are you sure you want to save these changes?
                </AlertDialog.Description>
                <div className="flex justify-end gap-4">
                  <AlertDialog.Close className="border px-3.5 py-2 rounded-md text-red-700">Cancel</AlertDialog.Close>
                  <AlertDialog.Close
                    onClick={handleEditSave}
                    className="border px-3.5 py-2 rounded-md text-[#0D9488]"
                  >
                    Save
                  </AlertDialog.Close>
                </div>
              </AlertDialog.Popup>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      </form>
    </div>
  );
};

export default Edit;
